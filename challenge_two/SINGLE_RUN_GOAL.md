# Future Single-Run Goal Prompt

Use the exact prompt below for a future Codex goal run that completes all five Challenge Two tasks in order.

```text
/goal Goal: Complete all five Challenge Two technical tasks in order and prepare submission-ready notes in challenge_two/codex_notes.md.

Context and source of truth:
1. Use Challenge_info.md, Part 2, as the challenge brief source of truth.
2. Use challenge_two/PLAN.md and each task's PLAN.md as the execution plans.
3. Use challenge_two/codex_notes.md as the canonical staging area for answers, evidence, commands, assumptions, and verification notes.
4. Use applicable Agents.md, AGENTS.md, Agents.override.md, AGENTS.override.md, and .codex/config.toml files as durable repo guidance.

Before starting:
1. Inspect the repo structure.
2. Inspect applicable instruction and config files from the repo root through challenge_two and each task folder:
   - Agents.md, AGENTS.md, Agents.override.md, AGENTS.override.md if present.
   - Applicable .codex/config.toml files if present.
3. Read Challenge_info.md, focusing on Part 2.
4. Read challenge_two/PLAN.md.
5. Follow the most specific applicable instruction if guidance conflicts.
6. Make a short task checklist and update it as each task is completed.

Complete tasks in this exact order:
1. challenge_two/task_1_code_review
2. challenge_two/task_2_clarifying_questions
3. challenge_two/task_3_prd_to_tickets
4. challenge_two/task_4_api_script
5. challenge_two/task_5_failing_tests

Before each task:
1. Re-read challenge_two/PLAN.md.
2. Re-read that task's PLAN.md.
3. Re-read applicable AGENTS guidance from repo root through the task folder, including override files if present.
4. Re-check applicable project config files.
5. Follow the most specific applicable instruction.

For each task:
1. Complete only that task's requested deliverables.
2. Update the relevant section of challenge_two/codex_notes.md after the task with answers, evidence, commands, assumptions, verification notes, and any blockers.
3. Run relevant verification after the task where practical.
4. Do not complete unrelated Challenge Two tasks early.
5. Append short timestamped progress entries to Codex.log for meaningful steps.

Boundaries:
1. Avoid Original_Files/.
2. Do not edit agentic-launchpad-selection-submission.md unless the user sends a later explicit final-copy request.
3. Do not edit node_modules, build output, caches, or generated files.
4. Keep changes small and local.
5. If a task seems to require changing files outside its boundary, document the blocker before proceeding.
6. Preserve user changes and do not overwrite unrelated work.

After all five tasks:
1. Review challenge_two/codex_notes.md for completeness.
2. Run practical final checks, including git diff --check.
3. Review git diff to confirm scope.
4. Produce one final focused commit for completed Challenge Two work.
5. In the final response, summarize completed tasks, checks run, remaining risks or blockers, forbidden areas avoided, and the commit hash.

Done when:
1. All five task sections in challenge_two/codex_notes.md contain submission-ready notes and evidence.
2. Relevant verification has been run after each task where practical, or a blocker is documented.
3. Changes are limited to allowed Challenge Two task files, challenge_two/codex_notes.md, and Codex.log.
4. Original_Files/, agentic-launchpad-selection-submission.md, node_modules, build output, caches, and generated files are untouched.
5. One focused final commit exists for the completed Challenge Two work.
```
