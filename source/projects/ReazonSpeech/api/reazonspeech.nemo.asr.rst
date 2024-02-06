=====================
reazonspeech.nemo.asr
=====================

.. py:module:: reazonspeech.nemo.asr

このリファレンスでは、NeMoモデルで音声認識するためのインターフェイスを解説します。

関数
====

.. function:: load_model(device=None)

   ReazonSpeechのNeMoモデルをロードする。

   :param device str: ``cuda``, ``cpu`` または ``mps``  ( ``None`` 指定で自動選択)
   :rtype: nemo.collections.asr.models.EncDecRNNTBPEModel

.. function:: transcribe(model, audio, config=None)

   ReazonSpeechモデルで音声を認識し、結果を返却する。

   **サンプルコード**

   .. code:: python3

      from reazonspeech.nemo.asr import audio_from_path, load_model, transcribe

      audio = audio_from_path("test.wav")
      model = load_model()
      ret = transcribe(model, audio)

      print('TEXT:')
      print('  -', ret.text)

      print('SEGMENTS:')
      for segment in ret.segments:
          print('  -', segment)

      print('SUBWORDS:')
      for subword in ret.subwords[:9]:
          print('  -', subword)

   **実行結果**

   .. code:: yaml

      TEXT:
        - ヤンバルクイナとの出会いは18歳の時だった。
      SEGMENTS:
        - Segment(start_seconds=0.6, end_seconds=2.44, text='ヤンバルクイナとの出会いは')
        - Segment(start_seconds=3.08, end_seconds=4.44, text='18歳の時だった。')
      SUBWORDS:
        - Subword(seconds=0.60, token_id=2, token='')
        - Subword(seconds=0.84, token_id=653, token='ヤ')
        - Subword(seconds=1.0, token_id=25, token='ン')
        - Subword(seconds=1.08, token_id=140, token='バ')
        - Subword(seconds=1.24, token_id=44, token='ル')
        - Subword(seconds=1.4, token_id=66, token='ク')
        - Subword(seconds=1.56, token_id=69, token='イ')
        - Subword(seconds=1.64, token_id=148, token='ナ')

   :param nemo.collections.asr.models.EncDecRNNTBPEModel model: ReazonSpeechモデル
   :param AudioData audio: 音声データ
   :param reazonspeech.nemo.asr.TranscribeConfig config: 追加オプション（省略可）
   :rtype: reazonspeech.nemo.asr.TranscribeResult

補助関数
========

.. function:: audio_from_path(path)

   音声ファイルを読み込み、音声データを返却する。

   :param str path: 音声ファイルのパス
   :rtype: AudioData

.. function:: audio_from_numpy(array, samplerate)

   Numpyの配列を受け取り、音声データを返却する。

   :param array numpy.ndarray: 音声データ
   :param samplerate int: サンプリングレート
   :rtype: AudioData

.. function:: audio_from_tensor(tensor, samplerate)

   PyTorchのテンソルを受け取り、音声データを返却する。

   :param array torch.tensor: 音声データ
   :param samplerate int: サンプリングレート
   :rtype: AudioData

クラス
======

.. class:: TranscribeConfig

   音声認識の処理を調整するための設定値クラス

   .. attribute:: verbose
      :type: bool
      :value: True

      Falseがセットされた場合、プログレスバーを無効化する。

.. class:: TranscribeResult

   音声認識の結果を格納するためのデータクラス

   .. attribute:: text
      :type: str

      音声認識結果の文字列

   .. attribute:: segments
      :type: List[Segment]

      タイムスタンプ付きの認識結果

   .. attribute:: subwords
      :type: List[Subword]

      サブワード単位のタイムスタンプ情報

.. class:: Segment

   音声認識結果のセグメント

   .. attribute:: start_seconds
      :type: float

      セグメントの開始時刻

   .. attribute:: end_seconds
      :type: float

      セグメントの終了時刻

   .. attribute:: text
      :type: str

      音声認識結果の文字列

.. class:: Subword

   サブワード単位の認識結果

   .. attribute:: seconds
      :type: float

      サブワードの出現時刻

   .. attribute:: token_id
      :type: int

      トークンID

   .. attribute:: text
      :type: str

      サブワード文字列

.. class:: AudioData

   音声データを格納するためのコンテナ

   .. attribute:: waveform
      :type: numpy.array

      音声データ

   .. attribute:: samplerate
      :type: int

      サンプリングレート
