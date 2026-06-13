# Task 4 API Script Plan

## Task Purpose

Run the tiny Python API server and write a small consumer script that fetches `/api/items`, reports low-stock items sorted by highest margin first, and records output and assumptions.

## Applicable Instruction Files To Re-Check

- `Agents.md`
- `challenge_two/Agents.md`
- `challenge_two/task_4_api_script/Agents.md`
- Any `AGENTS.md`, `Agents.override.md`, `AGENTS.override.md`, or applicable `.codex/config.toml` files that exist when the task is executed.

Follow the most specific applicable instruction. Reference the instruction files; do not paste their full contents into the notes.

## Inputs And Files To Inspect During Execution

- `Challenge_info.md`, Part 2 API Script section.
- `challenge_two/PLAN.md`.
- `challenge_two/task_4_api_script/Agents.md`.
- Server files under `challenge_two/task_4_api_script/api-script-server/`.
- Any README or dependency files in the API script task folder.
- `challenge_two/codex_notes.md`, API Script section.

## Step-By-Step Execution Plan

1. Re-read the applicable instruction files and `challenge_two/PLAN.md`.
2. Read the API Script brief in `Challenge_info.md`.
3. Inspect the API server code and available run instructions without changing the server.
4. Prefer running `python3 server.py` from `challenge_two/task_4_api_script/api-script-server/` unless Docker is clearly needed.
5. Write a small consumer script in `challenge_two/` or another challenge-two working location, using Python standard-library modules unless an existing dependency is already appropriate.
6. Fetch `http://localhost:5050/api/items`.
7. Filter items where `stock` is less than `reorderAt`.
8. Sort low-stock items by highest margin first.
9. Print one line per item with name, category, stock, reorder point, and margin.
10. Print total retail value of low-stock items as `sum(price * current stock)`.
11. Capture actual output, assumptions, and one next improvement.
12. Clean up temporary runtime artifacts such as `__pycache__/`, if created.
13. Update only the API Script section of `challenge_two/codex_notes.md`.

## Expected Outputs And Artifacts

- A small consumer script in a challenge-two working location.
- Updated API Script section in `challenge_two/codex_notes.md`.
- Evidence with server command, script command, output, assumptions, and next improvement.
- No server changes unless the future task cannot be completed otherwise; document the blocker before changing server code.

## Verification Commands And Checks

- Run the API server locally.
- Run the consumer script and capture output.
- Use `git diff -- challenge_two` to confirm expected script and notes changes only.
- If tests or lint scripts exist for this task, run the relevant lightweight checks.

## codex_notes.md Update Instructions

Update `challenge_two/codex_notes.md` under `## API Script` with:

- Script path or partial script.
- Output expected or got.
- Assumptions.
- What to improve next.
- Evidence: server command, script command, output, files inspected, and any blocker.

Also update the Task Status entry for API Script.

## Boundaries And Forbidden Edits

- Do not complete other Challenge Two tasks.
- Do not edit `agentic-launchpad-selection-submission.md`.
- Do not edit anything under `Original_Files/`.
- Do not edit `node_modules/`, caches, or generated files.
- Do not change the API server unless a future task cannot be completed otherwise; document the blocker first.
- Do not add dependencies unless there is a clear need and the repo already supports that approach.
