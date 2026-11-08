# Open Questions

Source: `spec/prd-notes.txt` (notes N1-N7, in order of appearance).

## Intake: outcomes, constraints, assumptions

**Outcomes**
- N1: Pure front-end origami app, possibly packaged later via Capacitor.
- N2: Basic origami guides with pictures; 3D emulation later.
- N3: Steps progress from very simple to modern/complex.
- N4: Hebrew and English, user's choice.
- N5: Clean, simple, nice, modern graphics.
- N6: Clear images as SVGs (not Figma) before spec approval; mobile-first, desktop-compatible.
- N7: User can keep progress; v1 fully front end; server save later.

**Constraints:** no backend in v1; local persistence only; SVG illustrations; RTL support.

**Assumptions (to be listed in PRD):** tracked by the PRD, see section "Assumptions".

## Questions log

| ID | Question | Blocking | Owner | Status |
|---|---|---|---|---|
| Q-1 | How many guides and difficulty levels in v1? A: 3 Beginner only. B: 3-5 across all levels. C: 1 guide plus framework. Recommend B with 4 (2 Beginner, 1 Intermediate, 1 Advanced). | Yes | Product owner | Resolved 2026-11-08 - owner chose B: 4 guides (2 Beginner, 1 Intermediate, 1 Advanced) (matched recommendation) |
| Q-2 | First-launch language? A: browser language, fallback English. B: always ask. C: always Hebrew. Recommend A with a switcher on every screen. | Yes | Product owner | Resolved 2026-11-08 - owner chose A: browser language, English fallback, switcher on every screen (matched recommendation) |
| Q-3 | Offline behaviour (AC-18 vs A-11)? A: minimal service worker. B: loaded page keeps working, reword AC-18. C: defer to Capacitor. Recommend B for v1, C for reopening offline. | Yes | Product owner | Resolved 2026-11-08 - owner chose B: only the already-loaded page works offline; AC-18 reworded; offline reopening deferred to Capacitor (matched recommendation) |
| Q-4 | Step flow? A: Jump makes target Current, leaves other marks; Back from Completed returns to last step; reopening Completed shows overview with Restart. B: Jump also marks earlier steps Done. Recommend A. | Yes | Product owner | Resolved 2026-11-08 - owner chose A: Jump makes target Current, other marks untouched; Back from Completed returns to last step; reopening a completed guide shows overview with Restart (matched recommendation) |
| Q-5 | Reuse the existing repo (strip API, auth, activity code) or start clean? Recommend reuse, with AC-22 as guard. | Yes | Product owner | Resolved 2026-11-08 - owner chose A: reuse repo, strip API/auth/activity code, AC-22 guard (matched recommendation) |
| Q-6 | Confirm WCAG level (A-25), 20 KB per SVG, and SM1-SM5? Recommend confirm as proposed. | Yes | Product owner | Resolved 2026-11-08 - owner chose A: confirmed WCAG 2.2 AA, 20 KB per SVG, SM1-SM5 (matched recommendation) |
| Q-7 | Review 2 sample SVGs before PRD approval (N6, S-11, AC-48)? Recommend yes. | Yes | Product owner | Resolved 2026-11-08 - owner chose A: owner reviews 2 sample SVGs before approval (matched recommendation) |
| Q-8 | Remaining non-blocking: browser version list (AC-36), restart/clear-progress confirmation (AC-16), Jump from Not started/Completed and Start-without-Next persistence (6.4), "browser language = he/en only" assumption, server-save intent, export/import, progress granularity. | No | Product owner | Open |

## Non-blocking review findings (2026-11-08 status)
Applied: AC section rewritten (AC-1..AC-52), AC-49/S-10 non-v1, P-4..P-6 citations, A-2, A-17, A-25 updated.
Still open (non-blocking, for next round): Jump from Not started/Completed and Start-without-Next persistence (6.4); definition of the clear-progress confirmation (AC-16, with Q-8); AC-1/AC-3 ordering overlap; AC-29 citation; A-9/A-17 residual overlap; remaining citation tidy-ups in sections 7, 8, 11; "browser language = he/en only" assumption needs owner confirmation.

