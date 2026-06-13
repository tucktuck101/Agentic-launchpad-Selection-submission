# Task 5 Failing Tests Plan

## Task Purpose

Run and analyze the failing tests for the Express parcel-quote app, classify failures against the product rules, make minimal code or test fixes, and record evidence.

## Applicable Instruction Files To Re-Check

- `Agents.md`
- `challenge_two/Agents.md`
- `challenge_two/task_5_failing_tests/Agents.md`
- Any `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, or applicable `.codex/config.toml` files that exist when the task is executed.

Follow the most specific applicable instruction. Reference the instruction files; do not paste their full contents into the notes.

## Inputs And Files To Inspect During Execution

- `Challenge_info.md`, Part 2 Failing Tests section and product rules.
- `challenge_two/PLAN.md`.
- `challenge_two/task_5_failing_tests/Agents.md`.
- `challenge_two/task_5_failing_tests/README.md`, if still present.
- `challenge_two/task_5_failing_tests/package.json`.
- `challenge_two/task_5_failing_tests/parcelRules.js`.
- `challenge_two/task_5_failing_tests/parcelRules.test.js`.
- `challenge_two/task_5_failing_tests/server.js`.
- `challenge_two/task_5_failing_tests/server.test.js`.
- `challenge_two/codex_notes.md`, Failing Tests section.

## Step-By-Step Execution Plan

1. Re-read the applicable instruction files and `challenge_two/PLAN.md`.
2. Read the Failing Tests brief and product rules in `Challenge_info.md`.
3. Inspect package scripts and the relevant app and test files.
4. Run `npm test` in `challenge_two/task_5_failing_tests/` before editing and capture the failure summary.
5. Compare each failure with the product rules before changing code or tests.
6. Classify each failure as either a valid test exposing broken code or a wrong or misleading test.
7. Make the smallest code or test edits needed to align implementation and tests with the product rules.
8. Avoid broad refactors and keep app structure intact.
9. Re-run `npm test` and capture the result.
10. Clean up temporary runtime artifacts if created.
11. Update only the Failing Tests section of `challenge_two/codex_notes.md`.

## Expected Outputs And Artifacts

- Minimal app and/or test changes inside `challenge_two/task_5_failing_tests/`.
- Updated Failing Tests section in `challenge_two/codex_notes.md`.
- Evidence with pre-edit failure summary, classification, changes made, and post-edit verification.

## Verification Commands And Checks

- `npm test` from `challenge_two/task_5_failing_tests/` before edits.
- `npm test` from `challenge_two/task_5_failing_tests/` after edits.
- Use `git diff -- challenge_two/task_5_failing_tests challenge_two/codex_notes.md` to confirm changes are scoped.
- Use `git diff --check` before final commit.

## codex_notes.md Update Instructions

Update `challenge_two/codex_notes.md` under `## Failing Tests` with:

- Valid tests exposing broken code.
- Wrong or misleading tests.
- Changes made.
- Evidence: commands run, important output, files changed, assumptions, and remaining risks.

Also update the Task Status entry for Failing Tests.

## Boundaries And Forbidden Edits

- Do not complete other Challenge Two tasks.
- Do not change product rules to match current code.
- Do not rewrite the app structure.
- Do not edit `agentic-launchpad-selection-submission.md`.
- Do not edit anything under `Original_Files/`.
- Do not edit `node_modules/`, build output, caches, or generated files.
- Do not make speculative improvements unrelated to the failing tests.
