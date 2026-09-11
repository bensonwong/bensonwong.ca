# bensonwong.ca

Static portfolio for [bensonwong.ca](https://bensonwong.ca/). No framework or third-party runtime requests. The font, product films, and static posters are served locally.

## Preview

From this directory:

~~~bash
bun run dev
~~~

Open http://127.0.0.1:4178/.

The preview binds to loopback and serves only public site files. Private working
documents, scratch files, and Git metadata are blocked. Do not use a generic
server that exposes the entire checkout when it contains private documents.

## Validation

~~~bash
bun run validate
~~~

Checks local links and files, document headings and IDs, structured data,
browser JavaScript, ignored working artifacts, and whitespace. For visual
changes, also check desktop and mobile layout, keyboard navigation, reduced
motion, media failure, and playback controls in a browser.

## Structure

- `index.html`: page content and metadata.
- `styles.css`: responsive styling with a locally hosted Inter font.
- `portfolio.js`: visible-only video loading and playback, motion controls, and mobile career placement.
- `assets/work/`: product demonstrations and posters, with attribution in its README.
- `assets/fonts/`: Inter Latin subset and its SIL Open Font License.
- `og-image.png`: social preview image.
- `404.html`, `robots.txt`, `sitemap.xml`, and `CNAME`: GitHub Pages support.
- `scripts/`: local preview and validation.

Videos start from posters, load when visible, and pause offscreen or when the
tab is hidden. Reduced motion and Save-Data default to still images. Visitors
can pause all motion or open a full-size film with native playback controls.
Descriptions, posters, and playback links also work without JavaScript.

## Publishing

GitHub Pages serves the repository root from gh-pages. Preview and review changes on a branch before merging into gh-pages.

`scratch/` and `screenshots/` are private working directories, ignored by Git.
Keep resumes and source documents there. Never copy them into published assets.
