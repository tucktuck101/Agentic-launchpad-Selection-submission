# Challenge Two Plan

## Setup-Only Goal

This plan was updated by a setup-only goal. The setup goal created task-level orchestration files and a future single-run prompt, but must not be treated as completed Challenge Two deliverable work.

Setup artifacts:

- `task_1_code_review/PLAN.md`
- `task_2_clarifying_questions/PLAN.md`
- `task_3_prd_to_tickets/PLAN.md`
- `task_4_api_script/PLAN.md`
- `task_5_failing_tests/PLAN.md`
- `SINGLE_RUN_GOAL.md`

Use `SINGLE_RUN_GOAL.md` as the exact future goal prompt when running all Challenge Two tasks in one pass.

## Goal

Complete all Part 2 technical tasks and produce concrete material in `codex_notes.md` for the submission template. Because AI is being used extensively, attempt every task rather than choosing a subset.

## Working Principles

- Before each task, re-check applicable instruction files from the repo root through the task folder, including `Agents.md`, `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, and any applicable `.codex/config.toml` files if present.
- Read the relevant brief in `../Challenge_info.md` before starting each task.
- Follow `Agents.md` files at the repo root, `challenge_two/`, and the specific task folder.
- Preserve the provided app structure unless a task explicitly requires a small code or test change.
- Do not modify `../Original_Files/`, `node_modules/`, build output, caches, or generated files.
- Record commands, outputs, assumptions, blockers, and verification while working.
- Keep `codex_notes.md` concrete: what was tried, what changed, what was checked, what remains.
- Do not update `../agentic-launchpad-selection-submission.md` unless the user explicitly asks for a final-copy step.
- Commit focused changes after each completed task during separate task runs. For the future single-run flow in `SINGLE_RUN_GOAL.md`, defer intermediate commits and produce one focused commit after all five tasks are complete.

## Codex Best-Practice Structure

The future execution flow should keep these parts explicit:

- Goal: complete the requested Challenge Two task or all five tasks in order.
- Context: use `../Challenge_info.md`, this file, the relevant task-level `PLAN.md`, task-folder `Agents.md`, and task source files.
- Constraints: follow the most specific applicable instruction, keep edits scoped, avoid forbidden areas, and preserve user changes.
- Verification: run task-specific checks where practical and record commands, output, assumptions, and blockers.
- Done when: the relevant `codex_notes.md` section is submission-ready, evidence is captured, verification is complete or blocked with a reason, and the diff is scoped.

## Task Folders

- Code Review: `task_1_code_review/` with `task_1_code_review/PLAN.md`
- Clarifying Questions: `task_2_clarifying_questions/` with `task_2_clarifying_questions/PLAN.md`
- PRD To Tickets: `task_3_prd_to_tickets/` with `task_3_prd_to_tickets/PLAN.md`
- API Script: `task_4_api_script/` with `task_4_api_script/PLAN.md`
- Failing Tests: `task_5_failing_tests/` with `task_5_failing_tests/PLAN.md`

Each task folder has its own `Agents.md`; read that file before starting work in the folder. If an override file appears later, follow the most specific applicable instruction.

Use `codex_notes.md` as the canonical Challenge Two notes file. Update the relevant section after each task.

## Future Single-Run Execution Flow

1. Start with the exact prompt in `SINGLE_RUN_GOAL.md`.
2. Inspect applicable root, challenge-level, and task-level instruction files and project config.
3. Re-read this file before every task.
4. Complete the five tasks in the order below.
5. Before each task, re-read that task's `PLAN.md` and applicable instruction files.
6. Update the relevant section of `codex_notes.md` after each task with evidence, commands, assumptions, and verification notes.
7. Run practical verification after each task.
8. Leave `../agentic-launchpad-selection-submission.md` untouched unless a future user explicitly asks for final-copy work.
9. Avoid `../Original_Files/`, generated files, caches, and `node_modules/`.
10. Produce one focused commit after all Challenge Two tasks are complete.

## Task Order

1. Code Review
   - Inspect the Express/React ecommerce support app.
   - Document what the app does.
   - Identify at least three bugs, risks, or design concerns.
   - Name the first change to make and why.
   - Name what to leave alone for now.
   - Capture extra context that would help the review.

2. Clarifying Questions
   - Answer the return-request feature brief without building the feature.
   - Write 5 to 8 clarifying questions.
   - Pick the 2 most important questions and explain why they matter first.
   - Write 3 assumptions if work had to start today.
   - Name the smallest useful version one.
   - Explain the main risk if the assumptions are wrong.

3. PRD To Tickets
   - Convert the return-request PRD into 4 to 8 ordered implementation tickets.
   - Add one acceptance check per ticket.
   - Explain the build order.
   - Name the highest-risk ticket and why.
   - Name one thing to leave out of version one.
   - Include one clarifying question that still remains.

4. API Script
   - Run the Python API server locally from `task_4_api_script/api-script-server/`.
   - Write a small consumer script that fetches `/api/items`.
   - Filter items where `stock` is less than `reorderAt`.
   - Sort low-stock items by highest margin first.
   - Print one line per item with name, category, stock, reorder point, and margin.
   - Print the total retail value of low-stock items.
   - Capture actual output, assumptions, and one next improvement.

5. Failing Tests
   - Run `npm test` in `task_5_failing_tests/` before editing.
   - Compare each failure with the product rules in the brief.
   - Classify failures as valid tests exposing code bugs or wrong/misleading tests.
   - Make minimal changes to align code and tests with the product rules.
   - Re-run `npm test`.
   - Document valid tests, wrong tests, and changes made.

## Evidence To Capture

- Commands run and their important output.
- Files inspected and files changed.
- Bugs, risks, assumptions, and blockers.
- Test failures before changes and verification results after changes.
- Any places where the chosen approach changed after inspection.

## Completion Criteria

- All five Part 2 tasks have submission-ready notes.
- Relevant commands have been run and important output is captured.
- Any code or test changes are minimal and verified.
- `codex_notes.md` contains all information needed to manually update `../agentic-launchpad-selection-submission.md` later.
- `../Codex.log` includes meaningful timestamped progress entries.
- The final challenge-two state is committed to Git.
