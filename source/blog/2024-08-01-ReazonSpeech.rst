======================================================================
(2024-08-01) ReazonSpeech v2.1: Setting a New Standard in Japanese ASR
======================================================================

Today, we're excited to announce ReazonSpeech v2.1. In this release, we
publish ReazonSpeech-k2-v2, an open-source Japanese ASR model which sets
new records in benchmark tests. It is built on the
`Next-gen Kaldi framework <https://k2-fsa.org/>`_, and distributed in
the platform-neutral
`Open Neural Network Exchange (ONNX) format <https://github.com/onnx/onnx>`_.
ReazonSpeech-k2-v2 excels in accuracy, compactness, and inference speed,
and can run on-device without GPU.

We published the ReazonSpeech v2.1 model under the Apache 2.0 license. The
model files and the inference code are readily available on Hugging Face
and GitHub.

**Hugging Face**

https://huggingface.co/reazon-research/reazonspeech-k2-v2

**GitHub**

https://github.com/reazon-research/ReazonSpeech

What is ReazonSpeech v2.1?
==========================

ReazonSpeech v2.1 represents the latest iteration of Reazon Human Interaction
Lab's ASR research. This release introduces a new Japanese ASR model that:

* Outperforms existing Japanese ASR models on JSUT-BASIC5000 [#jsut-basic5000]_,
  Common Voice v8.0 [#cv]_, and TEDxJP-10K [#tedx]_ benchmark sets (see the
  chart below).

* Excels in compactness, only having 159M parameters.

* Excels in inference speed, one of the fastest models to process short audio inputs.

What enables such outstanding performance is the state-of-the-art Transformer
called Zipformer [#zipformer]_. We trained this novel network architecture on
35,000 hours of `Reazonspeech v2.0 corpus
<https://huggingface.co/datasets/reazon-research/reazonspeech>`_,
which revealed a best-in-class performance.

.. tip::

   For further details about the ReazonSpeech v2.1 model, the full training
   recipe is available on `k2-fsa/icefall <https://github.com/k2-fsa/icefall/tree/master/egs/reazonspeech/ASR>`_.

.. figure:: ../_static/blog/2024-08-01-ReazonSpeech/cer.png

   **Figure: ReazonSpeech v2.1 on common Japanese ASR benchmark tests**

Easy deployment with ONNX
=========================

The ReazonSpeech-k2-v2 model is available in the ONNX format, significantly
enhancing its versatility across a wide range of platforms. Leveraging the ONNX
runtime, which is independent of the PyTorch framework, simplifies the setup
process, facilitating seamless integration across diverse environments. This
adaptability ensures practical application on various devices, including Linux,
macOS, Windows, embedded systems, Android, and iOS.

For more details about the supported platforms, please refer to the
`Sherpa-ONNX's documentation <https://k2-fsa.github.io/sherpa/onnx/index.html>`_.

Reduce memory footprint with quantization
=========================================

We also released a ``int8``-quantized version of the ReazonSpeech v2.1 model.
The quantized model exhibits a significantly smaller footprint, as shown
in the following table.

============ ================ ================
FILE         FILE SIZE (FP32) FILE SIZE (INT8)
============ ================ ================
Encoder      565 MB           148 MB
Decoder       12 MB             3 MB
Joiner        11 MB             3 MB
============ ================ ================

These quantized models are up to 4x smaller than comparable ASR models like
Whisper-Large-v3, enabling their deployment on a wide range of devices with
computational constraints. Notably, when used with a non-quantized decoder,
these quantized models maintain accuracy levels comparable to their
non-quantized counterparts. This enables the deployment of our model even on
devices with very limited computational capacity.

============================== ======= ============ ==========
Model Name                      JSUT   Common Voice TEDxJP-10K
============================== ======= ============ ==========
ReazonSpeech-k2-v2               6.45     7.85        9.09
ReazonSpeech-k2-v2 (int8)        6.63     8.20        9.85
ReazonSpeech-k2-v2 (fp32-int8)   6.46     7.88        9.15
Whisper Large-v3                 7.18     8.18        9.96
ReazonSpeech-NeMo-v2             7.31     8.81       10.42
ReazonSpeech-ESPnet-v2           6.89     8.27        9.28
============================== ======= ============ ==========

Future goals
============

With this release, we have significantly enhanced both the speed and accuracy
of our Japanese ASR models. By making our model open-source on the K2
Sherpa-ONNX platform, we have greatly improved accessibility for a broad range
of users and developers across various platforms.

Looking ahead, we are committed to further advancing our models by expanding
our dataset, developing streaming ASR capabilities, and incorporating
multilingual data to create an exceptional bilingual English-Japanese ASR
model.

This release represents a major milestone, and we are excited to continue
pushing the boundaries of Japanese speech processing technology in the future.
Currently, ReazonSpeech-k2-v2 can process longer segments of audio with the
help of voice activity detection (VAD). In the future, we plan to release a
streaming version of this model which can innately support real-time
transcription.

Footnotes
=========

.. [#jsut-basic5000] Ryosuke Sonobe, Shinnosuke Takamichi and Hiroshi Saruwatari,  "JSUT corpus: free large-scale Japanese speech corpus for end-to-end speech synthesis," arXiv preprint, 1711.00354, 2017.
.. [#cv] https://commonvoice.mozilla.org/
.. [#tedx] https://github.com/laboroai/TEDxJP-10K
.. [#zipformer] https://arxiv.org/abs/2310.11230
