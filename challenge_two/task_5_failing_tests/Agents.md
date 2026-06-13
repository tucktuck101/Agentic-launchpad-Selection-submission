# Agents.md

These instructions apply to the Challenge Two failing-tests app.

## Purpose

- Work out which test failures expose application bugs and which tests are wrong or misleading.
- Make minimal changes needed to align the app and tests with the product rules.
- Write the full reviewer-facing artefacts in this task folder: `test_failure_analysis.md`, `test_output_before.txt`, and `test_output_after.txt`.
- Optionally update `../codex_notes.md` only as a brief cross-task index or pointer.

## Product Rules

- Standard New Zealand shipping is `$8`.
- Orders with a subtotal of `$100` or more get free standard shipping.
- Orders with 5 or more items add a `$5` handling fee.
- International orders add `$20`.
- `paid` and `packed` orders are both reported as `ready`.
- `WELCOME10` means the customer pays 10% less than the original total.
- Unknown discount codes do not change the total.

## Workflow

- Run `npm test` before making changes and capture the failure summary.
- Compare each failure with the product rules before editing.
- Classify failures as valid tests exposing code bugs or tests with wrong expectations.
- Make the smallest app or test edits needed.
- Re-run `npm test` after changes.
- Include edge cases or tests that should be added next in `test_failure_analysis.md`.

## Boundaries

- Do not change product rules to match current code.
- Change app code only for real code bugs.
- Change tests only for wrong or misleading tests.
- Do not rewrite the app structure unless the user explicitly asks.
- Do not edit `node_modules/`, build output, caches, or generated files.
