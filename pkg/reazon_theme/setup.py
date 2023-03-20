from setuptools import setup

setup(
    name="reazon_theme",
    version="0.0.1",
    url="",
    license="",
    author="",
    description="",
    long_description="",
    long_description_content_type="text/markdown",
    packages=["theme"],
    package_data={
        "reazon_theme": [
            "theme.conf",
            "*.html",
            "components/*.html",
            "static/*.css",
            "static/*.js",
        ]
    },
    entry_points={"sphinx.html_themes": ["reazon_theme = theme"]},
    install_requires=["sphinx>=4.0.1"],
    classifiers=[
        "Framework :: Sphinx",
        "Framework :: Sphinx :: Theme",
        "Development Status :: 4 - Beta",
        "License :: OSI Approved :: MIT License",
        "Environment :: Console",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.6",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Operating System :: OS Independent",
        "Topic :: Documentation",
        "Topic :: Software Development :: Documentation",
    ],
    keywords="sphinx doc theme vue.js",
    project_urls={
        "Documentation": "",
        "Source": "",
        "Tracker": "",
    },
)
