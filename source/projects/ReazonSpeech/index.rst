.. meta::
   :description: ReazonSpeechは、世界最大のオープン日本語音声コーパスを構築するプロジェクトです。

============
ReazonSpeech
============

**ReazonSpeechは、世界最大のオープン日本語音声コーパスを構築するプロジェクトです。**

* 日本語音声技術の推進を目的として、35,000時間の日本語音声コーパスを公開しています。
* 音声認識モデル・コーパス作成ライブラリをオープンソースライセンスで配布しています。

.. list-table::
   :header-rows: 1
   :widths: 1 1 2

   * - リソース
     - ライセンス
     - URL

   * - 音声認識モデル
     - `Apache-2.0`_
     - `reazonspeech-nemo-v2 <https://huggingface.co/reazon-research/reazonspeech-nemo-v2>`_

       `reazonspeech-k2-v2 <https://huggingface.co/reazon-research/reazonspeech-k2-v2>`_

       `reazonspeech-espnet-v2 <https://huggingface.co/reazon-research/reazonspeech-espnet-v2>`_  

   * - 音声処理ライブラリ
     - `Apache-2.0`_
     - https://github.com/reazon-research/ReazonSpeech

   * - 日本語音声コーパス
     - `CDLA-Sharing-1.0`_
       （ただし利用目的は著作権法３０条の４に定める情報解析に限る）
     - https://huggingface.co/datasets/reazon-research/reazonspeech

   * - 研究論文
     -
     - http://research.reazon.jp/_static/reazonspeech_nlp2023.pdf

.. _Apache-2.0: https://www.apache.org/licenses/LICENSE-2.0
.. _CDLA-Sharing-1.0: https://cdla.dev/sharing-1-0/

ReazonSpeechコーパスのサンプル音声
==================================

.. list-table::
   :header-rows: 1
   :widths: 5 5

   * - ラベル
     - 音声
   * - 気象庁は、雪や路面の凍結による交通への影響、暴風雪や高波に警戒するとともに、雪崩や屋根からの落雪にも十分注意するよう呼びかけています。
     - .. raw:: html

          <audio controls src="../../_static/speech-001.wav">

   * - はやくおじいさんにあのおとこのはなしをきかせたかったのです。
     - .. raw:: html

          <audio controls src="../../_static/speech-002.wav">

   * - ヤンバルクイナとの出会いは１８歳の時だった。
     - .. raw:: html

          <audio controls src="../../_static/speech-003.wav">

   * - Ｈ２Ａは、打ち上げの成功率は高い一方、１回の打ち上げ費用がおよそ１００億円と、高額であることが課題となっていました。

     - .. raw:: html

          <audio controls src="../../_static/speech-004.wav">

   * - 持ち主とはぐれた傘が風で舞い看板もなぎ倒されてしまったようです。

     - .. raw:: html

          <audio controls src="../../_static/speech-005.wav">

ReazonSpeechの音声認識モデルの性能
==================================

ReazonSpeechの音声認識モデルは最先端の性能を実現しています。

* 次の図は `JSUT-bookコーパス`_ を検証データセットとして、
  日本語音声認識モデルの処理速度と認識精度を散布図にプロットしたものです。
* 縦軸と横軸ともに、原点に近いほど高い性能であることを表します。

.. figure:: ../../_static/rtf.png

:関連記事:
  * :any:`/blog/2024-02-14-ReazonSpeech`

.. _JSUT-bookコーパス: https://sites.google.com/site/shinnosuketakamichi/publication/jsut-book

.. toctree::
   :maxdepth: 1
   :caption: コンテンツリンク

   quickstart.rst
   howto.rst
   api/index.rst
