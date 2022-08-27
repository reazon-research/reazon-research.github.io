#include <string.h>
#include "sdkconfig.h"
#include "esp_event.h"
#include "esp_wifi.h"
#include "esp_wifi_default.h"
#include "esp_log.h"
#include "esp_netif.h"

#include "wifi.h"

static const char *TAG = "WIFI";

#define CONFIG_EXAMPLE_WIFI_SSID "ssid"
#define CONFIG_EXAMPLE_WIFI_PASSWORD "ssid_passwd"

static void on_wifi_disconnect(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    ESP_LOGI(TAG, "Wi-Fi disconnected, trying to reconnect...");
    esp_wifi_connect();
}

static void on_got_ip(void *arg, esp_event_base_t event_base, int32_t event_id, void *event_data)
{
    ip_event_got_ip_t *event = (ip_event_got_ip_t *)event_data;
    ESP_LOGI(TAG, "Got IPv4 event: Interface \"%s\" address: " IPSTR, esp_netif_get_desc(event->esp_netif), IP2STR(&event->ip_info.ip));
}

void wifi_start()
{
    ESP_ERROR_CHECK(esp_netif_init());
    ESP_ERROR_CHECK(esp_event_loop_create_default());

    wifi_init_config_t cfg = WIFI_INIT_CONFIG_DEFAULT();
    cfg.static_rx_buf_num=  10;
    cfg.dynamic_rx_buf_num= 32;
    cfg.tx_buf_type=        1; // original is 0
    cfg.static_tx_buf_num=  0;
    cfg.dynamic_tx_buf_num= 32;
    cfg.cache_tx_buf_num=   0;
    cfg.csi_enable=         0;
    cfg.ampdu_rx_enable=    1;
    cfg.ampdu_tx_enable=    1;
    cfg.amsdu_tx_enable=    0;
    cfg.nvs_enable=         1;
    cfg.nano_enable=        0;
    cfg.rx_ba_win=          6;
    cfg.wifi_task_core_id=  0;
    cfg.beacon_max_len=     752;
    cfg.mgmt_sbuf_num=      32;
    cfg.feature_caps=       1; // original is 3
    cfg.sta_disconnected_pm=0;
    cfg.magic=              523190095;

    ESP_ERROR_CHECK(esp_wifi_init(&cfg));

    esp_netif_inherent_config_t esp_netif_config = ESP_NETIF_INHERENT_DEFAULT_WIFI_STA();

    char *desc;
    asprintf(&desc, "%s: %s", TAG, esp_netif_config.if_desc);
    esp_netif_config.if_desc = desc;
    esp_netif_config.route_prio = 128;
    esp_netif_create_wifi(WIFI_IF_STA, &esp_netif_config);
    free(desc);

    ESP_LOGE("3", "free heap: %d bytes", heap_caps_get_free_size(MALLOC_CAP_INTERNAL));

    esp_wifi_set_default_wifi_sta_handlers();

    ESP_ERROR_CHECK(esp_event_handler_register(WIFI_EVENT, WIFI_EVENT_STA_DISCONNECTED, &on_wifi_disconnect, NULL));
    ESP_ERROR_CHECK(esp_event_handler_register(IP_EVENT, IP_EVENT_STA_GOT_IP, &on_got_ip, NULL));

    ESP_ERROR_CHECK(esp_wifi_set_storage(WIFI_STORAGE_RAM));

    wifi_config_t wifi_config {};
    memcpy(wifi_config.sta.ssid, CONFIG_EXAMPLE_WIFI_SSID, sizeof(CONFIG_EXAMPLE_WIFI_SSID));
    memcpy(wifi_config.sta.password, CONFIG_EXAMPLE_WIFI_PASSWORD, sizeof(CONFIG_EXAMPLE_WIFI_PASSWORD));

    ESP_LOGI(TAG, "Connecting to %s...", wifi_config.sta.ssid);
    ESP_ERROR_CHECK(esp_wifi_set_mode(WIFI_MODE_STA));
    ESP_ERROR_CHECK(esp_wifi_set_config(WIFI_IF_STA, &wifi_config));
    ESP_ERROR_CHECK(esp_wifi_start());

    // if esp_wifi_connect() is comment out, bt voice will be OK
    // if esp_wifi_connect() is enabled, bt voice wii be distorted.
    esp_wifi_connect();
}

