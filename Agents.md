# Agents.md

This repository is an Agentic Launchpad selection submission workspace.

## Operating Notes

- Use `Challenge_info.md` as the source of truth for the challenge brief.
- Use `agentic-launchpad-selection-submission.md` as the submission template.
- Do not modify anything inside `Original_Files/`.
- Prefer small, local changes that preserve the structure of the provided materials.
- If you need to inspect the challenge apps, work in:
  - `launchpad-code-review-app/`
  - `launchpad-failing-tests-app/`
  - `launchpad-api-script-server/`

## Editing Rules

- Keep changes ASCII unless a file already uses non-ASCII.
- Use `apply_patch` for manual file edits.
- Do not overwrite user changes unless explicitly asked.
- Avoid touching generated or reference material unless the task requires it.

## Workflow Hints

- Read the relevant challenge instructions before editing.
- When asked to make documentation changes, keep wording close to the source unless the user wants a rewrite.
- When asked to create submission content, match the template headings and keep the answers concrete.

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
