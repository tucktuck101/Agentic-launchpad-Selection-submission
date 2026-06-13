# Task 2 Clarifying Questions Plan

## Task Purpose

Analyze the customer return-request feature brief and produce submission-ready clarifying questions, assumptions, first-version scope, and risk notes without building the feature.

## Applicable Instruction Files To Re-Check

- `Agents.md`
- `challenge_two/Agents.md`
- `challenge_two/task_2_clarifying_questions/Agents.md`
- Any `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, or applicable `.codex/config.toml` files that exist when the task is executed.

Follow the most specific applicable instruction. Reference the instruction files; do not paste their full contents into the notes.

## Inputs And Files To Inspect During Execution

- `Challenge_info.md`, Part 2 Clarifying Questions section.
- `challenge_two/PLAN.md`.
- `challenge_two/task_2_clarifying_questions/Agents.md`.
- `challenge_two/task_2_clarifying_questions/README.md`, if still present.
- `challenge_two/codex_notes.md`, Clarifying Questions section.

## Step-By-Step Execution Plan

1. Re-read the applicable instruction files and `challenge_two/PLAN.md`.
2. Read the Clarifying Questions brief in `Challenge_info.md`.
3. Inspect the task README for any local context, if present.
4. Draft 5 to 8 specific clarifying questions about return eligibility, order status, user roles, support review, data model, and status handling.
5. Pick the 2 questions that matter most before coding and explain why they should be asked first.
6. Write 3 clearly labeled assumptions to use if work had to start today.
7. Name the smallest useful version one.
8. Explain the main risk if the assumptions are wrong.
9. Update only the Clarifying Questions section of `challenge_two/codex_notes.md`.

## Expected Outputs And Artifacts

- Updated Clarifying Questions section in `challenge_two/codex_notes.md`.
- Evidence notes listing source brief and task files inspected.
- No feature code, tickets, scripts, tests, or app changes.

## Verification Commands And Checks

- Use `git diff -- challenge_two/codex_notes.md challenge_two/task_2_clarifying_questions` to confirm only notes changed.
- Check that the section contains 5 to 8 questions, 2 prioritized questions, 3 assumptions, a smallest version, and a main risk.
- Check the Clarifying Questions section of `challenge_two/codex_notes.md` for leftover `TBD`, `TODO`, or `FIXME` placeholders. Ignore placeholders in later task sections that have not run yet.

## codex_notes.md Update Instructions

Update `challenge_two/codex_notes.md` under `## Clarifying Questions` with:

- Questions.
- Two questions to ask first, with reasons.
- Assumptions if starting today.
- Smallest useful version.
- Main risk if assumptions are wrong.
- Evidence: files inspected and commands run.

Also update the Task Status entry for Clarifying Questions.

## Boundaries And Forbidden Edits

- Do not complete other Challenge Two tasks.
- Do not build the return-request feature.
- Do not edit app code.
- Do not create implementation tickets for this task beyond what is needed to describe scope.
- Do not edit `agentic-launchpad-selection-submission.md`.
- Do not edit anything under `Original_Files/`.
- Do not invent complex policy, refund, notification, analytics, or international-order behavior except as clearly marked assumptions.
