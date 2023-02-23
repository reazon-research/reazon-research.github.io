__version__ = ""

import os
from functools import lru_cache
from pathlib import Path
from typing import Any, Dict, Iterator, Optional

import sphinx.application

from .navigation import get_navigation_tree


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


def _html_page_context(
    app: sphinx.application.Sphinx,
    pagename: str,
    templatename: str,
    context: Dict[str, Any],
    doctree: Any,
) -> None:
    context["navigation_tree"] = _compute_navigation_tree(context)


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
