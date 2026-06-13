# Task 1 Code Review Plan

## Task Purpose

Review the small Express/React ecommerce support app in `challenge_two/task_1_code_review/` without fixing it. Produce concrete review notes for the Code Review section of `challenge_two/codex_notes.md`.

## Applicable Instruction Files To Re-Check

- `Agents.md`
- `challenge_two/Agents.md`
- `challenge_two/task_1_code_review/Agents.md`
- Any `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, or applicable `.codex/config.toml` files that exist when the task is executed.

Follow the most specific applicable instruction. Reference the instruction files; do not paste their full contents into the notes.

## Inputs And Files To Inspect During Execution

- `Challenge_info.md`, Part 2 Code Review section.
- `challenge_two/PLAN.md`.
- `challenge_two/task_1_code_review/Agents.md`.
- Server and client source files under `challenge_two/task_1_code_review/`.
- Package scripts or README files in the task folder, if present.
- `challenge_two/codex_notes.md`, Code Review section.

## Step-By-Step Execution Plan

1. Re-read the applicable instruction files and `challenge_two/PLAN.md`.
2. Read the Code Review brief in `Challenge_info.md`.
3. Inventory the task app structure, excluding `node_modules/`, build output, caches, and generated files.
4. Inspect both server and client code before drafting findings.
5. Identify what the app does in support-team terms.
6. Identify at least three concrete bugs, risks, or design concerns, preferring behavioral and user-facing issues.
7. Add file and line references for findings where practical.
8. Choose the first change to make and explain why it should come first.
9. Name what should be left alone for now.
10. List extra context that would improve the review.
11. Update only the Code Review section of `challenge_two/codex_notes.md`.

## Expected Outputs And Artifacts

- Updated Code Review section in `challenge_two/codex_notes.md`.
- Evidence notes with files inspected and any commands run.
- No app-code changes for this task unless a future user explicitly asks for fixes.

## Verification Commands And Checks

- Use `git diff -- challenge_two/codex_notes.md challenge_two/task_1_code_review` to confirm only notes changed.
- Use `rg -n "TBD|TODO|FIXME" challenge_two/codex_notes.md` to check for leftover placeholders in the Code Review section.
- Running the app is optional for review; if run, record the command and result in notes.

## codex_notes.md Update Instructions

Update `challenge_two/codex_notes.md` under `## Code Review` with:

- What the app does.
- At least three bugs, risks, or design concerns.
- First change to make and why.
- What to leave alone for now.
- Extra information needed.
- Evidence: files inspected, commands run, and relevant observations.

Also update the Task Status entry for Code Review.

## Boundaries And Forbidden Edits

- Do not complete other Challenge Two tasks.
- Do not fix the app during this review.
- Do not edit `agentic-launchpad-selection-submission.md`.
- Do not edit anything under `Original_Files/`.
- Do not edit `node_modules/`, build output, caches, or generated files.
- Do not install new dependencies just to perform the review.
- Stop and document a blocker if review setup appears to require app-code changes.
