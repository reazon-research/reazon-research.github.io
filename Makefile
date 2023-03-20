# Minimal makefile for Sphinx documentation
#

# You can set these variables from the command line, and also
# from the environment for the first two.
SPHINXOPTS    ?=
SPHINXBUILD   ?= sphinx-build
SOURCEDIR     = source
BUILDDIR      = build

# Put it first so that "make" without argument is like "make help".
help:
	@$(SPHINXBUILD) -M help "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)

docs: html
	rm -rf docs
	mv build/html docs

.PHONY: help Makefile

html_ja:
	@$(SPHINXBUILD) -D language="ja" -b html "$(SOURCEDIR)" "$(BUILDDIR)/html" $(0)

html_en:
	@$(SPHINXBUILD) -D language="en" -b html "$(SOURCEDIR)" "$(BUILDDIR)/html/en" $(0)

# orverride default html target
html: html_ja html_en

# Catch-all target: route all unknown targets to Sphinx using the new
# "make mode" option.  $(O) is meant as a shortcut for $(SPHINXOPTS).
%: Makefile
	@$(SPHINXBUILD) -M $@ "$(SOURCEDIR)" "$(BUILDDIR)" $(SPHINXOPTS) $(O)
