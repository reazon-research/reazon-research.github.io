===================
reazonspeech.k2.asr
===================

.. py:module:: reazonspeech.k2.asr

このリファレンスでは、K2モデルで音声認識するためのインターフェイスを解説します。

関数
====

.. function:: load_model(device="cpu", precision="fp32", language="ja")

   ReazonSpeechのK2モデルをロードする。

   :param device: ``cuda``, ``cpu`` または ``coreml``
   :param precision: ``fp32``, ``int8`` または ``int8-fp32``
   :param language: ``ja`` または ``ja-en``
   :rtype: sherpa_onnx.OfflineRecognizer

.. function:: transcribe(model, audio, config=None)

   ReazonSpeechモデルで音声を認識し、結果を返却する。

   **サンプルコード**

   .. code:: python3

      from reazonspeech.k2.asr import audio_from_path, load_model, transcribe

      audio = audio_from_path("test.wav")
      model = load_model()
      ret = transcribe(model, audio)

      print('TEXT:')
      print('  -', ret.text)

      print('SUBWORDS:')
      for subword in ret.subwords[:9]:
          print('  -', subword)

   **実行結果**

   .. code:: yaml

      TEXT:
        - ヤンバルクイナとの出会いは十八歳の時だった
      SUBWORDS:
        - Subword(seconds=0.03, token='ヤ')
        - Subword(seconds=1.36, token='ン')
        - Subword(seconds=1.55, token='バ')
        - Subword(seconds=1.75, token='ル')
        - Subword(seconds=1.91, token='ク')
        - Subword(seconds=2.11, token='イ')
        - Subword(seconds=2.27, token='ナ')
        - Subword(seconds=2.51, token='と')
        - Subword(seconds=2.67, token='の')

   :param sherpa_onnx.OfflineRecognizer model: ReazonSpeechモデル
   :param AudioData audio: 音声データ
   :param TranscribeConfig config: 追加オプション（省略可）
   :rtype: TranscribeResult

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

.. class:: TranscribeResult

   音声認識の結果を格納するためのデータクラス

   .. attribute:: text
      :type: str

      音声認識結果の文字列

   .. attribute:: subwords
      :type: List[Subword]

      サブワード単位のタイムスタンプ情報

.. class:: Subword

   サブワード単位の認識結果

   .. attribute:: seconds
      :type: float

      サブワードの出現時刻

   .. attribute:: token
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
