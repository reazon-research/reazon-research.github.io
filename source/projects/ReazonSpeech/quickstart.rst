============================
ReazonSpeechクイックスタート
============================

この記事では、実際にReazonSpeech音声認識モデルを利用する手順を解説します。

* 以下のチュートリアルでは、日本語の音声ファイルを文字起こしします。
* より発展的な使い方（ReazonSpeechコーパスで学習を行う・ReazonSpeechで自前の音声コーパスを作成する）については :any:`howto` で解説しています。

ReazonSpeechを利用した音声認識
==============================

.. list-table::
   :widths: 5 5

   * - 1. 最初にESPnetが利用できる環境を構築します。

          詳しい手順は `ESPnet公式ドキュメント <https://espnet.github.io/espnet/installation.html>`_ を参照ください。

     - ESPnetのセットアップ例::

           $ git clone https://github.com/espnet/espnet
           $ cd espnet/tools
           $ ./setup_anaconda.sh anaconda espnet 3.8
           $ make
           $ . activate_python.sh

   * - 2. 以下のサンプルコード・音声ファイルをローカルに保存し、次のように実行します。

     - ::

          $ python3 decode.py speech-001.wav

   * - 3. 認識結果が出力された成功です！

     - 音声認識結果の例::

          気象庁は雪や路面の凍結による交通への影響暴風雪や
          高波に警戒するとともに雪崩や屋根からの落雪にも
          十分注意するよう呼びかけています

:サンプルコード (decode.py):
    .. code-block::

       import sys
       import librosa
       from espnet2.bin.asr_inference import Speech2Text

       speech2text = Speech2Text.from_pretrained(
         "reazon-research/reazonspeech-espnet-v1"
       )

       speech, rate = librosa.load(sys.argv[1], sr=16000)
       print(speech2text(speech)[0][0])

:サンプル音声 (speech-001.wav):
    :download:`speech-001.wav <../../_static/speech-001.wav>` からダウンロードできます。

次のステップ
============

このチュートリアルでは、ReazonSpeechの学習済み音声認識モデルの使い方を学びました。

* ReazonSpeechモデルを活用して、推論を実行することができるようになりました。
* ReazonSpeechのより発展的な使い方については :any:`howto` に進んで下さい。
