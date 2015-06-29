# -*- coding: utf-8 -*-

from setuptools import setup
from sphinx_sass_theme import __version__

setup(
    name='sphinx-sass-theme',
    version=__version__,
    url='https://github.com/FabriceSalvairesnide/sphinx-sass-theme/',
    license='MIT',
    author='Fabrice Salvaire',
    author_email='fabrice.salvaire@orange.fr',
    description='SASS theme for Sphinx',
    long_description=open('README.rst').read(),
    zip_safe=False,
    packages=['sphinx_sass_theme'],
    package_data={'sphinx_sass_theme': [
        'theme.conf',
        '*.html',
        'static/css/*.css',
        'static/js/*.js',
        'static/font/*.*'
    ]},
    include_package_data=True,
    install_requires=open('requirements.txt').read().splitlines(),
    classifiers=[
        'Development Status :: 3 - Alpha',
        'License :: OSI Approved :: BSD License',
        'Environment :: Console',
        'Environment :: Web Environment',
        'Intended Audience :: Developers',
        'Programming Language :: Python :: 2.7',
        'Programming Language :: Python :: 3',
        'Operating System :: OS Independent',
        'Topic :: Documentation',
        'Topic :: Software Development :: Documentation',
    ],
)
