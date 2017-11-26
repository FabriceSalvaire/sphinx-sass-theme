.. _readthedocs.org: http://www.readthedocs.org
.. _bower: http://www.bower.io
.. _sphinx: http://www.sphinx-doc.org
.. _compass: http://www.compass-style.org
.. _sass: http://www.sass-lang.com
.. _grunt: http://www.gruntjs.com
.. _node: http://www.nodejs.com
.. _demo: http://docs.readthedocs.org
.. _hidden: http://sphinx-doc.org/markup/toctree.html

*****************
Sphinx SASS Theme
*****************

.. contents::

.. View a working demo_ over on readthedocs.org_.

This is a Sphinx SASS theme derived from the readthedocs.org_ theme written by X and Y. As opposite
to the RTD theme, it isn't based on top of another SASS package (Wyrm), which make the source
simpler and clearer.  It just rely on a SASS version of Normalize to reset browser default CSS.

This theme is designed for documentations and to be read on a confortable device, a desktop monitor
or a tablet.

Design
======

A documenation must provide a clear message to the reader whitout any fancy typographical
decorations.  Usually a black font on a white page using appropriate font sizes and spacings.

Installation
============

Via package
-----------

Download the package or add it to your ``requirements.txt`` file:

.. code:: bash

    $ pip install sphinx_sass_theme

In your ``conf.py`` file:

.. code:: python

    import sphinx_sass_theme

    html_theme = "sphinx_sass_theme"
    html_theme_path = [sphinx_sass_theme.get_html_theme_path()]

Via git or download
-------------------

Symlink or subtree the ``sphinx_sass_theme/sphinx_sass_theme`` repository into your documentation at
``docs/_themes/sphinx_sass_theme`` then add the following two settings to your Sphinx conf.py file:

.. code:: python

    html_theme = "sphinx_sass_theme"
    html_theme_path = ["_themes", ]

Changelog
=========

How the Table of Contents builds
================================

Currently the left menu will build based upon any ``toctree(s)`` defined in your index.rst file.  It
outputs 2 levels of depth, which should give your visitors a high level of access to your docs. If
no toctrees are set the theme reverts to sphinx's usual local toctree.

It's important to note that if you don't follow the same styling for your rST headers across your
documents, the toctree will misbuild, and the resulting menu might not show the correct depth when
it renders.

Also note that the table of contents is set with ``includehidden=true``. This allows you to set a
hidden toc in your index file with the hidden_ property that will allow you to build a toc without
it rendering in your index.

By default, the navigation will "stick" to the screen as you scroll. However if your toc is
vertically too large, it revert to static positioning. To disable the sticky nav alltogether change
the setting in ``conf.py``.

Set up your environment
-----------------------

1. Install sphinx_ into a virtual environment.

.. code::

    pip install sphinx

2. Install sass

.. code::

    gem install sass

2. Install node, bower and grunt.

.. code::

    // Install node
    brew install node

    // Install bower and grunt
    npm install -g bower grunt-cli

    // Now that everything is installed, let's install the theme dependecies.
    npm install

Now that our environment is set up, make sure you're in your virtual environment, go to this
repository in your terminal and run grunt:

.. code::

    grunt

This default task will do the following:

1. It'll install and update any bower dependencies.
2. It'll run sphinx and build new docs.
3. It'll watch for changes to the sass files and build css from the changes.
4. It'll rebuild the sphinx docs anytime it notices a change to .rst, .html, .js or .css files.

..

    Before you send a Pull Request
    ------------------------------

    When you're done with your edits, you can run ``grunt build`` to clean out the old files and rebuild
    a new distribution, compressing the css and cleaning out extraneous files. Please do this before you
    send in a PR.
