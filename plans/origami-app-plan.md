# Origami App Plan

## Purpose

Coordinate future work on Origami, currently an activity-approval forms app, through five focused agents. This document is a plan only; it does not authorize or implement product changes. The first release scope should be confirmed before work begins.

## Working principles

- Treat the existing activity form flow (create, edit, list, and status display) as context, not as a complete product specification.
- Keep each agent focused on its role and pass concise, reviewable artifacts between stages.
- Reuse the current React, TypeScript, Tailwind, and shared-component conventions unless the approved specification gives a reason to change them.
- Do not deploy, merge, or make irreversible changes without human approval.
- Do not put credentials, personal information, or production data in agent prompts or artifacts.

## Agent roles

| Agent | Responsibilities | Deliverable |
|---|---|---|
| **Spec Agent** | Clarify users, roles, goals, workflows, form fields, status transitions, validation, accessibility, privacy, and out-of-scope work. Record assumptions and unresolved questions. | Product specification with user stories and testable acceptance criteria. |
| **Design Agent** | Translate the approved specification into page flows, states, and responsive, accessible UI guidance. Align with existing shared components and localization patterns; identify any new component needs. | Screen and interaction proposal, including empty, loading, validation, and error states. |
| **Orchestrator** | Own the task queue and sequence, provide agents only the approved context they need, resolve or escalate conflicts, track dependencies, and ensure outputs satisfy acceptance criteria before handoff. Keep implementation changes in small, reviewable units. | Work breakdown, decisions, handoff notes, and release checklist. |
| **Test Agent** | Derive tests from acceptance criteria; cover relevant form/service behavior, user-facing flows, accessibility, and regression cases using the repository’s existing Vitest and Testing Library setup. | Test plan, added or updated tests, and test results. |
| **Review Agent** | Independently compare the proposed change and test evidence to the approved specification. Check for regressions, accessibility gaps, privacy/security concerns, and unnecessary scope. Report findings with severity and file/line references; do not silently expand scope. | Review findings and a clear approve-or-revise recommendation. |

## Workflow and handoffs

1. **Intake — Orchestrator:** capture the requested outcome, affected users, constraints, and decision owner. Keep assumptions explicit.
2. **Specify — Spec Agent:** produce the product specification and acceptance criteria. The product owner answers blocking questions and approves the scope.
3. **Design — Design Agent:** work from the approved specification; return open design decisions to the Orchestrator instead of inventing requirements.
4. **Plan — Orchestrator:** break approved work into small implementation tasks. Assign dependencies and identify risks before delegating.
5. **Validate — Test Agent:** map each acceptance criterion to an existing or planned test. Run the relevant tests and report gaps.
6. **Review — Review Agent:** inspect the candidate change against the specification and test evidence. The Orchestrator routes findings to the appropriate owner and requests another review after material fixes.
7. **Release — Orchestrator and human owner:** confirm required checks, review findings, and deployment readiness. A human approves merge and production release.

The Test Agent and Review Agent may work in parallel once a stable candidate change and its specification are available. The Review Agent should not approve a change based only on another agent’s summary; it should inspect the actual diff and evidence.

## Suggested cloud implementation

Use **GitHub Actions** as the workflow coordinator and CI gate, with one job or reusable workflow per stage where automation is appropriate. Start with a human-triggered workflow on an issue or pull request: pass the approved specification and design artifact to the next stage, retain outputs as pull-request comments or short-lived workflow artifacts, and run tests and review checks against the candidate branch. Keep the existing repository scripts as the checks of record (`npm run typecheck`, `npm run lint`, `npm run test`, and `npm run build`). Agent-generated changes should be proposed on a branch and reviewed through a pull request; do not grant an agent direct production or merge permissions.

For hosting, a reasonable first cloud shape is a static host/CDN for the Vite frontend and a separately deployed container service for the Django API, backed by a managed database if the approved product requires persistence. For example, on AWS this could be S3 + CloudFront for the frontend, ECS/Fargate for the API, and RDS for PostgreSQL. Confirm the actual backend, data requirements, budget, and cloud provider before choosing services; the README mentions a local Docker backend, but deployment configuration is not part of this plan.

Cloud safeguards:

- Give CI and agents the least permissions required; use short-lived identity/OIDC rather than stored long-lived cloud keys where supported.
- Keep production secrets in a managed secret store, separate development/staging/production environments, and require human approval for production deployment.
- Run untrusted pull-request code without production credentials; limit artifact access and retention.
- Use HTTPS, access controls, backups, logging, and a rollback path before a production launch.

## Definition of ready to release

- Product scope and acceptance criteria are approved.
- Design decisions and accessibility states are addressed.
- Acceptance tests and existing project checks pass.
- Review findings are resolved or explicitly accepted by the human owner.
- Cloud target, environment configuration, secret handling, monitoring, and rollback plan are confirmed.
- A human approves merge and production deployment.
