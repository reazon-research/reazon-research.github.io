__version__ = ""

import os
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, Iterator, Optional
from sphinx.builders.html import StandaloneHTMLBuilder
from sphinx.environment.adapters.toctree import TocTree

import sphinx.application

from .navigation import get_navigation_tree


def has_not_enough_items_to_show_toc(
    builder: StandaloneHTMLBuilder, docname: str
) -> bool:
    """Check if the toc has one or fewer items."""
    assert builder.env

    toctree = TocTree(builder.env).get_toc_for(docname, builder)
    try:
        self_toctree = toctree[0][1]
    except IndexError:
        val = True
    else:
        # There's only the page's own toctree in there.
        val = len(self_toctree) == 1 and self_toctree[0].tagname == "toctree"
    return val


def _compute_navigation_tree(context: Dict[str, Any]) -> str:
    # The navigation tree, generated from the sphinx-provided ToC tree.
    if "toctree" in context:
        toctree = context["toctree"]
        toctree_html = toctree(
            collapse=False,
            titles_only=True,
            maxdepth=-1,
            includehidden=True,
        )
    else:
        toctree_html = ""

    return get_navigation_tree(toctree_html)


def _compute_hide_toc(
    context: Dict[str, Any],
    *,
    builder: StandaloneHTMLBuilder,
    docname: str,
) -> bool:
    # Should the table of contents be hidden?
    file_meta = context.get("meta", None) or {}
    if "hide-toc" in file_meta:
        return True
    elif "toc" not in context:
        return True
    elif not context["toc"]:
        return True

    return has_not_enough_items_to_show_toc(builder, docname)


def _html_page_context(
    app: sphinx.application.Sphinx,
    pagename: str,
    templatename: str,
    context: Dict[str, Any],
    doctree: Any,
) -> None:
    context["navigation_tree"] = _compute_navigation_tree(context)
    context["hide_toc"] = _compute_hide_toc(
        context, builder=app.builder, docname=pagename
    )

    parents = context.get("parents", None) or []
    if len(parents) > 0:
        context["parent"] = parents[-1]
    else:
        context["parent"] = None


def setup(app: sphinx.application.Sphinx) -> Dict[str, Any]:
    app.require_sphinx("3.0")

    app.add_html_theme(
        'reason_theme', os.path.abspath(os.path.dirname(__file__)))

    app.connect("html-page-context", _html_page_context)

    return {
        "parallel_read_safe": True,
        "parallel_write_safe": True,
        "version": __version__,
    }
