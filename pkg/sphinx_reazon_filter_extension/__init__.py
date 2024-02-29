from sphinx.application import Sphinx
import re

append_head_tags = {}

def setup(app: Sphinx):
  app.connect("source-read", parse_markdown_additional_head)
  app.connect("html-page-context", append_headtags)

def parse_markdown_additional_head(app, doc, src):
  global append_head_tags

  rematch_headtags = re.findall(r'\[//\]: # \(sphinx-build::html::head \[(<.+>)\]\)', src[0])
  if rematch_headtags:
    append_head_tags[doc] = rematch_headtags

def append_headtags(app, doc, tpl, ctx, dtree):
  global append_head_tags
  if doc in append_head_tags:
      additional_head_tags = "\n".join(append_head_tags[doc])
      if 'metatags' in ctx:
        ctx['metatags'] += additional_head_tags
      else:
        ctx['metatags'] = additional_head_tags
