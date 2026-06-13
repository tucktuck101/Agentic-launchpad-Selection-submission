# Task 5 Failing Tests Plan

## Objective

Analyze the parcel quote test failures, classify them against product rules, make only justified code/test changes, and capture before/after evidence.

## Paths

- Task folder and app folder: `challenge_two/task_5_failing_tests/`
- Analysis artefact: `challenge_two/task_5_failing_tests/test_failure_analysis.md`
- Before output: `challenge_two/task_5_failing_tests/test_output_before.txt`
- After output: `challenge_two/task_5_failing_tests/test_output_after.txt`

## Before Writing Or Editing

- Read root `AGENTS.md`, `challenge_two/PLAN.md`, this file, and `Agents.md`.
- Read the Failing Tests brief and product rules in `Challenge_info.md`.
- Inspect existing app files, test files, and any existing analysis/output artefacts.
- Run `npm test` before code or test edits and capture output.

## Definition Of Done

- `test_output_before.txt` captures the pre-edit test output.
- `test_failure_analysis.md` classifies each relevant failure as either a valid test exposing a code bug or a wrong/misleading test.
- Each classification is justified against the product rules.
- App code changes are made only for real code bugs.
- Test changes are made only for wrong or misleading tests.
- `test_output_after.txt` captures post-edit verification output.
- `test_failure_analysis.md` includes edge cases or tests that should be added next.
- Remaining risks or blockers are recorded.

## Boundaries

- Do not change product rules to match current code.
- Do not rewrite the app structure.
- Do not complete other Part 2 tasks.
- Do not edit `../../agentic-launchpad-selection-submission.md` or `../../Original_Files/`.
- Do not edit `node_modules/`, build output, caches, or generated files.
