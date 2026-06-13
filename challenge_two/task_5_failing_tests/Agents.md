# Agents.md

These instructions apply to the Challenge Two failing-tests app.

## Purpose

- Work out which test failures expose application bugs and which tests are wrong or misleading.
- Make minimal changes needed to align the app and tests with the product rules.
- Record the classification and changes in `../codex_notes.md`.

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
- Update the Failing Tests section in `../codex_notes.md` with valid tests, wrong or misleading tests, changes made, and evidence.

## Boundaries

- Do not change product rules to match current code.
- Do not rewrite the app structure unless the user explicitly asks.
- Do not edit `node_modules/`, build output, caches, or generated files.
