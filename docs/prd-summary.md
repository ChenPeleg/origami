# PRD closing summary (2026-11-08)

## Produced
- `docs/prd.md`: 13 sections (goals, users, scope, phasing, stories US-1..11, workflow, UX/i18n/a11y/privacy/SVG, technical constraints, AC-1..AC-49 with traceability, risks, assumptions A-1..A-29, open questions, approval).
- `docs/open-questions.md`: intake N1-N7, question log Q-1..Q-8.
- Review status: `prd-reviewer` verdict **not ready**. Approval is **pending**. `prd-designer` was not run, because blocking questions remain.

## Dilemmas and tradeoffs
- **Assumption numbering:** the four drafting agents each numbered assumptions separately. I consolidated them into A-1..A-29. This gave up the agents' original IDs.
- **Default language:** I chose browser language with an English fallback (A-7). N4 says "user's choice", so this stays open as Q-2.
- **Capacitor:** the scope agent treated it as a later phase and the tech agent as uncommitted. I set it as later than v1, with a constraint that v1 must not block it (TC-4).
- **Arabic:** the existing code has it, the notes say only Hebrew and English. I dropped it (A-10, L-13). The cost is removing working code.
- **RTL:** UI icons mirror, fold diagrams do not (L-10, A-23, R-5).
- **SVG samples:** N6 makes them a gate before approval (S-11, US-11). This may delay approval.
- **Existing app:** the repo is an unrelated activity-approval app. Reuse or restart is open (A-12, Q-5).
- **WCAG, privacy, dark mode:** not in the notes, so they are assumptions (A-25..A-27).
- **Reconstructed ACs:** the acceptance-criteria agent's output was lost during context compaction. I rebuilt section 9 from my own summary rather than re-running the agent. It should be re-checked.
- **Non-blocking review fixes:** I applied only the AC-21 citation fix and the "form fields not applicable" note. The rest are logged in `open-questions.md` and not yet applied, because several depend on the answers below.

## Assumptions beyond the notes
Capacitor after v1, WCAG level, SVG budget, SM1-SM5, privacy stance, dark mode, and dropping Arabic. See A-1..A-29.

## Blocking questions (ask one at a time)
1. **Q-1, v1 content.** A: 3 Beginner guides. B: 3-5 guides across all levels. C: 1 guide plus framework. *Recommend B, with 4 guides (2 Beginner, 1 Intermediate, 1 Advanced).*
2. **Q-2, first-launch language.** A: browser language, English fallback. B: always ask. C: always Hebrew. *Recommend A, with a switcher on every screen.*
3. **Q-3, offline.** A: minimal service worker. B: only the loaded page keeps working, and AC-18 is reworded. C: defer to Capacitor. *Recommend B for v1, C for reopening offline.*
4. **Q-4, step flow.** A: Jump makes the target Current and leaves other marks alone. Back from Completed returns to the last step. Reopening shows the overview with Restart. B: Jump also marks earlier steps Done. *Recommend A.*
5. **Q-5, reuse or restart.** A: reuse the repo and strip API, auth and activity code. B: clean project. *Recommend A, with AC-22 as the guard.*
6. **Q-6, figures.** A: confirm WCAG level, 20 KB per SVG and SM1-SM5 as proposed. B: the owner changes them. *Recommend A.*
7. **Q-7, sample SVGs.** A: the owner reviews 2 samples before approval. B: approve first. *Recommend A.*

## Next step
Once Q-1..Q-7 are answered: update the affected sections, apply the logged non-blocking fixes, re-run `prd-reviewer`, run `prd-designer`, record the approval and date, then hand off to Step 2 (Design).
