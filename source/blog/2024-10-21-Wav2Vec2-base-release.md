# (2024-10-21) 大規模日本語音声による事前学習モデルWav2Vec2を公開

35,000時間の大規模日本語音声コーパスReazonSpeech v2.0を用いて事前学習及びファインチューニングを行なったWav2Vec2 [1]を公開したことをお知らせします。

今回公開したモデルは、以下の2つのWav2Vec2 Baseモデルです。

- [`reazon-research/japanese-wav2vec2-base`](https://huggingface.co/reazon-research/japanese-wav2vec2-base)
   - ReazonSpeech v2.0を用いて事前学習を行なったモデル
- [`reazon-research/japanese-wav2vec2-base-rs35kh`](https://huggingface.co/reazon-research/japanese-wav2vec2-base-rs35kh)
   - `reazon-research/japanese-wav2vec2-base`をReazonSpeech v2.0を用いてCTCファインチューニングを行なったモデル

本記事では、他のWav2Vec2ファミリーモデルも併せたベンチマーク結果と、Wav2Vec2モデルをTransformersライブラリ基盤の上で事前学習を行うための方法についてお話しします。

## ベンチマーク結果

ここでは、CTCファインチューニングを行なった`reazon-research/japanese-wav2vec2-base-rs35kh`とその他Wav2Vec2ファミリーのCTCモデルを用いて、日本語音声の書き起こし性能のベンチマークを行います。  
学習データとして用いていない、JSUT-BASIC5000 [2]、Common Voice [3]、TEDxJP-10K [4]の3つのデータセットを用いて性能を検証します。
評価指標には、CER (Character Error Rate)を用います。

ベンチマークに使用したモデルと学習データは以下の表の通りです。
モデルは全てHugging Face上に公開されています。

| モデル名                                         | 事前学習モデル                           |        学習データ         |
| :----------------------------------------------- | :--------------------------------------- | :-----------------------: |
| `reazon-research/japanese-wav2vec2-base-rs35kh`  | `reazon-research/japanese-wav2vec2-base` |     ReazonSpeech v2.0     |
| `Ivydata/wav2vec2-large-xlsr-53-japanese`        | `facebook/wav2vec2-large-xlsr-53`        |  Common Voice, JVS, JSUT  |
| `jonatasgrosman/wav2vec2-large-xlsr-53-japanese` | `facebook/wav2vec2-large-xlsr-53`        | Common Voice, CSS10, JSUT |
| `vumichien/wav2vec2-large-xlsr-japanese`         | `facebook/wav2vec2-large-xlsr-53`        |    Common Voice, JSUT     |

※ XLSR [5]とは、53言語の音声データで事前学習を行なったWav2Vec2です。

![benchmark](./2024-10-21-Wav2Vec2-base-release/bench.png)

上図はベンチマーク結果を示しており、AVERAGEは3つのデータセットでのCERの平均値です。

`reazon-research/japanese-wav2vec2-base-rs35kh`以外のモデルは、JSUTやCommon Voiceを用いて学習しているため、今回使用したテストセットでリークが起きていたり、in-domainデータでの評価になっていたりする可能性があります。  
その中でも、今回公開するモデルのAVERAGEはもっとも良い結果となっており、十分な性能が出ているのではないでしょうか。

![jsut-book](./2024-10-21-Wav2Vec2-base-release/jsut-book.png)

試しに長時間音声が含まれるJSUT-Bookコーパスでベンチマークを行うと、上図のような結果になりました。

長時間音声に対しては、`reazon-research/japanese-wav2vec2-base-rs35kh`はもっとも悪い性能となっており、長時間の音声を一気に処理するには向いていないようです。  
長時間音声に対応するためには、短い音声セグメントに区切ってから処理したり、長時間音声用にファインチューニングするなどの工夫が必要そうです。

## Wav2Vec2をTransformersライブラリ基盤で事前学習するには？

Wav2Vec2をTransformersライブラリ基盤の上で事前学習するには、少しだけコツが必要なため、解説を加えます。

まず、`Transformers.Trainer`を用いて学習するためには、モデルが持つ`forward`メソッドの引数に`labels`、出力に`loss`を持つ必要があります。  
**たとえ、`labels`を与える必要がなくても、必須です。**  
Transformersに用意されているWav2Vec2の事前学習用モデルクラスの`Wav2Vec2ForPreTraining`には、`labels`を引数を取ることができません。  
Wav2Vec2は自己教師あり学習フレームワークに基づいて学習されており、**外部から正解ラベルを与える必要がないため**、このクラスの設計になっているのだと思います。

そのため、以下のように、ダミーとして`labels`を引数に取ることができるモデルクラスでラップすることで、`Transformers.Trainer`を用いて簡単に学習することができます。

```python
from transformers import Wav2Vec2ForPreTraining


class Wav2Vec2ForPreTrainingWrapper(Wav2Vec2ForPreTraining):
    def __init__(self, config):
        super().__init__(config=config)

    def forward(
        self,
        input_values,
        attention_mask=None,
        output_attentions=None,
        output_hidden_states=None,
        return_dict=None,
        mask_time_indices=None,
        sampled_negative_indices=None,
        labels=None,  # labelsをダミーで設定
    ):
        outputs = super().forward(
            input_values=input_values,
            attention_mask=attention_mask,
            output_attentions=output_attentions,
            output_hidden_states=output_hidden_states,
            return_dict=return_dict,
            mask_time_indices=mask_time_indices,
            sampled_negative_indices=sampled_negative_indices,
        )  # もちろんlabelsは使うことはない
        return outputs
```

## おわりに

今回、35,000時間の大規模日本語音声コーパスReazonSpeech v2.0を用いて事前学習およびファインチューニングを行なったWav2Vec2の公開しました。  

Apache 2.0ライセンスにて公開するため、ぜひ学術研究等で広くご活用ください！

また、ファインチューニングデータを揃えたベンチマークなどによる詳細なモデル評価や、別データで継続学習を行なった派生モデルの開発などのフィードバックも、広くお待ちしております！

---

[1] Baevski, A., Zhou, Y., Mohamed, A. and Auli, M., 2020. wav2vec 2.0: A framework for self-supervised learning of speech representations. Advances in neural information processing systems, 33, pp.12449-12460.  
[2] [https://sites.google.com/site/shinnosuketakamichi/publication/jsut](https://sites.google.com/site/shinnosuketakamichi/publication/jsut)  
[3] [https://commonvoice.mozilla.org/](https://commonvoice.mozilla.org/)  
[4] [https://github.com/laboroai/TEDxJP-10K](https://github.com/laboroai/TEDxJP-10K)  
[5] Conneau, A., Baevski, A., Collobert, R., Mohamed, A. and Auli, M., 2020. Unsupervised cross-lingual representation learning for speech recognition. arXiv preprint arXiv:2006.13979.
