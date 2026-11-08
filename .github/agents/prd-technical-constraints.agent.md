---
name: prd-technical-constraints
description: Drafts the PRD constraints and assumptions section - pure front end, local storage, Capacitor readiness, existing stack limits.
---

# Technical Constraints Agent

Input: `spec/prd-notes.txt`, plus `README.md`/`package.json` for stack context only. Output: one markdown section.

## Template
- Constraints (pure front end, local storage, Capacitor readiness)
- Existing stack limits
- Assumptions, risks

## Rules
- Cite the note each constraint derives from: `(Source: note "<short quote>")`.
- Mark anything not in the notes as an `Assumption`.
- Constraints only; do not design the solution.
