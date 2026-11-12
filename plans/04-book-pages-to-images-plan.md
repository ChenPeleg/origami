# Plan: split the origami books into named page images

Status: **done.** All 13 books (1,820 pages, 3.0 GB) are in `content/pages/`; `check` reports every folder complete and the originals unchanged. See section 10 for what differs from this plan.

## 1. Goal and scope

Take every PDF in `content/original/`, render each page to an image, work out what is on the page, and give the image a name that says so, for example `001-swan-lv-01-pg-01.png`. Each book gets its own folder.

Hard rule: **`content/original/` is read-only.** Nothing is written, renamed, moved or deleted there. PDFs are opened for reading only, and all output goes to a new folder.

Not in scope: using the images in the app, cropping single diagrams out of a page, translating text.

## 2. What is in `content/original/`

13 PDFs, 403 MB, about 1,820 pages.

| Book | Pages | Text layer | Notes |
|---|---:|---|---|
| Easy Origami for Everyone | 50 | yes | 20 projects |
| Fantastic Origami Flying Creatures | 122 | yes | 24 models |
| Origami Animal Boxes Kit | 64 | yes | |
| Origami Bugs | 328 | no (scan) | has a 330-entry outline, probably one entry per page |
| Origami City | 147 | no (scan) | very large pages (3169 x 2993 pt) |
| Origami Design Secrets | 591 | yes | mostly theory; 19 outline entries (chapters) |
| Origami Dragons | 50 | yes | |
| Encyclopedia of Origami and Papercraft Techniques (1995) | 258 | no (scan) | 258-entry outline |
| The Origami Bible | 194 | no (scan) | 195-entry outline |
| אוריגמי לפיסטוק (1)–(4) | 2, 4, 4, 6 | no (scan) | Hebrew, landscape pages |

"Text layer" = most pages return text from PyMuPDF. The scanned books need image-based identification (section 5.2).

## 3. Output layout

```
content/
  original/                     <- untouched
  pages/
    easy-origami-for-everyone/
      manifest.json
      001-cover.png
      004-contents.png
      012-swan-lv-01-pg-01.png
      013-swan-lv-01-pg-02.png
      ...
    origami-bugs/
    ...
    pistuk-01/
```

- `content/` is already in `.gitignore`, so no images go into git.
- Book folder names are short ASCII slugs, fixed in a table in the script (section 6), not derived automatically. The four Hebrew booklets become `pistuk-01` … `pistuk-04`.

## 4. File naming

Pattern: `{page}-{subject}-lv-{level}-pg-{part}.png`

| Part | Meaning | Example |
|---|---|---|
| `page` | Page number in the PDF, 3 digits, zero padded. Keeps files in book order and makes every name unique. | `012` |
| `subject` | Kebab-case English slug of the model or topic on the page. | `swan`, `flapping-bird` |
| `lv-NN` | Difficulty level as printed in the book (stars, "easy/intermediate", 1–3 …), mapped to `01`, `02`, `03`. `00` when the book gives no level. | `lv-01` |
| `pg-NN` | Which page of that model's instructions this is (1st, 2nd, …). | `pg-02` |

Pages that are not a model use a short label and drop `lv` and `pg`:

`001-cover`, `002-title`, `004-contents`, `006-intro`, `008-symbols`, `009-base-folds`, `120-index`, `121-blank`, `122-back-cover`.

Rules:
- Lowercase ASCII, `a-z 0-9 -` only. Hebrew titles are translated to English for the slug (the Hebrew title is kept in the manifest).
- A page that shows the end of one model and the start of the next is named after the model that starts on it; the manifest records both.
- Theory chapters (mostly *Origami Design Secrets*) use the chapter slug: `143-ch05-circle-packing-pg-03`.
- Extension `.png` (lossless, diagrams have flat colors and thin lines). If the total size is too large, switch scanned books to `.webp`.

## 5. Pipeline

Three steps per book. Each step writes to `manifest.json`, so a step can be re-run and the result reviewed before renaming.

### 5.1 Render

- Open the PDF read-only with PyMuPDF (`pymupdf` 2.0 is already installed with Pillow).
- Render every page to `content/pages/<book>/_raw/p-NNN.png`.
- Size: scale each page so the long side is 2000 px, rather than a fixed DPI. A fixed DPI would make *Origami City* pages enormous and the Hebrew booklets tiny.
- Write one manifest entry per page: `page`, `rawFile`, `width`, `height`, `hasText`.

### 5.2 Identify

Fill `kind` (`cover`, `contents`, `intro`, `symbols`, `model`, `chapter`, `index`, `blank`, `back-cover`), `subject`, `level`, `part`, `titleOriginal` and `confidence` for each page.

1. **Book map first.** Find the table of contents page(s) of the book and read them. This gives the list of models, their start pages and often their level. Map printed page numbers to PDF page numbers (they differ by the front matter offset). Check the PDF outline too; for the scanned books it may only hold "page N" entries, which are useless, but check.
2. **Text-layer books** (5 books): take the largest-font text on each page (`page.get_text("dict")` gives font sizes) as the heading candidate. Match it against the book map.
3. **Scanned books** (8 books): no OCR engine is installed (`pytesseract` is, but the `tesseract` binary is not). Use Claude vision instead: give an agent a batch of downscaled page images (about 800 px) plus the book map, and ask for the manifest fields as JSON. One agent per book, batches of about 20 pages.
4. **Fill the gaps.** A model's pages run from its start page until the next model starts, so `part` comes from position, not from reading. `level` is copied from the model's first page to all its pages.
5. **Blank pages**: detect by pixel variance, no need to look.

### 5.3 Review and rename

- Write `review.md` per book: a table of page, proposed name and confidence, with low-confidence rows on top.
- Fix wrong rows by editing `manifest.json` by hand.
- The rename step copies `_raw/p-NNN.png` to its final name, then deletes `_raw/` only after all copies succeed. It refuses to run if two pages get the same name.

## 6. Code

- `scripts/books/split_books.py` with sub-commands `render`, `identify-text`, `apply`, plus a `--book <slug>` filter.
- A `BOOKS` table at the top: PDF file name → folder slug → level scale used by that book.
- Run with `python -I scripts/books/split_books.py ...`.
- Scripts live in `scripts/books/`, never inside `content/`.

## 7. Protecting the originals

- Before the first run, save a SHA-256 of every file in `content/original/` to `content/pages/_originals.sha256`.
- After every run, re-hash and compare. Any difference stops the work.
- The script builds output paths only under `content/pages/` and asserts this before each write.

## 8. Order of work

1. [x] Write the script skeleton, the `BOOKS` table and the hash check.
2. [x] Pilot on *Easy Origami for Everyone* (50 pages, text layer, 20 projects): render, identify, review, rename. The naming was not agreed before going further; the open questions in section 9 were answered with this plan's defaults.
3. [x] Pilot one scanned book (*pistuk-04*, 6 pages, Hebrew) to test the vision path.
4. [x] Run the remaining text-layer books: Flying Creatures, Animal Boxes, Dragons, Design Secrets.
5. [x] Run the remaining scanned books: Origami Bugs, Origami City, Encyclopedia, Origami Bible, pistuk-01..03.
6. [x] Final hash check of `content/original/`, page count check (images per folder = PDF page count).

## 9. Open questions

1. **Meaning of `lv`.** This plan reads it as difficulty level. If it means something else (chapter, section, volume), only the identify step changes.
2. **Meaning of the leading number.** This plan uses the PDF page number. The alternative is a model number (001 = first model in the book), which would make several pages share a prefix.
3. **Image format and size**: PNG at 2000 px long side gives roughly 1–3 GB in total. Is that fine, or should it be WebP / smaller?
4. **Two-page spreads** in the scans: keep as one image, or split into left and right pages?

## 10. What was built, and where it differs from this plan

- **Book maps.** Each book has `scripts/books/maps/<slug>.json`, listing the first page of every model, chapter and front/back-matter page. `identify` fills the pages in between by position. To fix a name, edit the map and re-run `identify` then `apply` (this needs `_raw/`, so run `render` for that book first). The plan said to edit `manifest.json` by hand; the map replaces that because `identify` rewrites the manifest.
- **Sub-commands** are `render`, `identify` (alias `identify-text`), `apply` and `check`.
- **Heading detection** is only used for *Easy Origami for Everyone*. The other text-layer books were mapped from their contents pages, which was more reliable than font sizes.
- **Scanned books** were identified by looking at contact sheets in the main session, not by one agent per book.
- **Levels.** Only three books print a level: Flying Creatures (half stars, so `lv-02` to `lv-10`), the Origami Bible (1-5 kites) and the Encyclopedia (1-5 stars). All other models are `lv-00`. The printed rating is kept as `levelOriginal` in the manifest.
- **Extra page kinds** beyond the list in 5.2: `title`, `half-title`, `copyright`, `credits`, `divider`, `photo`, `gallery`, `flap`, `endpaper`, `frontispiece`, `technique` and `paper`.
- **The four Hebrew booklets are not instructions.** They are scans of printed folding paper (two sides per sheet), named like `001-penguin-paper-side-1.png`. The animal names are read from the artwork.
- **Blank detection by pixels found nothing**; blank pages were marked in the maps instead.
- **Open questions 1-4** were answered with the defaults: `lv` = difficulty, leading number = PDF page, PNG at 2000 px, pages kept as scanned (no spread splitting).
