===========
HowToガイド
===========

日本語音声コーパスにPythonからアクセスする
==========================================

.. important::

   - コーパスの利用目的は著作権法３０条の４に定める情報解析に限ります。

ReazonSpeechにはHugging Faceの `Datasets <https://huggingface.co/docs/datasets/>`_ ライブラリからアクセスできます。

* データのダウンロードが自動化され、またストリームアクセスもサポートしています。
* 「とりあえずデータを見てみたい・Pythonで音声処理がしたい」という場合におすすめです。

.. list-table::
   :widths: 5 5

   * - 1. 最初にPythonのvirtualenvを作成します。

          インストールの詳しい手順は `Hugging Face公式ドキュメント <https://huggingface.co/docs/datasets/installation>`_ を参照ください。

     - Datasetsのセットアップ例::

           $ python3 -m venv .env
           $ . ./env/bin/activate
           $ pip install datasets

   * - 2. Pythonを起動してデータをロードします。

     - >>> # 約400MBのダウンロードが発生します。
       >>> from datasets import load_dataset
       >>> ds = load_dataset("reazon-research/reazonspeech")

   * - 3. ダウンロードが完了すれば成功です！

     - >>> ds["train"]
       Dataset({
           features: ['name', 'audio', 'transcription'],
           num_rows: 2637
       })

   * - 4. 次のように音声データにアクセスできます。

          :audio: 音声データ・ファイルパス・サンプリングレートを格納
          :transcription: 対応する字幕テキストを格納

     - >>> ds["train"][2000]
       {'audio': {
            'array': array([-0.01190186,  ... ])
            'path': '/tmp/cache/000/57b6f7027e24f.flac',
            'sampling_rate': 16000
        },
        'name': '000/57b6f7027e24f.flac',
        'transcription': '週末の天気を詳しく解説。'}

なお、参照の便宜を踏まえて、データセットは `small` と `all` の二種類を用意しています。

======= ====== ============ ====================================
 種別   サイズ 収録時間数    説明
======= ====== ============ ====================================
 small  350MB  約5時間       確認用のサブセットデータ（既定）
 all    1.3TB  約19,000時間  ReazonSpeechの全件データ
======= ====== ============ ====================================

デフォルトでは `small` が選択されます。
1.3TBの全件データにアクセスしたい場合は、次のように実行してください。

.. code-block::

   # 全件データにアクセスする (1.3TBのダウンロードが発生します)
   ds = load_dataset("reazon-research/reazonspeech", "all")

   # 全件データにストリームアクセスする
   ds = load_dataset("reazon-research/reazonspeech", "all", streaming=True)


録画データから字幕情報を抽出する
================================

`ReazonSpeech <https://github.com/reazon-research/ReazonSpeech>`_ ライブラリを利用すると、
簡単に放送録画データから字幕情報を解析できます。

.. list-table::
   :widths: 5 5

   * - 1. ReazonSpeechをインストールします。

     - .. code-block:: console

           $ sudo apt install ffmpeg libsndfile1
           $ pip install \
               git+https://github.com/reazon-research/ReazonSpeech

   * - 2. 録画ファイルのパスを引数に与え、 :func:`get_captions()` を呼び出します。

     - >>> import reazonspeech as rs
       >>> captions = rs.get_captions("test.m2ts")

   * - 3. 字幕情報が返却されれば成功です！

     - >>> print(captions[0])
       Caption(start_seconds=3.1605,
               end_seconds=5.1291,
               text='今日のニュースをお伝えします')


録画データからコーパスを作成する
================================

`ReazonSpeech <https://github.com/reazon-research/ReazonSpeech>`_ ライブラリを利用して、
実際に録画データから音声コーパスを作成する方法を示します。

* 以下の手順はUbuntu 20.04で動作を確認しています。

.. list-table::
   :widths: 5 5

   * - 1. ReazonSpeechとESPnetをインストールします。

     - .. code-block:: console

           $ sudo apt install ffmpeg libsndfile1 git-lfs
           $ pip install numpy==1.21.1
           $ pip install espnet==202209
           $ pip install \
               git+https://github.com/reazon-research/ReazonSpeech

   * - 2. ReazonSpeechの音声認識モデルを取得します

     - .. code-block:: console

          $ git clone \
            https://huggingface.co/reazon-research/reazonspeech-espnet-v1

   * - 3. 以下の :file:`create_corpus.py` を保存して実行します。

     - .. code-block:: sh

          # 音声認識モデルのフォルダに移動します。
          5 cd reazonspeech-espnet-v1

          # 実際にコーパスを抽出します。
          # * CPUの場合、概ね再生時間の1-2倍速で解析が進みます。
          # * GPUの場合、再生時間の5-6倍速で解析が完了します。
          $ python3 create_corpus.py ../test.m2ts

   * - 4. ZIPファイルが生成されれば成功です！

     - .. code-block:: sh

          # corpus.zip には音声データと、対応する字幕情報を
          # 収録したファイルが含まれています。
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
