======================================================================
(2024-08-01) ReazonSpeech v2.1: Setting a New Standard in Japanese ASR
======================================================================

Today, we're excited to announce ReazonSpeech v2.1, which sets new
records in Japanese ASR benchmark tests. The new model is built on
`Next-gen Kaldi framework <https://k2-fsa.org/>`_, and distributed in
platform-neutral `Open Neural Network Exchange (ONNX) format <https://github.com/onnx/onnx>`_,
and support quantization for very low memory footprint.

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

.. rubric:: Figure: ReazonSpeech v2.1 on common Japanese ASR benchmark tests

.. figure:: ../_static/blog/2024-08-01-ReazonSpeech/cer.png

Easy deployment with ONNX
=========================

As already mentioned, the ReazonSpeech v2.1 model is available in ONNX format.

Since ONNX runtime covers the very wide range of platforms and does not
depend on PyTorch runtime, this significantly reduces the setup process,
making it practical to use in various devices, including Linux, macOS, Windows,
embedded systems, Android, and iOS.

For more details about the supported platforms, please refer to the
`Sherpa-ONNX's documentation <https://k2-fsa.github.io/sherpa/onnx/index.html>`_.

Reduce memory footprint with quantization
=========================================

We also released ``int8``-quantized version of the ReazonSpeech v2.1 model.
The quantized model exhibits a significantly smaller footprint, as shown
in the following table.

============ ================ ================
FILE         FILE SIZE (FP32) FILE SIZE (INT8)
============ ================ ================
Encoder      565 MB           148 MB
Decoder       12 MB             3 MB
Joiner        11 MB             3 MB
============ ================ ================

This should enable to deploy our model even on devices with very limited
computational capacity.

Conclusion
==========

We believe this release marks a significantly milestone in Japanese ASR,
enabling anyone to deploy our best-in-class ASR model to a very wide
range of platforms.

We are looking forward to receiving feedbacks from users who makes use
of our latest research results.

Footnotes
=========

.. [#jsut-basic5000] Ryosuke Sonobe, Shinnosuke Takamichi and Hiroshi Saruwatari,  "JSUT corpus: free large-scale Japanese speech corpus for end-to-end speech synthesis," arXiv preprint, 1711.00354, 2017.
.. [#cv] https://commonvoice.mozilla.org/
.. [#tedx] https://github.com/laboroai/TEDxJP-10K
.. [#zipformer] https://arxiv.org/abs/2310.11230
