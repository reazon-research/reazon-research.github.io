===================================================
(2023-04-04) ReazonSpeechの最新モデルを公開しました
===================================================

ReazonSpeechは、世界最大のオープン日本語音声コーパスを構築するプロジェクトです。

このプロジェクトのポイントとして「時間とともにコーパス量が増加する」という点があります。
放送音源を素材データとしているため、解析対象のデータは毎日刻々と増えており、
これに計算リソースを投下すれば、新しいコーパスを継続的に抽出することができます。
この方法で作成できるコーパスは、年間で10000時間以上になります。

ヒューマンインタラクション研究所では、この日々増えていくコーパスを利用して、
音声認識モデルを定期的に訓練しています。

今回、研究所で定期構築する最先端の音声認識モデルを一般公開することにしましたので、
その詳細についてお伝えします。

最新モデルを取得・利用するには
==============================

最新モデルは、Hugging Faceの `reazonspeech-espnet-next <https://huggingface.co/reazon-research/reazonspeech-espnet-next>`_ で公開しています。

利用方法ですが、ReazonSpeechモジュールから簡単に使えるようにしています。
v1のフィードバックを反映して、なるべく手軽に使えるように、ライブラリの実装面でも諸々の改善を図りました。

具体的には次のように使うことができます：

**基本的な利用方法**

.. code:: bash

   # Virtual Environmentを作成
   $ python3 -m venv venv
   $ . ./venv/bin/activate

   # ReazonSpeechをインストール
   $ pip install wheel
   $ pip install git+https://github.com/reazon-research/reazonspeech.git

   # reazonspeechコマンドで音声を文字起こしできます
   $ reazonspeech test.wav

**Pythonコードでの利用例**

.. code::

   import reazonspeech as rs

   # 音声ファイルを直接デコードする
   for caption in rs.transcribe("test.wav"):
       print(caption)

実はこの最新モデルでは、長い音声も問題なく処理できるようになっています
（一定の長さを超えるデータについては、自動的に分割する仕組みが入っているのですが、
この機能については稿を改めて詳しく解説します）。
数十分を超えるような長い音声ファイルを与えてもOKです。

リリースサイクルについて、このレポジトリはローリングリリースで運用する予定です。
研究所で改善が確認できた都度、なるべく早いタイミングで新しいモデルをプッシュします [1]_

最新モデルの精度について
========================

この最新モデルがどの程度の水準かですが、実は今年1月にv1をリリースしてから、
精度面で大きく進歩しています。

以下に、 `JSUT`_ ・ `Common Voice`_ ・ `TEDx`_ の3つのベンチマークに対して精度を測定した結果を示します。
比較として、ReazonSpeech v1とOpenAI Whisperの各モデルの測定結果を併記します [2]_

.. figure:: ../_static/blog/2023-04-04-ReazonSpeech/cer.png
   :width: 600
   :alt: 検証データセットに対する文字誤り率

このグラフのY軸はCER（文字誤り率）で、低ければ低いほど高い精度であることを示します。
ReazonSpeech v1との比較で、ReazonSpeech-nextは認識精度が更に約2%向上しています。

.. _JSUT: https://sites.google.com/site/shinnosuketakamichi/publication/jsut
.. _Common Voice: https://commonvoice.mozilla.org/
.. _TEDx: https://github.com/laboroai/TEDxJP-10K

フィードバック大歓迎です！
==========================

この記事では、最新のReazonSpeech深層学習モデルの
`reazonspeech-espnet-next <https://huggingface.co/reazon-research/reazonspeech-espnet-next>`_ について紹介しました。

ReazonSpeechプロジェクトでは、音声処理コミュニティからのフィードバックを受け付けています。
プロジェクトに関心がある・この部分を改良したい等のアイデアがあれば、
`GitHub <https://github.com/reazon-research/ReazonSpeech>`_ のIssueまたはDiscussionにて一緒に議論しましょう！

----

.. [1] リリースサイクルとしては開発版に相当します（対して `reazonspeech-espnet-v1 <https://huggingface.co/reazon-research/reazonspeech-espnet-v1>`_ は安定版です）。最新の研究成果が統合されており、次のリリースに向けたステージングの役割を兼ねています。

.. [2] なお reazonspeech-next は、ReazonSpeechの ``transcribe()`` 関数を利用して測定しています。
       Whisperについては、本記事執筆時点（2023年4月）のmasterの最新版を利用しました。
