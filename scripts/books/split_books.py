"""Split the origami PDF books into named page images.

See plans/04-book-pages-to-images-plan.md.

    python -I scripts/books/split_books.py render   [--book <slug>]
    python -I scripts/books/split_books.py identify [--book <slug>]
    python -I scripts/books/split_books.py apply    [--book <slug>]
    python -I scripts/books/split_books.py check

content/original/ is read-only: PDFs are only opened for reading, every write
goes through out_path(), which refuses anything outside content/pages/, and
the SHA-256 of every original is verified before and after each command.

Steps
  render    PDF pages -> content/pages/<slug>/_raw/p-NNN.png + manifest.json
  identify  fills kind/subject/level/part/name in the manifest from
            (a) the largest-font heading on each page (text-layer books) and
            (b) the hand/vision-made book map in scripts/books/maps/<slug>.json,
            which always wins. Writes review.md.
  apply     copies _raw/p-NNN.png to the final names, then removes _raw/.
  check     hash check + images per folder == PDF page count.
"""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import sys
from pathlib import Path

import pymupdf
from PIL import Image, ImageStat

ROOT = Path(__file__).resolve().parents[2]
ORIGINAL = ROOT / "content" / "original"
PAGES = ROOT / "content" / "pages"
MAPS = Path(__file__).resolve().parent / "maps"
HASH_FILE = PAGES / "_originals.sha256"

LONG_SIDE = 2000  # px, long side of every rendered page

# PDF file name -> folder slug.
#   heading_size: minimum font size (pt) of a model title in a text-layer book;
#                 None = no text heuristics, the book map supplies everything.
BOOKS = [
    {"slug": "easy-origami-for-everyone", "heading_size": 50,
     "pdf": "Easy Origami for Everyone - Full-Color Instructions for 20 Simple Projects.pdf"},
    {"slug": "fantastic-origami-flying-creatures", "heading_size": None,
     "pdf": "Fantastic Origami Flying Creatures - 24 Amazing Paper Models.pdf"},
    {"slug": "origami-animal-boxes-kit", "heading_size": None,
     "pdf": "Origami Animal Boxes Kit - Cute Paper Models with Secret Compartments!.pdf"},
    {"slug": "origami-bugs", "heading_size": None,
     "pdf": "Origami Bugs.pdf"},
    {"slug": "origami-city", "heading_size": None,
     "pdf": "Origami City - Fold More Than 30 Global Landmarks - Origami Paper Inside.pdf"},
    {"slug": "origami-design-secrets", "heading_size": None,
     "pdf": "Origami design secrets - mathematical methods for an ancient art.pdf"},
    {"slug": "origami-dragons", "heading_size": None,
     "pdf": "Origami Dragons - Magnificent Paper Models That Are Fun to Fold!.pdf"},
    {"slug": "encyclopedia-of-origami-and-papercraft", "heading_size": None,
     "pdf": "The Encyclopedia of Origami and Papercraft Techniques - 1st Edition (1995).pdf"},
    {"slug": "the-origami-bible", "heading_size": None,
     "pdf": "The Origami Bible - The Complete Guide to Paper-Folding Projects and Techniques.pdf"},
    {"slug": "pistuk-01", "heading_size": None, "pdf": "אוריגמי לפיסטוק (1).pdf"},
    {"slug": "pistuk-02", "heading_size": None, "pdf": "אוריגמי לפיסטוק (2).pdf"},
    {"slug": "pistuk-03", "heading_size": None, "pdf": "אוריגמי לפיסטוק (3).pdf"},
    {"slug": "pistuk-04", "heading_size": None, "pdf": "אוריגמי לפיסטוק (4).pdf"},
]

# Page kinds. "model" and "chapter" pages carry a part number (pg-NN).
MULTI_PAGE_KINDS = {"model", "chapter"}


# ---------------------------------------------------------------- safety ----

def out_path(path: Path) -> Path:
    """Return path, refusing anything that is not inside content/pages/."""
    resolved = path.resolve()
    if not resolved.is_relative_to(PAGES.resolve()):
        raise RuntimeError(f"refusing to write outside content/pages/: {resolved}")
    if resolved.is_relative_to(ORIGINAL.resolve()):
        raise RuntimeError(f"refusing to write into content/original/: {resolved}")
    return resolved


def hash_originals() -> dict[str, str]:
    result = {}
    for f in sorted(ORIGINAL.iterdir()):
        if f.is_file():
            h = hashlib.sha256()
            with open(f, "rb") as fh:
                for chunk in iter(lambda: fh.read(1 << 20), b""):
                    h.update(chunk)
            result[f.name] = h.hexdigest()
    return result


def verify_originals(when: str) -> None:
    """Save the hashes on the first run, compare on every later one."""
    current = hash_originals()
    if not HASH_FILE.exists():
        out_path(HASH_FILE).parent.mkdir(parents=True, exist_ok=True)
        lines = [f"{digest}  {name}" for name, digest in current.items()]
        out_path(HASH_FILE).write_text("\n".join(lines) + "\n", encoding="utf-8")
        print(f"[hash] saved {len(current)} original hashes")
        return
    saved = {}
    for line in HASH_FILE.read_text(encoding="utf-8").splitlines():
        if line.strip():
            digest, name = line.split("  ", 1)
            saved[name] = digest
    if saved != current:
        changed = sorted(set(saved) ^ set(current)
                         | {n for n in saved if n in current and saved[n] != current[n]})
        raise SystemExit(f"[hash] content/original/ CHANGED ({when}): {changed}. Stopping.")
    print(f"[hash] originals unchanged ({when}, {len(current)} files)")


# -------------------------------------------------------------- manifest ----

def book_dir(book: dict) -> Path:
    return PAGES / book["slug"]


def load_manifest(book: dict) -> dict:
    path = book_dir(book) / "manifest.json"
    if not path.exists():
        raise SystemExit(f"{book['slug']}: no manifest.json, run `render` first")
    return json.loads(path.read_text(encoding="utf-8"))


def save_manifest(book: dict, manifest: dict) -> None:
    path = out_path(book_dir(book) / "manifest.json")
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")


def slugify(text: str) -> str:
    text = text.lower().replace("&", " and ").replace("'", "").replace("’", "")
    return re.sub(r"[^a-z0-9]+", "-", text).strip("-")


# ---------------------------------------------------------------- render ----

def is_blank(img: Image.Image) -> bool:
    """A page is blank when its downscaled grayscale has almost no variance."""
    small = img.convert("L").resize((200, 200))
    return ImageStat.Stat(small).stddev[0] < 2.0


def cmd_render(book: dict) -> None:
    pdf = ORIGINAL / book["pdf"]
    raw_dir = out_path(book_dir(book) / "_raw")
    raw_dir.mkdir(parents=True, exist_ok=True)
    doc = pymupdf.open(pdf)  # read-only: the document is never saved
    pages = []
    for index, page in enumerate(doc):
        number = index + 1
        scale = LONG_SIDE / max(page.rect.width, page.rect.height)
        pix = page.get_pixmap(matrix=pymupdf.Matrix(scale, scale), alpha=False)
        raw_file = out_path(raw_dir / f"p-{number:03d}.png")
        pix.save(raw_file)
        img = Image.frombytes("RGB", (pix.width, pix.height), pix.samples)
        pages.append({
            "page": number,
            "rawFile": f"_raw/{raw_file.name}",
            "width": pix.width,
            "height": pix.height,
            "hasText": len(page.get_text().strip()) > 20,
            "blank": is_blank(img),
        })
        if number % 25 == 0 or number == len(doc):
            print(f"  {book['slug']}: rendered {number}/{len(doc)}")
    manifest = {
        "book": book["slug"],
        "pdf": book["pdf"],
        "pageCount": len(doc),
        "outline": [[lvl, title, pg] for lvl, title, pg in doc.get_toc()],
        "pages": pages,
    }
    doc.close()
    save_manifest(book, manifest)


# -------------------------------------------------------------- identify ----

def page_heading(page: pymupdf.Page, min_size: float) -> str | None:
    """Text of the big title on a page: all spans close to the largest font
    size, in reading order. None when nothing reaches min_size."""
    spans = []
    for block in page.get_text("dict")["blocks"]:
        for line in block.get("lines", []):
            for span in line["spans"]:
                text = span["text"].strip()
                if text and not text.isdigit():
                    spans.append((span["size"], span["bbox"][1], span["bbox"][0], text))
    if not spans:
        return None
    largest = max(s[0] for s in spans)
    if largest < min_size:
        return None
    title = [s for s in spans if s[0] >= largest * 0.6]
    title.sort(key=lambda s: (round(s[1] / (largest * 0.5)), s[2]))  # rows, then left to right
    return " ".join(s[3] for s in title)


def load_map(book: dict) -> dict:
    """The book map: {"pages": {"12": {"kind": "model", "subject": "swan",
    "level": 1, "titleOriginal": "..."}, ...}}. Only the first page of a
    model/chapter is needed; following pages are filled in by position."""
    path = MAPS / f"{book['slug']}.json"
    if not path.exists():
        return {"pages": {}}
    return json.loads(path.read_text(encoding="utf-8"))


def build_name(entry: dict) -> str:
    prefix = f"{entry['page']:03d}"
    kind = entry["kind"]
    if kind == "model":
        return f"{prefix}-{entry['subject']}-lv-{entry['level']:02d}-pg-{entry['part']:02d}.png"
    if kind == "chapter":
        return f"{prefix}-{entry['subject']}-pg-{entry['part']:02d}.png"
    return f"{prefix}-{entry.get('subject') or kind}.png"


def cmd_identify(book: dict) -> None:
    manifest = load_manifest(book)
    book_map = load_map(book)["pages"]
    doc = pymupdf.open(ORIGINAL / book["pdf"]) if book["heading_size"] else None

    current = None  # the model/chapter the previous page belonged to
    for entry in manifest["pages"]:
        number = entry["page"]
        mapped = book_map.get(str(number))
        found = None  # what this page says about itself

        if mapped:
            found = {"kind": mapped["kind"], "subject": mapped.get("subject"),
                     "level": mapped.get("level", 0),
                     "levelOriginal": mapped.get("levelOriginal"),
                     "titleOriginal": mapped.get("titleOriginal"),
                     "confidence": 1.0, "source": "map"}
            if mapped.get("also"):
                found["also"] = mapped["also"]
        elif entry.get("blank"):
            found = {"kind": "blank", "confidence": 0.9, "source": "pixels"}
        elif doc is not None:
            heading = page_heading(doc[number - 1], book["heading_size"])
            if heading:
                found = {"kind": "model", "subject": slugify(heading), "level": 0,
                         "titleOriginal": heading, "confidence": 0.8, "source": "heading"}

        for key in ("kind", "subject", "level", "levelOriginal", "part", "titleOriginal",
                    "confidence", "source", "also", "name"):
            entry.pop(key, None)

        if found and found["kind"] in MULTI_PAGE_KINDS:
            same = (current and current["kind"] == found["kind"]
                    and current["subject"] == found["subject"])
            if same:
                current["part"] += 1
            else:
                current = {"kind": found["kind"], "subject": found["subject"],
                           "level": found["level"], "titleOriginal": found["titleOriginal"],
                           "levelOriginal": found.get("levelOriginal"), "part": 1}
            entry.update({k: v for k, v in found.items() if v is not None})
            entry["level"] = current["level"]
            entry["part"] = current["part"]
        elif found:
            entry.update({k: v for k, v in found.items() if v is not None})
            current = None
        elif current:  # continuation page: position, not reading
            current["part"] += 1
            entry.update({"kind": current["kind"], "subject": current["subject"],
                          "level": current["level"], "part": current["part"],
                          "titleOriginal": current["titleOriginal"],
                          "confidence": 0.6, "source": "position"})
            if current.get("levelOriginal"):
                entry["levelOriginal"] = current["levelOriginal"]
        else:
            entry.update({"kind": "unknown", "confidence": 0.0, "source": "none"})

        if entry["kind"] != "model":
            entry.pop("level", None)
        entry["name"] = build_name(entry)

    if doc is not None:
        doc.close()
    save_manifest(book, manifest)
    write_review(book, manifest)


def write_review(book: dict, manifest: dict) -> None:
    rows = sorted(manifest["pages"], key=lambda e: (e["confidence"], e["page"]))
    names = [e["name"] for e in manifest["pages"]]
    duplicates = sorted({n for n in names if names.count(n) > 1})
    lines = [f"# Review: {book['slug']}", "",
             f"{manifest['pageCount']} pages. Lowest confidence first. "
             "Fix rows in `scripts/books/maps/" + book["slug"] + ".json` and re-run `identify`.", ""]
    if duplicates:
        lines += [f"**Duplicate names:** {', '.join(duplicates)}", ""]
    lines += ["| Page | Proposed name | Confidence | Source | Title in book |", "|---:|---|---:|---|---|"]
    for e in rows:
        lines.append(f"| {e['page']} | `{e['name']}` | {e['confidence']:.1f} | {e['source']} "
                     f"| {e.get('titleOriginal') or ''} |")
    out_path(book_dir(book) / "review.md").write_text("\n".join(lines) + "\n", encoding="utf-8")
    low = sum(1 for e in rows if e["confidence"] < 0.6)
    print(f"  {book['slug']}: {len(rows)} pages named, {low} low confidence, "
          f"{len(duplicates)} duplicate names -> review.md")


# ----------------------------------------------------------------- apply ----

def cmd_apply(book: dict) -> None:
    manifest = load_manifest(book)
    folder = book_dir(book)
    pages = manifest["pages"]
    if any("name" not in e for e in pages):
        raise SystemExit(f"{book['slug']}: run `identify` first")
    unknown = [e["page"] for e in pages if e["kind"] == "unknown"]
    if unknown:
        raise SystemExit(f"{book['slug']}: pages still unknown: {unknown}")
    names = [e["name"] for e in pages]
    if len(set(names)) != len(names):
        raise SystemExit(f"{book['slug']}: duplicate names, see review.md")
    for e in pages:
        if not re.fullmatch(r"[a-z0-9-]+\.png", e["name"]):
            raise SystemExit(f"{book['slug']}: bad name {e['name']!r}")
        source = folder / e["rawFile"]
        if not source.exists():
            raise SystemExit(f"{book['slug']}: missing {e['rawFile']} (already applied?)")

    for e in pages:
        shutil.copyfile(folder / e["rawFile"], out_path(folder / e["name"]))
    for e in pages:  # every copy must be there and complete before _raw/ goes
        if (folder / e["name"]).stat().st_size != (folder / e["rawFile"]).stat().st_size:
            raise SystemExit(f"{book['slug']}: copy of {e['name']} is incomplete")
    for stale in folder.glob("*.png"):  # names from an earlier apply
        if stale.name not in names:
            out_path(stale).unlink()
    shutil.rmtree(out_path(folder / "_raw"))
    for e in pages:
        e["file"] = e["name"]
        e.pop("rawFile")
    save_manifest(book, manifest)
    print(f"  {book['slug']}: {len(pages)} images named, _raw/ removed")


# ----------------------------------------------------------------- check ----

def cmd_check(books: list[dict]) -> None:
    ok = True
    for book in books:
        folder = book_dir(book)
        doc = pymupdf.open(ORIGINAL / book["pdf"])
        expected = len(doc)
        doc.close()
        images = len(list(folder.glob("*.png"))) if folder.exists() else 0
        raw = len(list((folder / "_raw").glob("*.png"))) if (folder / "_raw").exists() else 0
        state = "ok" if images == expected else ("rendered, not applied" if raw == expected else "MISSING")
        ok = ok and images == expected
        print(f"  {book['slug']:42} pdf {expected:4}  named {images:4}  raw {raw:4}  {state}")
    print("all books complete" if ok else "not complete yet")


# ------------------------------------------------------------------ main ----

def main() -> None:
    sys.stdout.reconfigure(encoding="utf-8")
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("command", choices=["render", "identify", "identify-text", "apply", "check"])
    parser.add_argument("--book", action="append", help="folder slug; repeatable; default all books")
    args = parser.parse_args()

    books = BOOKS
    if args.book:
        known = {b["slug"] for b in BOOKS}
        for slug in args.book:
            if slug not in known:
                raise SystemExit(f"unknown book {slug!r}; known: {sorted(known)}")
        books = [b for b in BOOKS if b["slug"] in args.book]

    verify_originals("before")
    try:
        if args.command == "check":
            cmd_check(books)
        else:
            command = {"render": cmd_render, "identify": cmd_identify,
                       "identify-text": cmd_identify, "apply": cmd_apply}[args.command]
            for book in books:
                command(book)
    finally:
        verify_originals("after")


if __name__ == "__main__":
    main()
