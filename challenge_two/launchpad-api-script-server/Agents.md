# Agents.md

These instructions apply to the Challenge Two API script task.

## Purpose

- Run the tiny Python API server in `api-script-server/`.
- Write a small consumer script for `http://localhost:5050/api/items`.
- Do not change the server unless the user explicitly asks or the task cannot be completed otherwise.

## Script Requirements

- Fetch the endpoint.
- Find items where `stock` is less than `reorderAt`.
- Sort low-stock items by highest margin first.
- Print one line per item with name, category, stock, reorder point, and margin.
- Print the total retail value of low-stock items as `sum(price * current stock)`.

## Workflow

- Prefer `python3 server.py` from `api-script-server/` unless Docker is specifically useful.
- Prefer Python standard-library modules for the consumer script unless the repo already has a dependency.
- Put the consumer script in `challenge_two/` or another challenge-two working location, not inside reference server code, unless there is a clear reason.
- Capture actual output when the server can be run locally.
- Update the API Script section in `../codex_notes.md` with the script path or partial script, output, assumptions, evidence, and one improvement to make next.

## Boundaries

- Do not edit `node_modules/`, caches, or generated files.
- Clean up temporary runtime artifacts such as `__pycache__/` if they are created during verification.
