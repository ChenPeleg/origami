# Design mockups – Origami Guides App

Status: draft for owner review. PRD approval is **pending and not recorded here**. Open questions Q-8..Q-14 remain open.

PNG naming: `<screen>-<mobile|desktop>-<he|en>.png` (mobile 390px, desktop 1280px; `he` = Hebrew RTL, `en` = English LTR). UI icons mirror in RTL; fold diagrams never mirror. All data is fictional.

## SVG assets

| File | Approx. size | Alt (en) | Alt (he) |
|---|---|---|---|
| `sample-step-fold-in-half.svg` | existing | Square paper with a dashed valley-fold line across the middle and an arrow folding the top half down. | נייר מרובע עם קו קיפול עמק מקווקו באמצע וחץ המקפל את החצי העליון כלפי מטה. |
| `sample-cover-paper-boat.svg` | existing | Finished paper boat floating on water, with a triangular sail and a trapezoid hull. | סירת נייר גמורה צפה על המים, עם מפרש משולש וגוף טרפזי. |
| `sample-cover-tulip.svg` | ~1 KB | A paper tulip with a folded red bloom on a green stem with two leaves. | צבעוני מנייר עם פרח אדום מקופל על גבעול ירוק עם שני עלים. |
| `sample-cover-crane.svg` | ~1 KB | A paper crane with spread wings, a long neck and a pointed beak. | עגור נייר עם כנפיים פרושות, צוואר ארוך ומקור מחודד. |

Tulip and Crane covers are their own simple SVGs (no text, under 20 KB).

## Screens

Each screen has 4 PNGs (desktop/mobile x he/en) unless noted.

| Screen (file prefix) | Shows | Alt (en) | Alt (he) | US | AC |
|---|---|---|---|---|---|
| `navbar` (desktop only, 2 files) | Navbar: brand, Catalog/Search links, language switch | Desktop navigation bar with the app name, catalog and search links and a language switch. | סרגל ניווט בדסקטופ עם שם האפליקציה, קישורים לקטלוג ולחיפוש ומתג שפה. | US-12, 13 | AC-53, 55, 63 |
| `navbar-menu-closed` (mobile, 2 files) | Collapsed mobile bar with menu button | Mobile bar with the app name and a closed menu button. | סרגל נייד עם שם האפליקציה וכפתור תפריט סגור. | US-12 | AC-53, 55 |
| `navbar-menu-open` (mobile, 2 files) | Open mobile menu | Mobile bar with the menu open showing catalog, search and language switch. | סרגל נייד עם תפריט פתוח: קטלוג, חיפוש ומתג שפה. | US-12, 13 | AC-53, 54, 55, 63 |
| `catalog` | Guide card grid with navbar (pieces and minutes) | Catalog of guide cards with cover, level, pieces and time. | קטלוג כרטיסי מדריכים עם תמונה, רמה, חלקים וזמן. | US-1, 3, 4, 6, 7, 8, 9 | AC-1, 4, 7, 52 |
| `catalog-table` | Sortable table (name, level, pieces, time) with `aria-sort` indicator; mobile stacked cards (Q-12 A) | Guides table with sortable column headers; on mobile each guide is a stacked card. | טבלת מדריכים עם כותרות עמודות הניתנות למיון; בנייד כל מדריך הוא כרטיס מוערם. | US-15, 16, 17 | AC-59, 60, 61, 62, 63 |
| `search-empty` | Search page before typing | Search page with an empty field and a prompt to type. | דף חיפוש עם שדה ריק והנחיה להקליד. | US-14 | AC-56, 63 |
| `search-results` | Search with matching guides | Search results listing guides that match the query. | תוצאות חיפוש עם מדריכים התואמים לשאילתה. | US-14 | AC-56, 57 |
| `search-noresults` | No-match state | Search page with a message that no guides were found. | דף חיפוש עם הודעה שלא נמצאו מדריכים. | US-14 | AC-58 |
| `overview` | Guide overview with navbar | Guide overview with cover, pieces, time and start button. | סקירת מדריך עם תמונה, חלקים, זמן וכפתור התחלה. | US-1, 3, 9 | AC-2, 7, 52 |
| `step` | Folding work screen: step image, text, "Step n of N", Back/Next, jump, language switch in navbar | Folding step with diagram, instruction, step counter, back and next buttons and a jump control. | שלב קיפול עם תרשים, הוראה, מונה שלבים, כפתורי הקודם והבא ובקרת קפיצה. | US-2, 5, 6, 7, 9 | AC-30, 35, 52 |
| `completed` | Completion screen with navbar | Completion screen congratulating the user, with return to catalog. | מסך סיום עם ברכה וחזרה לקטלוג. | US-9 | AC-52 |
| `clear-progress` | Confirmation dialog to clear saved progress | Dialog asking to confirm clearing saved progress, with confirm and cancel buttons. | חלון אישור לניקוי ההתקדמות השמורה, עם כפתורי אישור וביטול. | – (P-4) | AC-16 |
| `nav-overview` | Navigation map: catalog/table, search, overview, step, completed, clear-progress, navbar on each | Map of all screens with arrows showing navigation, each with the navbar. | מפת ניווט של כל המסכים עם חצים, ולכל מסך סרגל ניווט. | US-18 | AC-64 |

## Sources and re-rendering

- Single source: `src/mockup.html`, driven by query params: `lang=he|en`, `screen=<name>`, optional `menu=open`, `mobile=1`.
- Rendered with headless Edge screenshots (`--screenshot`); mobile is cropped to 390px.

## Caveats / for the owner to review

- Heebo/Assistant are listed first in the font stack but are not installed on the render machine; PNGs use the Segoe UI fallback.
- `mockup.html` uses simplified inline versions of the Tulip/Crane covers (Fold in Half cover is inline only); standalone SVGs are the reference.
- Mobile PNGs are cropped from an 800px-wide render (headless Edge cannot render below ~500px); mobile catalog and search-empty are tall.
- Q-8..Q-14 are open; approval is not recorded.
