============================
ReazonSpeech APIリファレンス
============================

* このリファレンスマニュアルでは `ReazonSpeech <https://github.com/reazon-research/ReazonSpeech>`_ ライブラリについて解説します。
* MPEG2-TS形式のデータを情報解析する各種のPythonインターフェイスを提供します。

関数
====

.. function:: get_captions(path)

   MPEG2-TSファイルから字幕テキストを読み取ります。

   :param str path: MPEG2-TSファイルのパス
   :rtype: List
   :return:  :class:`Caption` のリスト

.. function:: get_utterances(path, ctc_segmentation, speech2text=None, strategy='optim')

   MPEG2-TSファイルから音声コーパスを抽出します。

   音声ファイルの切り出しについて、2つのモードをサポートしています。

   * `optim` は音声認識モデルをもとに最適なポイントで音声を切り出します。
     余計なノイズの少ないクリーンなコーパスを作成する場合に適しています。

   * `lax` は前後の文脈を含めて余分に切り出します。
     ロバストな音声認識に適したコーパスが得られます。

   また、`speech2text` を呼び出し時に渡すことで、追加の精度指標（文字誤り率）を計算できます。
   省略した場合 :attr:`Utterance.asr` と :attr:`Utterance.cer` は :code:`None` になります。

   :param str path: MPEG2-TSファイルのパス
   :param CTCSegmentation ctc_segmentation: ESPNet2のCTCSegmentationインスタンス
   :param Speech2Text speech2text: ESPNet2のSpeech2Textインスタンス（省略可）
   :param str strategy: `optim` または `lax` （既定値は `optim` ）
   :rtype: List
   :return:  :class:`Utterance` のリスト

補助関数
========

.. function:: build_sentences(captions)

   字幕テキストをセンテンス単位に再構成します。

   次のように文の途中で字幕が分割されているケースを想定した関数です::

     Caption(start_seconds=10, end_seconds=12, text='輸送機は午前１０時に')
     Caption(start_seconds=12, end_seconds=15, text='離陸しました。')

   この関数を適用すると、次のように文単位に字幕をマージできます::

     Caption(start_seconds=10, end_seconds=15, text='輸送機は午前１０時に離陸しました。')

   :param str captions: :class:`Caption` のリスト
   :rtype: List
   :return:  :class:`Caption` のリスト

.. function:: save_as_zip(utterances, path, format='flac')

   日本語音声コーパスをZIP形式で保存します。

   フォーマットは `python-soundfile <https://github.com/bastibe/python-soundfile>`_ がサポートしている形式を指定できます（既定値は `flac` です）

   :param list Utterances: :class:`Utterances` のリスト
   :param str path: 保存先のファイルパス
   :param str format: 発話を保存するファイル形式
   :rtype: None

クラス
======

.. class:: Caption

   MPEG2-TSファイルから抽出された字幕に対応するデータクラスです。

   開始・終了時刻は、動画の先頭からの経過秒数を計算して格納しています。

   .. attribute:: start_seconds
      :type: int

      字幕の表示開始タイミング

   .. attribute:: end_seconds
      :type: int

      字幕の表示終了タイミング

   .. attribute:: text
      :type: str

      字幕テキスト

.. class:: Utterance

   MPEG2-TSファイルから抽出された発話に対応するデータクラスです。

   .. attribute:: buffer
      :type: numpy.array

      音声データを表すNumpyのArray

   .. attribute:: samplerate
      :type: int

      音声データのサンプルレート

   .. attribute:: duration
      :type: float

      音声データの再生秒数

   .. attribute:: start_seconds
      :type: float

      動画の先頭からの開始秒数

   .. attribute:: end_seconds
      :type: float

      動画の先頭からの終了秒数

   .. attribute:: text
      :type: str

      字幕テキスト

   .. attribute:: ctc
      :type: float

      CTC Segmentationの適合度スコア

   .. attribute:: asr
      :type: str

      Speech2Textが出力した認識結果  (speech2textを省略した場合はNone)

   .. attribute:: cer
      :type: float

      Speech2Textの認識結果の文字誤り率 (speech2textを省略した場合はNone)


