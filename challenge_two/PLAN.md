# Challenge Two Plan

## Goal

Complete all Part 2 technical tasks and produce concrete material for the submission template. Because AI is being used extensively, attempt every task rather than choosing a subset.

## Working Principles

- Read the relevant brief in `../Challenge_info.md` before starting each task.
- Follow `Agents.md` files at the repo root, `challenge_two/`, and the specific task folder.
- Preserve the provided app structure unless a task explicitly requires a small code or test change.
- Do not modify `../Original_Files/`, `node_modules/`, build output, caches, or generated files.
- Record commands, outputs, assumptions, blockers, and verification while working.
- Keep final submission notes concrete: what was tried, what changed, what was checked, what remains.
- Commit focused changes after each completed task.

## Task Folders

- Code Review: `launchpad-code-review-app/`
- Clarifying Questions: `clarifying-questions/`
- PRD To Tickets: `prd-to-tickets/`
- API Script: `launchpad-api-script-server/`
- Failing Tests: `failing-tests-app/`

Each task folder has its own `Agents.md`; read that file before starting work in the folder.

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
   - Run the Python API server locally from `launchpad-api-script-server/api-script-server/`.
   - Write a small consumer script that fetches `/api/items`.
   - Filter items where `stock` is less than `reorderAt`.
   - Sort low-stock items by highest margin first.
   - Print one line per item with name, category, stock, reorder point, and margin.
   - Print the total retail value of low-stock items.
   - Capture actual output, assumptions, and one next improvement.

5. Failing Tests
   - Run `npm test` in `failing-tests-app/` before editing.
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
- `../agentic-launchpad-selection-submission.md` can be updated from the collected notes.
- `../Codex.log` includes meaningful timestamped progress entries.
- The final challenge-two state is committed to Git.
