# bensonwong.ca

Dependency-free static portfolio for [bensonwong.ca](https://bensonwong.ca/).

## Preview

From this directory:

~~~bash
python3 -m http.server 4178
~~~

Open http://127.0.0.1:4178/.

## Structure

- index.html — semantic page content and metadata
- styles.css — responsive styling; no framework or remote fonts
- og-image.png — social preview image
- 404.html, robots.txt, sitemap.xml — GitHub Pages support files
- CNAME — custom domain binding

## Publishing

GitHub Pages serves the repository root from gh-pages. Preview and review changes on a branch before merging into gh-pages.
