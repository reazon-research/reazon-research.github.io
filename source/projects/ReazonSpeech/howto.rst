===========
HowToガイド
===========

.. _reazonspeech-corpus:

日本語音声コーパスにアクセスする
================================

.. important::

   コーパスの利用目的は著作権法３０条の４に定める情報解析に限ります。

* ReazonSpeechプロジェクトでは、35,000時間の日本語音声コーパスを公開しています。
* データセットには `Hugging Face Datasets <https://huggingface.co/docs/datasets/>`_ 経由でアクセスできます。

.. list-table::
   :widths: 2 3

   * - データセットにアクセスするには、`Hugging Face上で規約に同意してください。 <https://huggingface.co/datasets/reazon-research/reazonspeech>`_

     - .. figure:: ../../_static/huggingface.png
          :width: 80%

   * - Hugging Faceにアクセスできる環境を作成します。

       * `Hugging Face公式ドキュメント <https://huggingface.co/docs/datasets/installation>`_

     - .. code:: console

          $ # Pythonのvenv環境作成
          $ python3 -m venv venv
          $ source venv/bin/activate

          $ # 環境セットアップ
          $ pip install datasets soundfile librosa
          $ huggingface-ctl login

   * - Hugging Faceからデータセットを取得します。

     - >>> # 約600MBのダウンロードが発生します。
       >>> from datasets import load_dataset
       >>> ds = load_dataset("reazon-research/reazonspeech")

   * - ダウンロードが完了すれば成功です！

     - >>> ds["train"]
       Dataset({
           features: ['name', 'audio', 'transcription'],
           num_rows: 2637
       })

**データ形式**

FLAC形式の音声ファイル（16khzサンプリング）と、テキストラベルのペアから構成されています。

.. code:: python

   {
       'name': '000/0000000000000.flac',
       'audio': {
           'path': '/path/to/000/0000000000000.flac',
           'array': array([ 0.01000000,  ...], dtype=float32),
           'sampling_rate': 16000
       },
       'transcription': '今日のニュースをお伝えします。'
   }

ReazonSpeechでは5種類のデータセットのサイズを提供しています。
デフォルトではtinyが選択されます。

.. table::
   :width: 600px
   :widths: 1 2 2

   =============== ======== =============
   タグ             サイズ   収録時間数
   =============== ======== =============
   tiny              600MB     8.5 時間
   small               6GB     100 時間
   medium             65GB    1000 時間
   large             330GB    5000 時間
   all               2.3TB   35000 時間
   =============== ======== =============

データセットを参照するコード例のパターンは以下の通りです。

.. code-block:: python

   from datasets import load_dataset

   # 1000時間のmediumデータを取得する
   ds = load_dataset("reazon-research/reazonspeech", "medium")

   # 全件データを取得する
   ds = load_dataset("reazon-research/reazonspeech", "all")

   # 全件データにストリームアクセスする
   ds = load_dataset("reazon-research/reazonspeech", "all", streaming=True)

**ReazonSpeech v1データセット**

旧バージョンのReazonSpeechコーパスは次のタグから参照できます。

.. table::
   :width: 600px
   :widths: 1 2 2

   ========= ======= =============
   タグ       サイズ  収録時間数
   ========= ======= =============
   small-v1   350MB       5 時間
   medium-v1   22GB     300 時間
   all-v1       1TB   19000 時間
   ========= ======= =============

**注記**

* 本データセットは、雑音に強いロバストなデータを得るため ``strategy=lax`` で抽出しています。
* 詳しくは :any:`reazonspeech.espnet.oneseg.get_utterances` を参照下さい。

.. _nemo-asr:

Pythonから音声認識モデルを利用する
==================================

ReazonSpeechの音声モデルを利用して、Pythonから音声認識を行う方法を解説します。

.. list-table::
   :widths: 2 3

   * - 実行環境をセットアップします。

     - .. code:: console

          $ # Pythonのvenv環境作成
          $ python3 -m venv venv
          $ source venv/bin/activate

          $ # ffmpegとCythonをインストール
          $ sudo apt install ffmpeg
          $ pip install Cython

   * - ReazonSpeechをインストールします。

     - .. code:: console

          $ git clone https://github.com/reazon-research/ReazonSpeech
          $ pip install ReazonSpeech/pkg/nemo-asr

   * - 右のスクリプトを ``test.py`` という名前で保存します。

       * サンプル音源: :download:`speech-001.wav <../../_static/speech-001.wav>`

     - .. code:: python

          from reazonspeech.nemo.asr import load_model, transcribe, audio_from_path

          # 実行時にHugging Faceからモデルを取得します (2.3GB)
          model = load_model(device='cuda')

          # ローカルの音声ファイルを読み込む
          audio = audio_from_path('speech-001.wav')

          # 音声認識を適用する
          ret = transcribe(model, audio)

          print(ret.text)

   * - 結果が出力されれば成功です！

     - .. code:: console

          $ python3 test.py
          気象庁は雪や路面の凍結による交通への影響、暴風雪や高波に警戒するとともに雪崩や屋根からの落雪にも十分注意するよう呼びかけています。



関数が受け取る引数や返り値の詳細はAPIリファレンス :any:`api/reazonspeech.nemo.asr` を参照ください。

.. note::

   ReazonSpeechはESPnetとNeMoの2種類のモデルを提供しています。

   ESPnetバージョンの音声認識モデルを利用する場合は、
   最初のインストールのステップで次のコマンドを実行します。

   .. code:: console

      $ git clone https://github.com/reazon-research/ReazonSpeech
      $ pip install ReazonSpeech/pkg/espnet-asr

   詳細はAPIリファレンス :any:`reazonspeech.espnet.asr` を参照ください。

ワンセグ放送から字幕情報を抽出する
==================================

.. list-table::
   :widths: 2 3

   * - ReazonSpeechをインストールします。

     - .. code-block:: console

          $ # Pythonのvenv環境作成
          $ python3 -m venv venv
          $ source venv/bin/activate

          $ # ReazonSpeechインストール
          $ git clone https://github.com/reazon-research/ReazonSpeech
          $ pip install ReazonSpeech/pkg/espnet-oneseg

   * - 2. 録画ファイルのパスを引数に与え、 :func:`get_captions()` を呼び出します。

     - >>> import reazonspeech as rs
       >>> captions = rs.get_captions("test.m2ts")

   * - 3. 字幕情報が返却されれば成功です！

     - >>> print(captions[0])
       Caption(start_seconds=3.1605,
               end_seconds=5.1291,
               text='今日のニュースをお伝えします')



ワンセグ放送からコーパスを作成する
==================================

`ReazonSpeech <https://github.com/reazon-research/ReazonSpeech>`_ ライブラリを利用して、
実際に録画データから音声コーパスを作成する方法を示します。

* 以下の手順はUbuntu 20.04で動作を確認しています。

.. list-table::
   :widths: 2 3

   * - 1. ReazonSpeechとESPnetをインストールします。

     - .. code-block:: console

          $ # 作業用の環境を作成する
          $ sudo apt install ffmpeg libsndfile1 git-lfs
          $ python3 -m venv venv
          $ source venv/bin/activate

          $ # ReazonSpeechインストール
          $ git clone https://github.com/reazon-research/ReazonSpeech
          $ pip install ReazonSpeech/pkg/espnet-oneseg

   * - 2. ReazonSpeechの音声認識モデルを取得します

     - .. code-block:: console

          $ git clone https://huggingface.co/reazon-research/reazonspeech-espnet-v2
          $ ln -s reazonspeech-espnet-v1/exp

   * - 3. 以下の :file:`create_corpus.py` を保存して実行します。

     - .. code-block:: console

          $ python3 create_corpus.py ../test.m2ts

   * - 4. ZIPファイルが生成されれば成功です！

     - .. code-block:: console

          $ # corpus.zip には音声データと、対応する字幕情報を
          $ # 収録したファイルが含まれています。
          $ unzip -l corpus.zip
          0001.flac      --+
          0002.flac        | 音声ファイル
          ...            --+
          dataset.json   ... 各々の発話に対応する字幕データ

:コーパス作成スクリプト (create_corpus.py):
    .. code-block::

       import sys
       import reazonspeech as rs
       from espnet2.bin.asr_align import CTCSegmentation

       # ESPnetのCTCSegmentationを用意します
       ctc_segmentation = CTCSegmentation(
           "exp/asr_train_asr_conformer_raw_jp_char/config.yaml",
           "exp/asr_train_asr_conformer_raw_jp_char/valid.acc.ave_10best.pth",
           kaldi_style_text=False,
           fs=16000,
       )

       # 発話情報（字幕と音声のペア）を抽出します
       utterances = rs.get_utterances(sys.argv[1], ctc_segmentation)

       # 抽出した情報をZIP形式で保存します
       rs.save_as_zip(utterances, "corpus.zip")


