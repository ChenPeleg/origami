# Step 1b: Orchestrate the PRD with Sub-Agents

Supports [Step 1: Create the PRD](./01-prd-plan.md) of the [Origami App Plan](./00-origami-app-plan.md). This plan covers how an orchestrator agent and sub-agents produce `docs/prd.md`. It does not authorize design or implementation.

## Goal

Build the PRD from the product owner's notes (`spec/prd-notes.txt`) using one orchestrator and several focused sub-agents, with the product owner approving the result.

## Inputs

- `spec/prd-notes.txt`: the product owner's verbatim notes. This is the source of truth and must not be edited by agents.
- `plans/01-prd-plan.md`: PRD structure and "done when" criteria.
- `README.md` and current code, for context only.

## Agents

| Agent | Responsibility | Output |
|---|---|---|
| **Orchestrator** | Intake, open-question tracking, merging, readiness check. Writes no requirements itself. | `docs/prd.md`, open-questions list |
| **Product and scope** | Problem, goals, success measures, users, in/out of scope, user stories, phasing (v1 front-end only; later Capacitor, 3D, server). | Sections 1-4 |
| **Content and workflow** | Guide structure, easy-to-complex progression, step flow, progress saving (local first, server later). | Workflow and status section |
| **UX, i18n and accessibility** | Hebrew/English with RTL, mobile-first plus desktop, clean modern look, SVG illustration requirements, accessibility. | UX/i18n/accessibility section |
| **Technical constraints** | Pure front end, local storage, Capacitor readiness, existing stack limits. | Constraints and assumptions |
| **Acceptance criteria** | Verifiable `AC-n` criteria; every user story maps to at least one. Runs after the others. | Acceptance criteria section |
| **Reviewer** | Checks consistency, testability, and coverage of the notes; lists gaps and blocking questions. | Review report |

## Steps

1. **Prepare:** create one prompt file per agent (suggested location `.github/agents/`), each containing its role, the section template, and a rule to cite the note it derived each requirement from. Mark anything not in the notes as an assumption.
2. **Intake (Orchestrator):** read the notes, list outcomes, constraints, and assumptions, and create an empty open-questions list.
3. **Parallel drafting:** run Product and scope, Content and workflow, UX/i18n/accessibility, and Technical constraints at the same time. Each receives only the notes and its template, and returns markdown for its section.
4. **Merge (Orchestrator):** combine the sections into `docs/prd.md` in the structure from the PRD plan; resolve overlaps and flag conflicts.
5. **Acceptance criteria:** the Acceptance criteria agent writes `AC-n` items from the merged draft.
6. **Review:** the Reviewer checks the draft against the notes and the "done when" list, and returns gaps and blocking questions.
7. **Questions:** the Orchestrator sends blocking questions to the product owner, one at a time, and applies the answers. Repeat steps 4-6 only for affected sections.
8. **Approval:** the product owner approves or returns with changes; record the decision and date in the PRD.

## Rules

- Agents work only from the notes plus explicit, listed assumptions; no invented requirements.
- The notes file is read-only for agents.
- Each section has a single owning agent; the Orchestrator resolves conflicts.
- Keep credentials, personal data, and production data out of all files.

## Done when

- `docs/prd.md` exists with the full structure from Step 1 and `AC-n` criteria.
- Every requirement traces to a note or a listed assumption.
- The Reviewer reports no unresolved blocking issues.
- The product owner has approved the PRD.

## Handoff

The approved PRD goes to Step 2 (Design), along with the open-questions list and recorded decisions.
