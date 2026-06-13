# Challenge Two Plan

## Objective

Bring Part 2 to submission-ready Definition of Done without using `agentic-launchpad-selection-submission.md` as the only evidence. Work task by task, in order, and keep reviewer-facing artefacts in the relevant task folder.

## Required Order

1. Code Review: `task_1_code_review/`
2. Clarifying Questions: `task_2_clarifying_questions/`
3. PRD To Tickets: `task_3_prd_to_tickets/`
4. API Script: `task_4_api_script/`
5. Failing Tests: `task_5_failing_tests/`

## Operating Rules

- Before starting each task, read root `../AGENTS.md`, this plan, `../Challenge_info.md`, the task-level `PLAN.md`, and the task-level `Agents.md`.
- Inspect existing work before creating or replacing artefacts.
- Keep task-local artefacts in the relevant task folder unless shared repo documentation or `../Codex.log` must be updated.
- Preserve supplied app structure. Do not move supplied app files unless necessary and explained in the task notes.
- Do not modify `../Original_Files/`, generated files, caches, or `node_modules/`.
- Do not change `../agentic-launchpad-selection-submission.md` unless the user explicitly asks for a final-copy step.
- Record meaningful progress in `../Codex.log` with short timestamped lines.

## Evidence Expectations

Each task folder should contain reviewer-friendly evidence:

- the requested artefact files;
- commands run and important output, where relevant;
- assumptions and constraints used;
- verification notes or a clear blocker;
- links or paths to changed files and supporting source files.

Use `codex_notes.md` only as a cross-task index or staging note if useful. The task folders own the Part 2 evidence.

## Completion Check

Part 2 is submission-ready when every task listed in `PART_2_DOD_REVIEW.md` has its expected artefacts, evidence paths, status, and remaining-work notes filled in, and all changes are scoped to the relevant task folders plus required repo-level logging.
