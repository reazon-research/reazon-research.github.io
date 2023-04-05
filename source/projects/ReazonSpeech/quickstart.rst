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

   * - 1. ReazonSpeechをインストールします。

     - .. code-block:: bash

           # Virtual Environmentを作成
           $ python3 -m venv venv
           $ . ./venv/bin/activate

           # ReazonSpeechをインストール
           $ pip install wheel
           $ pip install git+https://github.com/reazon-research/reazonspeech.git

   * - 2. サンプル音声 :download:`speech-001.wav <../../_static/speech-001.wav>` を取得し、
          右のコマンドを実行します。

     - .. code-block:: console

          $ reazonspeech speech-001.wav

   * - 3. 認識結果が出力された成功です！

     - 音声認識結果の出力例:

       .. code-block:: json

          {"start_seconds": 0.528,
           "end_seconds": 5.325,
           "text": "気象庁は雪や路面の凍結による交通への影響"}

.. hint::

   ReazonSpeechは複数の出力フォーマットをサポートしています（デフォルトはJSON形式です）。

   例えば、次のように実行すると、字幕をWebVTT形式で出力できます。

   .. code-block:: console

      $ reazonspeech --to=vtt speech-001.wav
      WEBVTT

      00:00:00.527 --> 00:00:05.325
      気象庁は雪や路面の凍結による交通への影響

      00:00:05.325 --> 00:00:12.521
      暴風雪や高波に警戒するとともに雪崩や屋根からの落雪にも十分注意するよう呼びかけています

   利用可能なフォーマットの一覧などはヘルプから確認できます。

   .. code-block:: console

     $ reazonspeech --help


次のステップ
============

このチュートリアルでは、ReazonSpeechの学習済み音声認識モデルの使い方を学びました。

* ReazonSpeechモデルを活用して、推論を実行することができるようになりました。
* ReazonSpeechのより発展的な使い方については :any:`howto` に進んで下さい。
