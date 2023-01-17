============
ReazonSpeech
============

**ReazonSpeech** は、約19,000時間の放送音声からなるラベル付き日本語音声コーパスです。
日本語音声認識技術の研究の推進を目的として構築されました。

音声コーパスに加えて、コーパスを構築するためのツールキット及び学習済みモデルを
自由なライセンスで公開しています。

日本語音声コーパス:
    https://huggingface.co/datasets/reazon-research/reazonspeech
学習済みESPnetモデル |colab| :
    https://huggingface.co/reazon-research/reazonspeech-espnet-v1
コーパス構築ツールキット:
    https://github.com/reazon-research/ReazonSpeech

.. |colab| image:: https://colab.research.google.com/assets/colab-badge.svg 
    :target: https://colab.research.google.com/drive/1mcFngwmQK1Teurfiiv6XFD0uNvDjUd43#scrollTo=EWQjsbq9RXpR

音声コーパスのサンプル
======================

.. list-table::
   :header-rows: 1
   :widths: 10 5

   * - 字幕
     - 音声
   * - 気象庁は雪や路面の凍結による交通への影響暴風雪や高波に警戒するとともに雪崩や屋根からの落雪にも十分注意するよう呼びかけています
     - .. raw:: html

          <audio controls src="../../_static/speech-001.wav">

   * - はやくおじいさんにあのおとこのはなしをきかせたかったのです
     - .. raw:: html

          <audio controls src="../../_static/speech-002.wav">

   * - ヤンバルクイナとの出会いは１８歳の時だった
     - .. raw:: html

          <audio controls src="../../_static/speech-003.wav">

音声認識技術への応用性
======================

日本語音声認識の研究に利用できることを示すために、
ReazonSpeechでESPnetのConformer-Transformerモデルを訓練しました。

JSUT・Common Voiceを検証データとして、他の主要な音声認識モデルと精度を比較した結果を以下に示します。

+------------------------+----------------+--------------+
|                        | JSUT Basic5000 | Common Voice |
+========================+================+==============+
| Whisper small          |           14.4 |         15.2 |
+------------------------+----------------+--------------+
| ESPnet LaboroTVSpeech  |           11.7 |         12.6 |
+------------------------+----------------+--------------+
| Whisper medium         |            9.9 |         11.4 |
+------------------------+----------------+--------------+
| Whisper large-v2       |            8.2 |          9.7 |
+------------------------+----------------+--------------+
| ESPnet ReazonSpeech    |            8.2 |          9.9 |
+------------------------+----------------+--------------+

最先端の大規模モデルに匹敵する高い認識精度が実現できています。
詳細は論文の予稿を公開していますので、参照ください。

.. toctree::
   :maxdepth: 1
   :caption: コンテンツリンク

   quickstart.rst
   howto.rst
   api.rst
