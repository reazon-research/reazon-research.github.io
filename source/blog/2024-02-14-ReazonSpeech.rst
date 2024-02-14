========================================================================
(2024-02-14) ReazonSpeech v2.0: 音声モデルの高速化とコーパスの大幅な拡大
========================================================================

2024年2月14日に、ReazonSpeechの最新バージョン v2.0 を公開したことをお知らせします。

ReazonSpeech v2.0では、音声認識モデルの飛躍的な性能アップデートを実現しており、
また公開する日本語音声コーパスも35000時間に大幅に拡大しています。

この記事では、今回のアップデートのハイライトをお伝えします。

ReazonSpeech v2.0で何がリリースされたのか？
===========================================

今回、ヒューマンインタラクション研究所では次の3点をリリースしました。

.. list-table::
   :header-rows: 1
   :widths: 2 3 2

   * - 対象
     - 主なトピック
     - URL
   * - 音声認識モデル (NeMo)
     - * **推論速度を大幅に高速化**
       * 長時間音声の推論サポート
       * 学習データを35000時間に拡大
     - * `Hugging Face <https://huggingface.co/reazon-research/reazonspeech-nemo-v2>`__
       * :any:`/projects/ReazonSpeech/quickstart`
       * :ref:`HowToガイド <nemo-asr>`
   * - 音声認識モデル (ESPnet)
     - * 学習データを35000時間に拡大
       * 句読点の推論機能
     - * `Hugging Face <https://huggingface.co/reazon-research/reazonspeech-espnet-v2>`__
   * - 日本語音声コーパス
     - * **収録時間数を35000時間に拡大**
       * 5種類のデータセットサイズの提供開始
     - * `Hugging Face <https://huggingface.co/datasets/reazon-research/reazonspeech>`__
       * :ref:`HowToガイド <reazonspeech-corpus>`

それぞれのリリースアセットの詳細は、表の各リンクから参照できます。
この記事の以降では、今回のリリースの特に重要なポイントについて解説を加えます。

音声認識モデルの大規模アップデート
==================================

ReazonSpeech v2.0では、従来のESPnetに加え、NVIDIA NeMoベースのモデルの提供をスタートします。

この新しく提供するモデルの最大の特徴は、高速かつ高精度に日本語を認識できる点です。
次の図をご覧ください。

.. figure:: ../_static/blog/2024-02-14-ReazonSpeech/rtf.png
   :width: 800

この図は、日本語音声認識モデルの処理速度と認識精度を散布図にプロットしたものです。
縦軸と横軸ともに、原点に近いほど高い性能であることを表します。 [#note]_

この図からいくつかのポイントが見てとれます：

* まず、音声認識において、速度・精度の間にトレードオフの関係があることが確認できます。
  一般に、高精度の音声認識には、パラメーター数の多い巨大なモデルが必要となり、
  その分だけ処理時間が長くなります。図の点線のカーブは、この関係を示すものです。

* 従来のモデル群は、実質的に同じトレードオフの前線に位置していました。
  例えば、WhisperのSmallモデルはMediumモデルの1.7倍速で推論を行えますが、その分だけ精度が劣化します。

今回、ReazonSpeech v2.0では、認識精度と処理速度の両立を実現しました。

* ReazonSpeech v1.1と比較すると、精度は保ったまま、推論速度が7倍以上に高速化しています。

* 同じことをOpenAI Whisperとの比較で言い替えると、Whisperの最も小さいTinyモデルの速度で、
  最も大きいLargeモデル相当の精度を達成できています。

さらに、ReazonSpeech v2.0の認識精度の頑健性を示すために、
JSUT-BASIC5000 [#jsut-basic5000]_ 、Common Voice v8.0 [#cv]_ 、
TEDxJP-10K [#tedx]_ の3つのデータセットに対して測定を行いました。
その結果が次の図です。

.. figure:: ../_static/blog/2024-02-14-ReazonSpeech/cer.png
   :width: 700

様々なデータセットに対して、ロバストに推論を実行できていることが確認できます。

今回、公式サイトでは :ref:`ReazonSpeechの音声認識デモ <reazonspeech-demo>` を用意しています。
次のように、ファイルのドラッグ＆ドロップで簡単に音声をテキストに変換できます。

.. raw:: html

   <video controls width=500 style='margin: 1em 0; border:1px solid #ccc;'>
     <source src='../../_static/blog/2024-02-14-ReazonSpeech/demo.webm' type='video/webm' />
   </video>

また、ReazonSpeechモデルの使い方を :any:`/projects/ReazonSpeech/quickstart` と :any:`/projects/ReazonSpeech/howto` で解説しています。
実際に音声認識モデルを使ってみた感想などのフィードバックをお待ちしています。

.. topic:: 補足: ReazonSpeech v2.0の音声認識モデルはなぜ速いのか？

   今回のアップデートのベースにあるのは、昨年発表されたFast Conformer [#fastconformer]_ という最新の深層学習アーキテクチャです。　
   原論文の Rekesh, et al., 2023 のアブストラクトから引用します。

       Conformerベースのモデルは、音声処理タスクに対するエンドツーエンドアーキテクチャの主流である。
       我々は、Conformerアーキテクチャの訓練と推論を改善を目標として、新しいダウンサンプリングの仕組みを用いて再設計を試みた。
       今回提案するモデルのFast Conformer (FC) はオリジナルのConformerよりも2.8倍高速であり、
       アーキテクチャに本質的な変更を加えなくとも10億パラメータにスケールし、
       認識精度においてもSOTAの性能を達成している。

   重要なポイントとして、Fast ConformerはLongformer [#longformer]_ スタイルの注意機構と組み合わせることができます。
   Transformerは本質的に :math:`O(n^2)` の計算量を必要とするため、長い入力シーケンスの扱いは概して苦手です。
   Longformerの線型のアテンションパターンは、この理論的な限界を克服することを可能にします。

   今回、ReazonSpeech v2.0では改良されたConformerと線型の注意機構を組み合わせたアーキテクチャを採用しました。
   これにより、長時間の音声シーケンスをシングルパスで処理できるようになり、推論速度を大幅に向上させることができました。

従来比1.8倍の日本語音声コーパス
===============================

ReazonSpeechは世界最大のオープン日本語音声コーパスの構築を目指すプロジェクトです。

昨年1月に、放送音声から抽出した19000時間の日本語音声コーパスを公開しました。
これを実現した技術の詳細は `言語処理学会の年次大会で発表した論文 <../../_static/reazonspeech_nlp2023.pdf>`_ で詳しく述べました。

今回は、その手法をさらに推し進め、35000時間のコーパスを構築しました。
これは昨年比で1.8倍に相当する規模となり、英語圏の大規模データセットと比較しても遜色のないスケールに達しています。

さらに、実際のユースケースに配慮し、今回のリリースからサブセットデータの提供も拡大します。
具体的には、全件データに加えて、次のようなサブセットを提供します。

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

これらのデータセットの具体的な利用方法は :ref:`HowToガイド <reazonspeech-corpus>` に記述しています。

今後の展開
==========

当研究所では、ユーザがより効率的に情報伝達を行うための技術研究の一環として、
音声コーパスと音声認識モデルの研究開発を行ってきました。

今回のリリースはその一つの大きなマイルストーンであり、
今後も日本語音声処理技術の発展に向けてより一層研究を進めて参ります。

脚注
====

.. [#note] この図は、約70分の読み上げ音声からなるJSUT-book [#jsut-book]_ を検証データセットとして利用し、
           NVIDIA DGX A100上で認識精度・速度を測定したものです。
.. [#jsut-book] https://sites.google.com/site/shinnosuketakamichi/publication/jsut-book
.. [#jsut-basic5000] Ryosuke Sonobe, Shinnosuke Takamichi and Hiroshi Saruwatari,  "JSUT corpus: free large-scale Japanese speech corpus for end-to-end speech synthesis," arXiv preprint, 1711.00354, 2017.
.. [#cv] https://commonvoice.mozilla.org/
.. [#tedx] https://github.com/laboroai/TEDxJP-10K
.. [#fastconformer] Rekesh, Dima, et al. "Fast conformer with linearly scalable attention for efficient speech recognition." 2023 IEEE Automatic Speech Recognition and Understanding Workshop (ASRU). IEEE, 2023
.. [#longformer] Beltagy, Iz, Matthew E. Peters, and Arman Cohan. "Longformer: The long-document transformer." arXiv preprint arXiv:2004.05150 (2020).
