.. meta::
   :description: ReazonSpeechライブラリのリファレンスマニュアルです。放送データを解析するためのPythonインターフェイスを提供します。

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
   :param CTCSegmentation ctc_segmentation: ESPnet2のCTCSegmentationインスタンス
   :param Speech2Text speech2text: ESPnet2のSpeech2Textインスタンス（省略可）
   :param str strategy: `optim` または `lax` （既定値は `optim` ）
   :rtype: List
   :return:  :class:`Utterance` のリスト

.. function:: transcribe(audio, speech2text=None, config=None)

   音声ファイルを解析し、文字起こしの結果を返却します。

   任意の長さの音声データに対応しており、自動的に音声を区切ってストリーム処理する機能を備えています。
   具体的な使い方を以下に示します。

   .. code-block::

      import reazonspeech as rs

      for caption in rs.transcribe("test.wav"):
          print(caption)

   音声認識の結果は次のように :class:`Caption` として返却されます。

   .. code-block::

      Caption(start_seconds=1.53, end_seconds=3.26, text="むかしむかし")
      Caption(start_seconds=3.26, end_seconds=7.48, text="丹後国水の江の浦に浦島太郎という漁師がありました")
      Caption(start_seconds=8.68, end_seconds=12.71, text="浦島太郎は毎日釣りざおを担いでは海へ出かけて")

   .. versionadded:: 1.1.0

   :param str, np.array audio: 音声ファイルのパス（または音声データ）
   :param Speech2Text speech2text: ESPnet2のSpeech2Textインスタンス（省略可）
   :param TranscriberConfig config: 音声認識のオプション（省略可）
   :rtype: Iterator[:class:`Caption`]


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

.. class:: TranscriberConfig

   :func:`transcribe` 関数の処理を細かく調整するための設定値クラス

   .. versionadded:: 1.1.0

   .. attribute:: samplerate
      :type: int
      :value: 16000

      音声認識モデルに渡す際のサンプリング周波数

      利用する音声認識モデルが訓練されたサンプルレートに応じて変更してください。
      既定値は `16000` (16khz) です。

   .. attribute:: window
      :type: int
      :value: 320000

      音声処理のウィンドウの長さ

      長い音声については、このウィンドウ単位で分割して認識を行います。
      既定値は `320000` (20秒) です。

   .. attribute:: blank_threshold
      :type: float
      :value: 0.98

      発話区間を推定する際の閾値

      この設定値で、無発話区間とみなす閾値を変更することができます。
      既定値は `0.98` (98%) です。

   .. attribute:: padding
      :type: tuple
      :value: (16000, 8000)

      入力音声に追加されるパディング

      音声認識の際に、入力音声の前後に追加する余白を調整できます。
      既定値は、前に1000ms、後に500msのパディングを補足して認識を行います。
