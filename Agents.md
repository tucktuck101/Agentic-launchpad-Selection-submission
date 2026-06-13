# Agents.md

This repository is an Agentic Launchpad selection submission workspace.

## Operating Notes

- Use `Challenge_info.md` as the source of truth for the challenge brief.
- Use `agentic-launchpad-selection-submission.md` as the submission template.
- Do not modify anything inside `Original_Files/`.
- Prefer small, local changes that preserve the structure of the provided materials.
- If you need to inspect challenge two tasks, work in:
  - `challenge_two/launchpad-code-review-app/`
  - `challenge_two/clarifying-questions/`
  - `challenge_two/prd-to-tickets/`
  - `challenge_two/launchpad-api-script-server/`
  - `challenge_two/failing-tests-app/`

## Editing Rules

- Keep changes ASCII unless a file already uses non-ASCII.
- Use `apply_patch` for manual file edits.
- Do not overwrite user changes unless explicitly asked.
- Treat unexpected changes to files you did not modify as direct user edits.
- Leave user edits alone unless they directly prevent the current task from being completed.
- Avoid touching generated or reference material unless the task requires it.

## Workflow Hints

- Read the relevant challenge instructions before editing.
- When asked to make documentation changes, keep wording close to the source unless the user wants a rewrite.
- When asked to create submission content, match the template headings and keep the answers concrete.
- For challenge two work, follow `challenge_two/Agents.md` and any more specific nested `Agents.md` file before starting the task.

## Challenge Two Notes

- Challenge two work should attempt all technical tasks because AI is being used extensively.
- Store Challenge Two submission-ready answers, evidence, commands, assumptions, and verification notes in `challenge_two/codex_notes.md`.
- Do not update `agentic-launchpad-selection-submission.md` for Challenge Two unless the user explicitly asks for a final-copy step.
- Use `challenge_two/` for challenge-two notes, helper scripts, and task-specific working files unless the challenge app itself needs a small code or test change.
- Keep task outputs concrete: commands run, observations, assumptions, changes made, and next improvements.

## Challenge One Notes

- Challenge one uses GitHub Actions as the selected topic.
- Capture GitHub Actions challenge-one questions and answers in `challenge_one/codex_notes.md`.
- Only add entries for questions related to the first challenge and GitHub Actions.
- Format each entry with the user's question followed by the assistant's response.
- Append new entries instead of rewriting prior notes unless the user asks for cleanup.
- To conserve chat tokens, write the full response in `challenge_one/codex_notes.md` and keep the chat reply to a short confirmation or pointer unless the user asks for the full answer in chat.

## Logging

- Record each meaningful step in `Codex.log` as a single line.
- Include a timestamp on every log line.
- Keep log entries short and factual, describing what was done rather than long explanations.
- Append to the log instead of overwriting it.

## Git Workflow

- Commit the current changes to Git after each completed task.
- Keep each commit focused on one task or one coherent change set.
- Use clear, short commit messages that describe the completed task.
- Do not commit incomplete or speculative work unless the user explicitly asks for it.

## Safety Boundary

- `Original_Files/` is read-only for this workflow.
- If a task would require changing a file in `Original_Files/`, stop and ask first.
