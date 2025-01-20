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

          $ # ffmpegをインストール
          $ sudo apt install ffmpeg

   * - ReazonSpeechレポジトリをクローンし、インストールします。

     - .. code-block:: console

          $ git clone https://github.com/reazon-research/ReazonSpeech
          $ pip install ReazonSpeech/pkg/k2-asr

   * - 右のスクリプトを ``asr.py`` という名前で保存します。

     - .. code:: python

          import sys
          from reazonspeech.k2.asr import load_model, transcribe, audio_from_path

          # 実行時にHugging Faceからモデルを取得します (1.5GB)
          model = load_model()

          # ローカルの音声ファイルを読み込む
          audio = audio_from_path(sys.argv[1])

          # 音声認識を適用する
          ret = transcribe(model, audio)

          print(ret.text)

   * - 次のサンプル音源を取得し、スクリプトを実行します。

       * サンプル音源: :download:`speech-001.wav <../../_static/speech-001.wav>`

       結果が表示されたら成功です！

     - .. code-block:: console

        $ python3 asr.py speech-001.wav
        気象庁は雪や路面の凍結による交通への影響暴風雪や高波に警戒するとともに雪崩や屋根からの落雪にも十分注意するよう呼びかけています

.. hint::

   ReazonSpeechを利用すると、文字起こしの結果だけではなく、発話に対応するタイムスタンプ情報も取得することができます。

   *サンプルコード*

   .. code-block:: python

      from reazonspeech.k2.asr import load_model, transcribe, audio_from_path

      model = load_model()
      audio = audio_from_path('speech-001.wav')

      ret = transcribe(model, audio)
      for sw for ret.subwords:
          print(sw.seconds, sw.token)

   *出力例*

   .. code-block:: console

      $ python3 test.py
      0.00 気
      1.04 象
      1.20 庁
      1.44 は
      1.96 雪
      2.16 や
      2.56 路
      2.80 面
      2.92 の
      3.20 凍
      3.44 結
      ...

   詳細は APIリファレンス :any:`api/reazonspeech.k2.asr` を参照ください。

.. seealso::

   ReazonSpeechを手軽に試せるGoogle Colabノートブックを用意しています。

   .. raw:: html

      <p><a href="https://colab.research.google.com/github/reazon-research/ReazonSpeech/blob/master/colab/ReazonSpeech_v2_0.ipynb">
       <img alt="colab" src="https://colab.research.google.com/assets/colab-badge.svg" />
      </a>

次のステップ
============

この記事では、ReazonSpeechの音声認識モデルを利用する方法を学びました。

* ReazonSpeechのより詳しい使い方については :any:`howto` に進んで下さい。
