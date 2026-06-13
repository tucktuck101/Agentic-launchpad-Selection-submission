# Agents.md

These instructions apply to the Challenge Two PRD-to-tickets task.

## Purpose

- Convert the customer return request PRD into ordered implementation tickets.
- Keep the ticket breakdown small enough for version one.
- Produce concrete submission material with acceptance checks.

## Required Output

- Write 4 to 8 implementation tickets.
- Put tickets in build order.
- Add one acceptance check per ticket.
- Explain the build order reasoning.
- Name the highest-risk ticket and explain why.
- Name one thing to leave out of version one and why.
- Include one clarifying question that still remains.

## Workflow

- Use the PRD in `../../Challenge_info.md` as the source of truth.
- Keep tickets aligned to the stated goals, non-goals, and constraints.
- Make each ticket independently understandable and verifiable.
- Prefer a sequence that establishes data/state first, then customer request flow, then support review, then customer status visibility.
- Keep acceptance checks observable and concise.
- Write the full reviewer-facing artefact in this task folder: `README.md` as the ticket index and ticket files in `tickets/`.
- Optionally update `../codex_notes.md` only as a brief cross-task index or pointer.

## Boundaries

- Do not build the return-request feature.
- Do not edit app code for this task.
- Do not update `../../agentic-launchpad-selection-submission.md` unless the user explicitly asks for a final-copy step.
- Do not include version-one work for rich text, notifications, refund payment processing, analytics dashboards, or international orders.
