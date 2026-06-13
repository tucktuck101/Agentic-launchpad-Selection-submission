# Task 4 API Script Plan

## Objective

Create a task-local API consumer script and evidence for the low-stock report.

## Paths

- Task folder: `challenge_two/task_4_api_script/`
- API server folder: `challenge_two/task_4_api_script/api-script-server/`
- Script artefact: `challenge_two/task_4_api_script/low_stock_report.py` or another clearly named task-local script.
- Output artefact: `challenge_two/task_4_api_script/low_stock_output.txt`
- Notes artefact: `challenge_two/task_4_api_script/README.md` or task-local notes file.

## Before Writing

- Read root `AGENTS.md`, `challenge_two/PLAN.md`, this file, and `Agents.md`.
- Read the API Script brief in `Challenge_info.md`.
- Inspect the API server code and existing task files before creating or replacing artefacts.
- Prefer running `python3 server.py` from `api-script-server/` unless Docker is needed.

## Definition Of Done

- The script fetches `http://localhost:5050/api/items`.
- It filters items where `stock < reorderAt`.
- It sorts low-stock items by highest margin first.
- It prints item name, category, stock, reorder point, and margin.
- It prints total retail value of low-stock items.
- Captured output is saved in the task folder.
- Notes include run instructions, assumptions, evidence paths, and next improvements.

## Boundaries

- Do not change the API server unless necessary and explained.
- Do not complete other Part 2 tasks.
- Do not edit `../../agentic-launchpad-selection-submission.md` or `../../Original_Files/`.
- Do not edit caches or generated files.
