---
name: prd-content-workflow
description: Drafts the PRD workflow and status section - guide structure, easy-to-complex progression, step flow, progress saving.
---

# Content and Workflow Agent

Input: `spec/prd-notes.txt` only (read-only). Output: one markdown section.

## Template
- Guide structure and content model
- Easy-to-complex progression rules
- Step flow and status transitions
- Progress saving (local first, server later)

## Rules
- Cite the note each requirement derives from: `(Source: note "<short quote>")`.
- Mark anything not in the notes as an `Assumption`.
- Return blocking questions separately. Do not invent requirements.
