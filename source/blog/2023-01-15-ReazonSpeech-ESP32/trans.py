# ReazonSpeechサーバ（UDPパケット経由）

import torch
from espnet2.bin.asr_inference import Speech2Text
import socket
import numpy as np

import json
import requests

device = "cuda" if torch.cuda.is_available() else "cpu"
nbest = 2#@param {type:"integer"}
sample_rate = 16000
config = "exp/asr_train_asr_conformer_raw_jp_char_sp/config.yaml"
model = "exp/asr_train_asr_conformer_raw_jp_char_sp/33epoch.pth"
reazonspeech = Speech2Text(config, model, nbest=nbest, batch_size=0, device=device)

# please modify correct webhook URL.  Ref) https://api.slack.com/messaging/webhooks
SLACK_URL = "https://hooks.slack.com/services/XXXXXXXXXXXXXXXXXXXXXXXXX"


def transcribe(speech):
    asr_results = reazonspeech(speech)
    print([asr_results[i][0] for i in range(nbest)])
    #print(asr_results)
    return asr_results[0][0]


def trans_pcm(raw_data, in_out):
    try:
        # 16bit 16KHz raw data (little endian)
        data = np.frombuffer(raw_data, dtype=np.int16)
        data = np.array(data, dtype=np.float32) / 32768.0

        trans_data = transcribe(data)
        if SLACK_URL and len(trans_data) >= 3:
            data = {"text": f"ReazonSpeech({in_out}): {trans_data}"}
            requests.post(SLACK_URL, data=json.dumps(data))

    except Exception as e:
        print(e)


def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.bind(("0.0.0.0", 8000))
    data_dict = {}
    print("start")

    while True:
        pkt, addr = s.recvfrom(65536)
        if len(pkt) <= 1:
            continue

        if not addr in data_dict:
            #print(addr)
            data_dict[addr] = b''

        flag = pkt[0]
        data_dict[addr] += pkt[1:]

        if flag & 1:
            in_out = "in" if (flag & 2) else "out"
            print("start-trans (%s)" % in_out)
            trans_pcm(data_dict[addr], in_out)
            print()
            del(data_dict[addr])


main()

