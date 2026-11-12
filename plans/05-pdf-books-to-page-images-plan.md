# Plan: split the origami PDF books into named page images

Status: **planned, not started.**

## 1. Goal and scope

Take every PDF in `content/original/`, render each page to an image, work out what each page shows, and save it under a name that describes it, for example `001-swan-lv-01-pg-01.png`. Each book gets its own folder.

Rules:

- `content/original/` is read only. Nothing in it is moved, renamed, edited or deleted. Every output goes to a new folder.
- `content/` is in `.gitignore`, so the images are not committed. Only the scripts and this plan are.

## 2. What is in `content/original/`

13 PDFs, about 1,820 pages, 403 MB.

| Book | Pages | Text layer | Notes |
|---|---|---|---|
| Easy Origami for Everyone | 50 | yes | 20 projects |
| Fantastic Origami Flying Creatures | 122 | yes | 24 models |
| Origami Animal Boxes Kit | 64 | yes | |
| Origami Bugs | 328 | no (scanned) | outline has 330 entries |
| Origami City | 147 | no (scanned) | very large pages (3169x2993) |
| Origami Design Secrets | 591 | yes | theory book, 19 chapter outline entries |
| Origami Dragons | 50 | yes | |
| The Encyclopedia of Origami and Papercraft Techniques (1995) | 258 | no (scanned) | |
| The Origami Bible | 194 | no (scanned) | |
| אוריגמי לפיסטוק (1)–(4) | 2, 4, 4, 6 | no (scanned) | Hebrew, landscape |

Tools already installed: Python 3.11, PyMuPDF 2.0, Pillow. `pytesseract` is installed but the Tesseract program is not, so local OCR does not work yet.

## 3. Output layout

```
content/
  original/                         untouched
  pages/
    easy-origami-for-everyone/
      _raw/                         step 1 output: p001.png, p002.png, ...
      manifest.csv                  step 2 output: one row per page
      001-cover.png                 step 3 output: final named images
      004-swan-lv-01-pg-01.png
      005-swan-lv-01-pg-02.png
      ...
    origami-bugs/
    ...
```

Folder names are short ASCII slugs of the book title. The Hebrew books become `origami-lefistuk-1` ... `-4`.

## 4. File naming

Pattern: `NNN-<subject>-lv-LL-pg-PP.png`

| Part | Meaning | Example |
|---|---|---|
| `NNN` | Page number in the PDF, 3 digits, so files sort in book order | `004` |
| `<subject>` | Model name, lowercase, hyphens, ASCII | `swan`, `flapping-bird` |
| `lv-LL` | Difficulty level the book gives the model. `lv-00` when the book gives none | `lv-01` |
| `pg-PP` | Page number inside that model's instructions, starting at 01 | `pg-02` |

Pages that are not a model use a short type and skip `lv`/`pg`: `000-cover`, `002-contents`, `003-intro`, `010-symbols`, `011-basic-folds`, `150-index`, `151-blank`. Theory pages in Origami Design Secrets use the chapter: `045-ch03-pg-07`.

If two models share a page, both names go in: `020-frog-lv-02-pg-03+fish-lv-01-pg-01.png`.

## 5. Steps

### Step 1: render pages (script, no judgement)

`scripts/books/render_pages.py`

- Open each PDF read only with PyMuPDF, loop over the pages, render with `page.get_pixmap(dpi=150)`, save as `_raw/pNNN.png`.
- Cap the long side at about 2000 px so Origami City's huge pages do not produce giant files.
- Skip pages whose PNG already exists, so the script can be stopped and rerun.
- Print one line per book: pages rendered, time, folder size.

### Step 2: identify pages (build `manifest.csv`)

One CSV per book with columns: `page, type, subject, level, model_page, final_name, source, confidence`.

Work book by book, easy ones first:

1. **Books with a text layer** (Easy Origami, Flying Creatures, Animal Boxes, Dragons, Design Secrets): `page.get_text()` gives the heading of each page. A model starts where a heading matches a model name from the contents page; following pages belong to it until the next heading. Level comes from the book's difficulty marks when the text has them.
2. **Scanned books** (Bugs, City, Encyclopedia, Bible, Hebrew books): check `get_toc()` first in case the outline has real titles. If it only says "Page N", read the contents page to get the model list and page ranges, then look at the page images (Claude vision on the `_raw` PNGs, a batch of pages at a time) to confirm where each model starts.
3. Mark anything unsure with `confidence=low` instead of guessing.

The manifest is the single source of truth. Fixing a name means editing one CSV row and rerunning step 3.

### Step 3: apply names (script, no judgement)

`scripts/books/apply_names.py`

- For each row, copy `_raw/pNNN.png` to `<final_name>.png` in the book folder.
- Copy, not move, so `_raw/` stays and a rerun after manifest edits is safe. Delete stale named files that are no longer in the manifest.
- Stop with an error if two rows produce the same name or a name has characters Windows does not allow.

### Step 4: check

- Each book folder has as many named images as the PDF has pages.
- No file in `content/original/` changed (compare a size and modified-time list taken before step 1 with one taken after step 3).
- Open a few files per book and check the name matches the page.
- List all `confidence=low` rows so they can be reviewed by hand.

## 6. Order of work

Start small, check the result, then scale up:

1. [ ] Write `render_pages.py` and run it on the four Hebrew books (16 pages total).
2. [ ] Name those 16 pages by hand in their manifests, write `apply_names.py`, run it, confirm the format looks right.
3. [ ] Easy Origami for Everyone (50 pages, has text): first test of automatic naming from text.
4. [ ] Origami Dragons, Animal Boxes Kit, Flying Creatures.
5. [ ] Origami Design Secrets (chapters, not models).
6. [ ] Scanned books: Origami Bible, Encyclopedia, Origami City, Origami Bugs.
7. [ ] Step 4 checks over everything.

If a book is slow or hard to name automatically, fall back to the simple version for that book: render pages with plain names (`001-pg.png`) and leave naming for later. Never block the other books on one hard book.

## 7. Open questions

- **What does `lv` mean?** This plan reads it as the difficulty level the book gives. If it should mean something else (for example the model's number in the book), only the manifest rules change.
- **Image format and size.** PNG at 150 dpi is the default. JPEG would make the folders much smaller if space matters.
- **OCR.** Installing Tesseract (with Hebrew data) would make the scanned books faster to name. Not needed for the first pass.
