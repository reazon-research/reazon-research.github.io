===========
HowToガイド
===========

日本語音声コーパスにPythonからアクセスする
==========================================

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

Hugging Faceからデータをダウンロードする
========================================

全データセットをHugging Faceからダウンロードするには次のように実行します::

    $ git lfs install
    $ git clone https://huggingface.co/datasets/reazon-research/reazonspeech

Gitレポジトリには以下のデータが格納されています::

    reazonspeech/
    ├── README.md
    ├── all.tsv        ... 字幕データ (全件)
    ├── small.tsv      ... 字幕データ (サブセット)
    └── data
        ├── 000.tar    --+
        ├── 001.tar      | flac音声ファイルは4096個のtarに
        ├── ...          | 分割して格納しています。
        └── fff.tar    --+
