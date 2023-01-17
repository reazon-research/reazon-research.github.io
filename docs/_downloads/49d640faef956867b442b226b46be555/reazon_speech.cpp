// 音声コールバック → 音声認識サーバへのデータ送信

#include <string.h>
#include "nvs_flash.h"
#include "freertos/FreeRTOS.h"
#include "freertos/task.h"
#include "freertos/semphr.h"
#include "esp_log.h"
#include "esp_netif.h"
#include "lwip/err.h"
#include "lwip/sockets.h"
#include "lwip/sys.h"
#include <lwip/netdb.h>

#include "reazon_speech.h"

static const char *TAG = "REAZON_SPEECH";

#define SERVER_ADDR "192.168.0.7"
#define PORT 8000
#define MAX_DAT (8192)
#define MAX_PREV (240 * 32)
#define SPEEK_OFF_DURATION 100

enum { IN_IDX=0, OUT_IDX=1, MAX_IDX };

static struct {
    int      sock;          // 音声認識サーバへのupload用socket
    uint8_t *dat;           // 発話データ蓄積バッファ
    uint     datOffset;
    uint8_t *prev;          // 発話直前データ蓄積リングバッファ
    uint     prevOffset;
    uint     muteDuration;  // 無音持続パケット数（発話終了判断用）
    uint     speekOnLevel;  // 発話開始判断レベル
    uint     speekOffLevel; // 発話終了判断レベル
} Dat[MAX_IDX]; // IN_IDX/OUT_IDX

static bool reazonSpeechInited = false;
static struct sockaddr_in srvAddr;

// 平均音声パワー
int get_power(const uint8_t *buf, uint32_t sz, int x)
{
    int sum = 0;

    for (int i=0; i < sz; i+=2) { // 16bit LE
        short v = *(short *)(buf + i);
        sum += v * v;
        if (x > 1) {
            int v2 = v * x;
            if (v2 >= 32767)
                *(short *)(buf + i) = 32767;
            else if (v2 <= -32768)
                *(short *)(buf + i) = -32768;
            else
                *(short *)(buf + i) = v2;
        }
    }
    return sum / sz;
}

// 1byteヘッダ作成
inline uint8_t header(int is_in, int end, int cnt)
{
    return (is_in ? 2 : 0) | (end ? 1 : 0) | (uint8_t)(cnt << 2);
}

// 音声送受信コールバック
void reazon_speech_callback(const uint8_t *buf, uint32_t sz, int is_in)
{
    int   pv = get_power(buf, sz, is_in ? 8 : 1); // 発話パワーを確認して、一定以上なら発話開始

    if (!reazonSpeechInited)
        return;

    auto& dat= Dat[is_in ? IN_IDX : OUT_IDX];
    static int pkt_cnt;

    // 非発話中
    if (dat.datOffset == 0) {
        if (pv < dat.speekOnLevel)
            return;

        // 発話開始
        pkt_cnt = 0;
        ESP_LOGI(TAG, "start to rec_on(%d) %s", pv, is_in ? "in" : "out");
        dat.muteDuration = 0;

        // 現在より少し遡ったデータ（Prevデータ）を付加（語頭が切れるのを防ぐ）
        memcpy(dat.dat + 1, dat.prev + dat.prevOffset, MAX_PREV - dat.prevOffset);
        memcpy(dat.dat + 1 + dat.prevOffset, dat.prev, dat.prevOffset);
        memset(dat.prev, 0, MAX_PREV);
        dat.prevOffset = 0;

        dat.datOffset = 1 + MAX_PREV; // ヘッダ1byte + MAX_PREV
    }

    // 発話中
    if (dat.datOffset) {
        //ESP_LOGI(TAG, "store...(%d/%d)", dat.datOffset, sz);
        if (dat.datOffset + sz < MAX_DAT) { // 発話データを蓄積
            memcpy(dat.dat + dat.datOffset, buf, sz);
            dat.datOffset += sz;
        }

        if (pv < dat.speekOffLevel) // 発話パワーが一定以下なら、無音と判断
            dat.muteDuration++; // 無音カウントを増加
        else
            dat.muteDuration = 0; // パワーが一定以上なら、無音カウントをクリア

        if (dat.muteDuration >= SPEEK_OFF_DURATION) {  // 無音カウントが閾値を超えたら、発話終了
            dat.dat[0] = header(is_in, 1, pkt_cnt++); // ヘッダ作成（終了パケット用）

            // データ送信（最終パケット）
            sendto(dat.sock, dat.dat, dat.datOffset, 0, (sockaddr *)&srvAddr, sizeof(srvAddr));
            ESP_LOGI(TAG, "send rec data(%d) %s", dat.datOffset, is_in ? "in" : "out");
            dat.datOffset = 0; // 完全クリア（発話終了）
        }
        else if (dat.datOffset >= MAX_DAT - 500) {
            // データ送信（継続パケット）
            dat.dat[0] = header(is_in, 0, pkt_cnt++);
            sendto(dat.sock, dat.dat, dat.datOffset, 0, (sockaddr *)&srvAddr, sizeof(srvAddr));
            //ESP_LOGI(TAG, "send rec data cont(%d) %s", dat.datOffset, is_in ? "in" : "out");
            dat.datOffset = 1; // ヘッダのみ残して、データ部をクリア（発話継続）
        }
    }
    else { // 発話前データをリングバッファ的に蓄積
        memcpy(dat.prev + dat.prevOffset, buf, sz);
        dat.prevOffset = (dat.prevOffset + sz) % MAX_PREV;
    }
}

void reazon_speech_maintask()
{
    ESP_LOGI(TAG, "start task");

    // サーバアドレス設定
    memset(&srvAddr, 0, sizeof(srvAddr));
    srvAddr.sin_addr.s_addr = inet_addr(SERVER_ADDR);
    srvAddr.sin_family = AF_INET;
    srvAddr.sin_port = htons(PORT);

    // DAT構造体の各種初期化
    Dat[IN_IDX].sock  = socket(AF_INET, SOCK_DGRAM, IPPROTO_IP);
    Dat[OUT_IDX].sock = socket(AF_INET, SOCK_DGRAM, IPPROTO_IP);

    // 発話On/Off の閾値（環境依存なので、試行錯誤で調整）
    Dat[IN_IDX].speekOnLevel   = 30000;
    Dat[IN_IDX].speekOffLevel  = 1000;
    Dat[OUT_IDX].speekOnLevel  = 1000000;
    Dat[OUT_IDX].speekOffLevel = 500000;

    // 音声データ保存領域は拡張RAMに確保
    Dat[IN_IDX].dat   = (uint8_t *)heap_caps_malloc(MAX_DAT, MALLOC_CAP_8BIT|MALLOC_CAP_SPIRAM);
    Dat[OUT_IDX].dat  = (uint8_t *)heap_caps_malloc(MAX_DAT, MALLOC_CAP_8BIT|MALLOC_CAP_SPIRAM);
    Dat[IN_IDX].prev  = (uint8_t *)heap_caps_malloc(MAX_PREV, MALLOC_CAP_8BIT|MALLOC_CAP_SPIRAM);
    Dat[OUT_IDX].prev = (uint8_t *)heap_caps_malloc(MAX_PREV, MALLOC_CAP_8BIT|MALLOC_CAP_SPIRAM);

    if (!Dat[IN_IDX].dat || !Dat[OUT_IDX].dat || !Dat[IN_IDX].prev || !Dat[OUT_IDX].prev) {
        ESP_LOGE(TAG, "alloc error");
        return;
    }

    // PREV buffer の初期化
    memset(Dat[IN_IDX].prev, 0, MAX_PREV);
    memset(Dat[OUT_IDX].prev, 0, MAX_PREV);

    reazonSpeechInited = true;

    while (1) {
        //sendto(Dat[IN_IDX].sock, Dat[IN_IDX].dat, 8192, 0, (sockaddr *)&srvAddr, sizeof(srvAddr));
        vTaskDelay(500);
    }
}

