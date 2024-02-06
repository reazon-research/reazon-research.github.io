=======================
reazonspeech.espnet.asr
=======================

.. py:module:: reazonspeech.espnet.asr

このリファレンスでは、ESPnetモデルで音声認識するためのインターフェイスを解説します。

関数
====

.. function:: load_model(device=None)

   ReazonSpeechのESPnetモデルをロードする。

   :param device str: ``cuda`` もしくは ``cpu`` ( ``None`` 指定で自動選択)
   :rtype: espnet.bin.asr_inference.Speech2Text


.. function:: transcribe(model, audio, config=None)

   ReazonSpeechモデルで音声を認識し、結果を返却する。

   **サンプルコード**

   .. code:: python3

      from reazonspeech.espnet.asr import audio_from_path, load_model, transcribe

      audio = audio_from_path("test.wav")
      model = load_model()
      ret = transcribe(model, audio)

      print('TEXT:')
      print('  -', ret.text)

      print('SEGMENTS:')
      for segment in ret.segments:
          print('  -', segment)

   **実行結果**

   .. code:: yaml

      TEXT:
        - ヤンバルクイナとの出会いは18歳の時だった。
      SEGMENTS:
        - Segment(start_seconds=0.91, end_seconds=6.08, text='ヤンバルクイナとの出会いは18歳の時だった。')

   :param espnet2.bin.asr_inference.Speech2Text model: ReazonSpeechモデル
   :param AudioData audio: 音声データ
   :param reazonspeech.espnet.asr.TranscribeConfig config: 追加オプション（省略可）
   :rtype: reazonspeech.espnet.asr.TranscribeResult

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

.. class:: AudioData

   音声データを格納するためのコンテナ

   .. attribute:: waveform
      :type: numpy.array

      音声データ

   .. attribute:: samplerate
      :type: int

      サンプリングレート
