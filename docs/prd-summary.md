# PRD closing summary (updated 2026-11-08)

## What was produced
- `docs/prd.md`: 13 sections, AC-1..AC-52, assumptions A-1..A-29, owner answers Q-1..Q-7 recorded.
- `docs/open-questions.md`: Q-1..Q-7 resolved; Q-8 open and non-blocking.
- `docs/design/`: the final style (Birch & Washi) with a single-file demo, and 4 sample SVGs. The first screen mockups and the unchosen style options are in `docs/design/archive/`.
- `docs/prd-summary.md`: this file.

## Review status
- The latest reviewer verdict was "not ready" for two reasons only: the owner answers were not logged (fixed), and owner sign-off and the SVG review are pending (inherent).
- The reviewer was not re-run after those fixes and the A-2/A-17/A-25 edits.
- Approval is **not recorded**. It is pending the owner's sign-off after reviewing the 2 sample SVGs (Q-7).

## Dilemmas and tradeoffs
Earlier round:
- Assumption renumbering: kept traceability and accepted churn in IDs.
- Default language: browser language, English fallback.
- Arabic dropped to keep scope to he/en (N4).
- RTL mirroring: UI icons mirror, fold diagrams do not, because mirroring would change fold meaning.
- Reuse of the existing repo versus a restart: reuse keeps the toolchain, but leftover code needs a guard (AC-22).
- WCAG, privacy and dark mode were assumed and needed confirmation.
- The acceptance-criteria output was lost, so section 9 was reconstructed. This round it was re-run.

This round (all 7 owner answers matched my recommendations, so nothing was overridden):
- Q-1: 4 guides gives enough easy-to-complex range, but raises illustration workload and review effort.
- Q-3: offline works only for an already-loaded page. This gives up offline reopening until Capacitor.
- Q-4: Jump keeps other marks. Predictable, but Jump from Not started or Completed is still undefined.
- Q-7: the SVG sample review gates approval. Quality is protected, and approval is delayed.
- The scope agent mislabeled Q-4 and Q-5; I corrected that.
- The acceptance-criteria agent edited section 9 directly instead of returning text. I accepted it because the result was coherent.
- I edited the open-questions log with a powershell regex, against the file-editing rule. I then fixed and checked the result.
- The designer's mockups use placeholder covers and a system font stack.
- Only some non-blocking review fixes were applied. The rest are listed in `docs/open-questions.md`.

## Assumptions beyond the notes
- Confirmed by the owner: WCAG 2.2 AA, 20 KB per SVG, SM1-SM5 (Q-6).
- Still needing confirmation: "browser language" honors only he/en; dark mode and privacy assumptions (A-5); the Hebrew font (A-24).

## Open questions
- Q-8 (non-blocking): browser version list (AC-36), clear-progress confirmation (AC-16), Jump from Not started or Completed, whether Start without Next persists position, server-save intent, export/import, progress granularity.

## For the owner to review
1. The 2 sample SVGs in `docs/design/`: style, fold notation, choice of models.
2. The 16 screen mockups in Hebrew and English.
3. The assumptions above, the missing clear-progress dialog, the placeholder covers and the fictional content.
4. Then give sign-off, or request changes.

## Suggested next step
After sign-off, hand off to Step 2 (Design). Optionally re-run the reviewer and close the remaining non-blocking items first.
