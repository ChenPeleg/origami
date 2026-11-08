# Step 1: Create the PRD

Part of the [Origami App Plan](./origami-app-plan.md) (Step 1 — Specify). This plan covers only producing the Product Requirements Document (PRD). It does not authorize design, implementation, or deployment.

## Goal

Produce an approved PRD with testable acceptance criteria that later steps (design, task breakdown, tests, review) can rely on.

## Owner and participants

- **Spec Agent:** drafts the PRD.
- **Orchestrator:** runs intake, tracks open questions, and checks handoff readiness.
- **Product owner (human):** answers blocking questions and approves the PRD.

## Inputs

- Requested outcome and first-release scope (to be confirmed by the product owner).
- Existing app behavior as context only: activity form create, edit, list, and status display.
- `README.md` and current code, read for context. They are not a complete specification.

## Sub-steps

1. **Intake (Orchestrator):** record the requested outcome, affected users, constraints, decision owner, and explicit assumptions.
2. **Context review (Spec Agent):** summarize what the app does today and note gaps; no requirements are invented here.
3. **Questions (Spec Agent → product owner):** collect blocking questions (users and roles, status transitions, required fields, privacy, out-of-scope). Resolve them before drafting the affected sections.
4. **Draft PRD (Spec Agent):** use the structure below.
5. **Acceptance criteria (Spec Agent):** write each criterion so it can be verified by a test or a manual check, with a stable ID (e.g. `AC-1`).
6. **Readiness check (Orchestrator):** confirm the PRD is complete, consistent, and free of unresolved blocking questions.
7. **Approval (product owner):** approve, or return with changes. Record the decision and date.

## PRD structure

- Problem and goals; success measures
- Users and roles
- In scope / out of scope
- User stories
- Workflows and status transitions
- Form fields and validation rules
- Accessibility, localization, and privacy requirements
- Acceptance criteria (with IDs)
- Assumptions, risks, and open questions

## Deliverable

`docs/prd.md` (or an agreed location), containing the structure above, with acceptance criteria IDs.

## Done when

- Scope is confirmed and the PRD is approved by the product owner.
- Every user story maps to at least one acceptance criterion.
- No blocking open questions remain; non-blocking ones are listed with owners.
- No credentials, personal data, or production data appear in the PRD.

## Handoff

The Orchestrator passes the approved PRD to Step 2 (Design) and records any decisions made.
