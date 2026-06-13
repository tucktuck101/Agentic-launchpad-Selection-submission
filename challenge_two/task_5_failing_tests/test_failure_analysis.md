# Task 5 Test Failure Analysis

## Current Run Summary

`npm test` was captured before and after this run's edit:

- Before output: `test_output_before.txt`
- After output: `test_output_after.txt`

The current repository already contains the parcel-rule fixes from earlier Challenge Two work. In this run, all nine `parcelRules.test.js` tests passed before editing. The only current failure was the API route test failing to start a local listener in the sandbox.

## Current Failure Classification

### Test Harness Failure, Not A Product Bug

- Test: `POST /api/quote returns subtotal, shipping, total, and status`
- Before output: `listen EPERM: operation not permitted 0.0.0.0`
- Classification: wrong or misleading test harness behavior for this execution environment.
- Reason: the test used `createApp().listen(0)` without a host, so Node attempted to bind on `0.0.0.0`. The product rule under test is the quote response body, but the test failed before any request was sent.

### Change Made In This Run

- Updated `server.test.js` to bind explicitly to `127.0.0.1`:
  - Before: `createApp().listen(0)`
  - After: `createApp().listen(0, "127.0.0.1")`

This narrows the test listener to loopback and does not change the product assertion.

### Remaining Verification Blocker

The post-edit test run still failed because this sandbox also blocks loopback listeners:

```text
listen EPERM: operation not permitted 127.0.0.1
```

An escalation request to rerun `npm test` outside the sandbox was rejected by the execution environment, so a fully passing route-test run could not be captured in this session.

## Product-Rule Classifications Already Reflected In Current Files

The current code and tests already include the minimal product-rule corrections from prior Challenge Two work. The classifications below are still the reviewer-facing classification of the intended failing-tests task:

1. **Valid test exposing broken code: `orders of exactly 100 dollars get free shipping`.** The product rule says orders with a subtotal of `$100` or more get free standard shipping. The corrected code uses `subtotal >= 100` in `parcelRules.js`.
2. **Valid test exposing broken code: `WELCOME10 removes 10 percent from the total`.** The product rule says the customer pays 10% less than the original total. The corrected code returns `total * 0.9`.
3. **Valid rule coverage for unknown discounts.** Unknown discount codes must not change the total. The current code returns the original total for codes other than `WELCOME10`.
4. **Wrong or misleading test: packed orders expected `packed`.** The product rule says both `paid` and `packed` orders are reported as `ready`. The current test now expects `ready`.
5. **Wrong or misleading route-test setup.** Earlier task notes show the route test setup could fail before exercising the endpoint. The current test keeps setup and teardown inside the test body and closes the server in `finally`.

## Changes Made For Product Rules

Already present in the current task files:

- `parcelRules.js`: free shipping threshold uses `subtotal >= 100`.
- `parcelRules.js`: `WELCOME10` returns 90% of the original total.
- `parcelRules.js`: unknown discount codes leave the total unchanged.
- `parcelRules.test.js`: packed orders are expected to normalize to `ready`.
- `server.test.js`: route-test setup and teardown are scoped to the test body.

Made in this run:

- `server.test.js`: route test binds to `127.0.0.1` instead of relying on Node's default host.

## Future Edge Cases To Add

- Free shipping plus bulky handling: subtotal at or above `$100` with 5 or more items should still include the `$5` handling fee if that is intended.
- International order at or above `$100`: confirm whether free standard shipping applies before the `$20` international charge.
- Empty item arrays: decide whether they should throw, return `$8`, or be rejected by API validation.
- Negative price or quantity: reject invalid line items before quote calculation.
- Case-sensitive discount codes: decide whether `welcome10` should be ignored or normalized.
- API validation for malformed request bodies so missing `items` returns a controlled error instead of an uncaught exception.

## Evidence

Source files inspected:

- `Challenge_info.md`
- `AGENTS.md`
- `challenge_two/PLAN.md`
- `challenge_two/task_5_failing_tests/PLAN.md`
- `challenge_two/task_5_failing_tests/Agents.md`
- `challenge_two/task_5_failing_tests/README.md`
- `challenge_two/task_5_failing_tests/package.json`
- `challenge_two/task_5_failing_tests/parcelRules.js`
- `challenge_two/task_5_failing_tests/parcelRules.test.js`
- `challenge_two/task_5_failing_tests/server.js`
- `challenge_two/task_5_failing_tests/server.test.js`
- `challenge_two/codex_notes.md` for prior product-rule classification context

Commands run:

- `sed -n '209,235p' Challenge_info.md`
- `sed -n '1,260p' challenge_two/PLAN.md`
- `sed -n '1,260p' challenge_two/task_5_failing_tests/PLAN.md`
- `sed -n '1,260p' challenge_two/task_5_failing_tests/Agents.md`
- `find challenge_two/task_5_failing_tests -maxdepth 2 -type f -not -path '*/node_modules/*' -print`
- `nl -ba package.json`
- `nl -ba README.md`
- `nl -ba parcelRules.js`
- `nl -ba parcelRules.test.js`
- `nl -ba server.js`
- `nl -ba server.test.js`
- `npm test > test_output_before.txt 2>&1`
- `npm test` with escalation requested and rejected by the execution environment
- `git log --oneline --max-count=8 -- challenge_two/task_5_failing_tests`
- `git show 1b45a7a -- challenge_two/task_5_failing_tests/parcelRules.js challenge_two/task_5_failing_tests/parcelRules.test.js challenge_two/task_5_failing_tests/server.test.js`
- `npm test > test_output_after.txt 2>&1`

## Remaining Risk

The business-rule tests pass in the captured output, but the route test cannot complete in this sandbox because local listeners are blocked. A reviewer running `npm test` in a normal local Node environment should be able to verify the API route behavior.
