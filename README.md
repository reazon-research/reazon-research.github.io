# reazon-research.github.io

## クイックスタート

最初に、依存ライブラリをpipでインストールします。

```console
$ pip install -r requirements.txt
```

Webサイトを`make`でビルドします。

```console
$ make html
```

build配下にHTMLファイルが生成されれば成功です！

```console
$ firefox build/html/index.html
```

記事はMarkdownまたはreStructuredTextで書くことができます。

* [MyST "Core Syntax"](https://myst-parser.readthedocs.io/en/latest/syntax/syntax.html)
* [Sphinx "reStructuredText Primer"](https://www.sphinx-doc.org/en/master/usage/restructuredtext/basics.html)
