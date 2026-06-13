# Task 3 PRD To Tickets Plan

## Task Purpose

Convert the customer return-request PRD into a small ordered ticket list with acceptance checks, build-order reasoning, risk, one version-one exclusion, and one remaining clarifying question.

## Applicable Instruction Files To Re-Check

- `Agents.md`
- `challenge_two/Agents.md`
- `challenge_two/task_3_prd_to_tickets/Agents.md`
- Any `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, or applicable `.codex/config.toml` files that exist when the task is executed.

Follow the most specific applicable instruction. Reference the instruction files; do not paste their full contents into the notes.

## Inputs And Files To Inspect During Execution

- `Challenge_info.md`, Part 2 PRD To Tickets section.
- `challenge_two/PLAN.md`.
- `challenge_two/task_3_prd_to_tickets/Agents.md`.
- `challenge_two/task_3_prd_to_tickets/README.md`, if still present.
- `challenge_two/codex_notes.md`, PRD To Tickets section.

## Step-By-Step Execution Plan

1. Re-read the applicable instruction files and `challenge_two/PLAN.md`.
2. Read the PRD, goals, non-goals, constraints, and submit requirements in `Challenge_info.md`.
3. Inspect the task README for any local context, if present.
4. Draft 4 to 8 implementation tickets in build order.
5. Keep tickets aligned with version-one goals and constraints, especially existing authentication, existing database, small scope, and domestic orders only.
6. Add one observable acceptance check per ticket.
7. Explain the build order.
8. Identify the highest-risk ticket and why.
9. Name one thing to leave out of version one and why.
10. Include one clarifying question that remains.
11. Update only the PRD To Tickets section of `challenge_two/codex_notes.md`.

## Expected Outputs And Artifacts

- Updated PRD To Tickets section in `challenge_two/codex_notes.md`.
- Evidence notes listing source brief and task files inspected.
- No feature code, database migrations, scripts, tests, or app changes.

## Verification Commands And Checks

- Use `git diff -- challenge_two/codex_notes.md challenge_two/task_3_prd_to_tickets` to confirm only notes changed.
- Check that the section contains 4 to 8 tickets and exactly one acceptance check per ticket.
- Check that non-goals are not included as version-one tickets.
- Use `rg -n "TBD|TODO|FIXME" challenge_two/codex_notes.md` to check for leftover placeholders in the PRD To Tickets section.

## codex_notes.md Update Instructions

Update `challenge_two/codex_notes.md` under `## PRD To Tickets` with:

- Ticket list in build order.
- Build order reasoning.
- Highest-risk ticket.
- Version-one exclusion.
- Remaining clarifying question.
- Evidence: files inspected and commands run.

Also update the Task Status entry for PRD To Tickets.

## Boundaries And Forbidden Edits

- Do not complete other Challenge Two tasks.
- Do not build the return-request feature.
- Do not edit app code.
- Do not edit `agentic-launchpad-selection-submission.md`.
- Do not edit anything under `Original_Files/`.
- Do not include version-one work for rich text, notifications, refund payment processing, analytics dashboards, or international orders.
