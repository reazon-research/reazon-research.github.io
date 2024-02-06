================
クイックスタート
================

このチュートリアルでは、ReazonSpeechの日本語音声モデルを利用して、音声認識を行います。

* より発展的な使い方については :any:`howto` で解説しています。

ReazonSpeechモデルで音声認識する
================================

.. list-table::
   :header-rows: 1
   :widths: 2 3

   * - 手順
     - 実行例
   * - 最初にチュートリアル用のPython環境を作成します。

     - .. code-block:: console

          $ # Pythonのvenv環境作成
          $ python3 -m venv venv
          $ source venv/bin/activate

          $ # ffmpegとCythonをインストール
          $ sudo apt install ffmpeg
          $ pip install Cython

   * - ReazonSpeechレポジトリをクローンし、インストールします。

     - .. code-block:: console

          $ git clone https://github.com/reazon-research/ReazonSpeech
          $ pip install ReazonSpeech/pkg/nemo-asr

   * - 次のサンプル音源を取得し、右のコマンドを実行します。

       * サンプル音源: :download:`speech-001.wav <../../_static/speech-001.wav>`

     - .. code-block:: console

          $ # 実行時にHugging Faceからモデルを自動取得します (2.3GB)
          $ reazonspeech-nemo-asr speech-001.wav

   * - 認識結果が出力されれば成功です！

     - .. code-block::

          [00:00:00.280 --> 00:00:04.759] 気象庁は雪や路面の凍結による交通への影響、
          [00:00:05.160 --> 00:00:07.640] 暴風雪や高波に警戒するとともに
          [00:00:08.200 --> 00:00:12.599] 雪崩や屋根からの落雪にも十分注意するよう呼びかけています。

.. hint::

   ReazonSpeechは複数の出力形式 (WebVTT, SRT, JSON, TSV) をサポートしています。

   *WebVTTでの出力例*

   .. code-block:: console

      $ reazonspeech-nemo-asr --to=vtt speech-001.wav

      WEBVTT

      00:00:00.280 --> 00:00:04.759
      気象庁は雪や路面の凍結による交通への影響、

      00:00:05.160 --> 00:00:07.640
      暴風雪や高波に警戒するとともに

      00:00:08.200 --> 00:00:12.599
      雪崩や屋根からの落雪にも十分注意するよう呼びかけています。

   利用可能なオプションの一覧は、ヘルプを参照ください。

   .. code-block:: console

     $ reazonspeech-nemo-asr --help


次のステップ
============

この記事では、ReazonSpeechの音声認識モデルを利用する方法を学びました。

* ReazonSpeechのより詳しい使い方については :any:`howto` に進んで下さい。
