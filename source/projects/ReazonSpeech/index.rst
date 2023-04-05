.. meta::
   :description: ReazonSpeechは約19,000時間の放送音声からなるラベル付き日本語音声コーパスです。日本語音声認識技術の研究の推進を目的として構築されました

============
ReazonSpeech
============

**ReazonSpeech** は、約19,000時間の放送音声からなるラベル付き日本語音声コーパスです。
日本語音声認識技術の研究の推進を目的として構築されました。

音声コーパスに加えて、コーパスを構築するためのツールキット及び学習済みモデルを
自由なライセンスで公開しています。

.. list-table::
   :header-rows: 1
   :widths: 5 3 10

   * - 公開リソース
     - ライセンス
     - URL

   * - 学習済みESPnetモデル
     - `Apache-2.0`_
     - * `reazonspeech-espnet-v1`_ （安定版）
       * `reazonspeech-espnet-next`_ （最新版）

   * - 音声処理ライブラリ
     - `Apache-2.0`_
     - https://github.com/reazon-research/ReazonSpeech

   * - 日本語音声コーパス
     - `CDLA-Sharing-1.0`_ (ただし利用目的は著作権法３０条の４に定める情報解析に限る)
     - https://huggingface.co/datasets/reazon-research/reazonspeech

   * - 研究論文
     -
     - http://research.reazon.jp/_static/reazonspeech_nlp2023.pdf

.. _Apache-2.0: https://www.apache.org/licenses/LICENSE-2.0
.. _CDLA-Sharing-1.0: https://cdla.dev/sharing-1-0/
.. _reazonspeech-espnet-v1: https://huggingface.co/reazon-research/reazonspeech-espnet-v1
.. _reazonspeech-espnet-next: https://huggingface.co/reazon-research/reazonspeech-espnet-next

日本語音声認識デモ
==================

ReazonSpeechの音声認識モデルを、実際にブラウザで試すことができます [2]_ |colab|

.. |colab| image:: https://colab.research.google.com/assets/colab-badge.svg 
    :target: https://colab.research.google.com/drive/1mcFngwmQK1Teurfiiv6XFD0uNvDjUd43#scrollTo=EWQjsbq9RXpR

.. raw:: html

    <script src='../../_static/asr.js'></script>
    <div class="table-wrapper docutils container">
      <table class='docutils align-default' width=95%>
        <thead>
          <tr>
            <th width='50%'><p>音声認識</th>
            <th width='50%'><p>認識結果</th>
          </tr>
        </thead>
        <tr style='height:180px;vertical-align:top;'>
          <td>
            <p>次のボタンを押してマイクで音声を吹き込むと、認識結果が表示されます。
            <p><button style="margin:1em 0;padding:0.5em;" id='demo-button'>音声認識を試す</button>
          </td>
          <td>
             <p id='demo-message'></p>
          </td>
        </tr>
      </table>
    </div>

.. [2] アクセスが集中すると反応が遅れる場合があります。認識結果が表示されない時は時間をおいて再度お試しください。

音声コーパスのサンプル
======================

.. list-table::
   :header-rows: 1
   :widths: 5 5

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

学習済み音声認識モデルの精度
============================

ReazonSpeechモデルは最先端の大規模モデルに匹敵する精度を実現しています。

以下に、 `JSUT`_ ・ `Common Voice`_ ・ `TEDx`_ の3つのに対して精度を測定した結果を示します。
このグラフは、縦軸が文字誤り率（CER）を表しており、低ければ低いほど高い精度であることを示しています。

.. figure:: ../../_static/blog/2023-04-04-ReazonSpeech/cer.png
   :width: 600

.. _JSUT: https://sites.google.com/site/shinnosuketakamichi/publication/jsut
.. _Common Voice: https://commonvoice.mozilla.org/
.. _TEDx: https://github.com/laboroai/TEDxJP-10K


.. toctree::
   :maxdepth: 1
   :caption: コンテンツリンク

   quickstart.rst
   howto.rst
   api.rst
