# Challenge Two Codex Notes

This file is the canonical staging area for Challenge Two answers, evidence, commands, assumptions, and verification details. Do not update `../agentic-launchpad-selection-submission.md` during Challenge Two work unless the user explicitly asks for a final-copy step.

## Task Status

- Code Review: complete.
- Clarifying Questions: complete.
- PRD To Tickets: complete.
- API Script: complete.
- Failing Tests: complete.

## Code Review

### What The App Does

The app is an Express API plus React support dashboard for ecommerce order review. The API serves a small in-memory list of orders, supports status/contacted filtering, and allows orders to be patched. The React UI lets support staff filter by status, optionally include contacted orders, select an order, read the customer message, add an internal note, and mark the order as contacted.

### Bugs, Risks, Or Design Concerns

1. Contacted filtering is effectively broken when the client sends `includeContacted=false`. In `server/index.js:65`, query params are read as strings, so `"false"` is truthy. `getVisibleOrders` therefore skips the `!includeContacted` filter at `server/index.js:56-58`, and contacted orders are included even when the checkbox is off.
2. Order sorting does not define a real comparator. `server/index.js:60` returns a boolean from `sort`, not a negative/zero/positive value, so ordering can be inconsistent and may not reliably show newest or oldest first.
3. The note editor can save the wrong note to a newly selected/defaulted order. After fetch, `App.jsx:20-23` sets `selected` to the first returned item but does not sync `note` to that order's `internalNote`; `markContacted` then sends the stale `note` state in `App.jsx:31-36`. Filtering or refreshing the list could attach a previous order's note to the new selected order.
4. Customer messages are rendered with `dangerouslySetInnerHTML` in `App.jsx:99`. If customer-controlled text ever contains HTML, this creates an XSS risk in a support dashboard that displays customer names, addresses, and order data.
5. The PATCH endpoint can send a 404 and still continue into mutation/response logic. `server/index.js:76-82` does not return after `res.status(404).json(...)`, so a missing order will continue to `Object.assign(order, req.body)` with `order` undefined and can throw or attempt a second response.
6. There is no validation or field allowlist on `PATCH /api/orders/:id` or `POST /api/orders` (`server/index.js:73-95`). A client can overwrite protected fields such as `id`, `total`, `priority`, `placedAt`, or `shippingAddress`; that is risky even for an internal tool.
7. React list keys use `order.customerName` (`App.jsx:80`) instead of a stable unique id. Duplicate customer names could cause incorrect row reuse or selected-state confusion.

### First Change To Make

I would first fix the API filtering/sorting and add narrow request validation for the support actions. Those are central to the support workflow: staff need to trust which orders are visible, which order is selected first, and which fields can be changed when marking an order as contacted. A minimal first pass would parse `includeContacted` explicitly, replace the sort comparator, return immediately on 404, and allow only `contacted` and `internalNote` in the PATCH body.

### What To Leave Alone For Now

I would leave the broad UI styling, single-page layout, and in-memory demo data structure alone for this review task. They are acceptable for a small challenge app, and changing them before fixing correctness/security issues would not reduce the biggest user-facing risk.

### Extra Information Needed

- Is this meant to be a throwaway demo, an internal-only prototype, or a path toward production?
- What are the canonical order statuses and support actions?
- Should contacted orders disappear immediately after marking contacted when the "Include contacted" checkbox is off?
- Are customer messages plain text only, or can they contain HTML from another system?
- What authentication/authorization layer is expected around the dashboard and API?
- Should internal notes be appended/audited, or is replacing the note acceptable?
- What persistence layer and concurrency expectations would replace the in-memory array?

### Evidence

Files inspected: `challenge_two/task_1_code_review/Agents.md`, `challenge_two/task_1_code_review/PLAN.md`, `challenge_two/task_1_code_review/code-review-app/README.md`, `package.json`, `server/index.js`, `client/src/App.jsx`, and `client/src/styles.css`.

Commands run:

```bash
sed -n '1,220p' challenge_two/PLAN.md
sed -n '1,220p' challenge_two/task_1_code_review/Agents.md
sed -n '1,220p' challenge_two/task_1_code_review/PLAN.md
find challenge_two/task_1_code_review -name 'AGENTS.md' -o -name 'Agents.override.md' -o -name 'AGENTS.override.md' -o -path '*/.codex/config.toml'
nl -ba challenge_two/task_1_code_review/code-review-app/server/index.js | sed -n '1,260p'
nl -ba challenge_two/task_1_code_review/code-review-app/client/src/App.jsx | sed -n '1,300p'
nl -ba challenge_two/task_1_code_review/code-review-app/client/src/styles.css | sed -n '1,260p'
sed -n '1,220p' challenge_two/task_1_code_review/code-review-app/README.md
cat challenge_two/task_1_code_review/code-review-app/package.json
```

I did not run the app for Task 1 because the brief only required review, the task guidance said running was optional, and the relevant issues were visible from static inspection. No app code was changed.

## Clarifying Questions

### Questions

1. Which orders are eligible for return in version one: order status, delivery date window, product category exclusions, final-sale items, and domestic-only limits?
2. Who can submit a return request: only the authenticated customer who placed the order, support staff on behalf of a customer, or both?
3. Can an order have more than one return request, and can a return request cover selected items/quantities or only the whole order?
4. What return reasons should be offered, and is the customer's short note required or optional?
5. What statuses should the return request move through, and who is allowed to change each status?
6. What exact information does support need in the review list: customer, order id, item details, reason, note, request date, order date, and prior return history?
7. What should the customer see after support approves or declines a request: status only, support note, next steps, shipping instructions, or refund expectations?
8. What audit trail is required for support decisions, including reviewer identity, timestamp, and decline reason?

### Two Questions To Ask First

1. Which orders are eligible for return in version one? This should be asked first because eligibility drives the data model, the customer entry point, error states, and the support queue. If eligibility is wrong, the feature may accept requests the business cannot honor or block valid customers.
2. Can a request cover selected items/quantities or only the whole order? This changes the shape of the return request records and UI. Whole-order returns are much smaller; item-level returns require line-item selection, quantity validation, and more detailed support review.

### Assumptions If Starting Today

1. Version one supports authenticated customers requesting returns only for their own domestic orders.
2. Version one uses whole-order return requests, with one active return request per order.
3. The customer must choose one reason from a small fixed list and may add an optional plain-text note; support can only mark the request approved or declined.

### Smallest Useful Version

A simple first version would let an authenticated customer open an eligible domestic order, submit one whole-order return request with a reason and optional note, and then see its status. Support staff would get a date-ordered list of open requests, view the order id, customer, reason, note, and request date, then approve or decline the request.

### Main Risk If Assumptions Are Wrong

The main risk is building the wrong data shape. If the business needs item-level/quantity-level returns, multiple requests per order, strict eligibility rules, or detailed approval/decline reasons, a whole-order single-request model would need rework before it could support the real workflow.

### Evidence

Files inspected: `Challenge_info.md` Part 2 Clarifying Questions brief, `challenge_two/PLAN.md`, `challenge_two/task_2_clarifying_questions/Agents.md`, `challenge_two/task_2_clarifying_questions/PLAN.md`, and `challenge_two/task_2_clarifying_questions/README.md`.

Commands run:

```bash
sed -n '1,220p' challenge_two/PLAN.md
sed -n '1,220p' challenge_two/task_2_clarifying_questions/Agents.md
sed -n '1,240p' challenge_two/task_2_clarifying_questions/PLAN.md
find challenge_two/task_2_clarifying_questions -name 'AGENTS.md' -o -name 'Agents.override.md' -o -name 'AGENTS.override.md' -o -path '*/.codex/config.toml'
sed -n '1,220p' challenge_two/task_2_clarifying_questions/README.md
```

No feature code or task files were changed for Task 2.

## PRD To Tickets

### Ticket List

1. Add return-request persistence using the existing database.
   Acceptance check: A return request record can store order id, customer id, reason, optional note, status, created timestamp, and reviewed timestamp/reviewer fields without requiring a new auth system.
2. Add eligibility lookup for domestic customer orders.
   Acceptance check: An authenticated customer can see whether one of their domestic orders is eligible to request a return, and an ineligible order returns a clear reason instead of allowing submission.
3. Build the customer return request form.
   Acceptance check: For an eligible domestic order, the customer can select a reason, enter an optional short plain-text note, submit the request, and receive the created request with `open` status.
4. Prevent duplicate active requests for the same order.
   Acceptance check: If an order already has an open return request, a second submission for that order is rejected and the existing request status is returned.
5. Build the support open-requests list.
   Acceptance check: A support user can view open return requests sorted by oldest request date first, including order id, customer, reason, note, and request date.
6. Build support approve/decline actions.
   Acceptance check: A support user can approve or decline an open request, and the request status, reviewer, and reviewed timestamp are saved.
7. Show return request status to the customer.
   Acceptance check: A customer viewing their order can see whether the return request is open, approved, or declined.

### Build Order Reasoning

I would build the data/state first because the customer and support screens need the same status source. Eligibility comes next so the customer form only appears for allowed domestic orders. The customer submission flow follows, then duplicate prevention to protect the workflow before support starts acting on requests. After requests exist, the support list and approve/decline actions can be implemented and verified. Customer status display comes last because it depends on both request creation and support decisions.

### Highest-Risk Ticket

Highest-risk ticket: eligibility lookup for domestic customer orders. This is risky because the PRD does not define the exact eligibility policy, and mistakes here have business impact: customers may be allowed to request returns for orders that should be excluded, or blocked from valid returns. It also touches existing auth and order data boundaries.

### Version-One Exclusion

Leave out refund payment processing. The PRD explicitly lists it as a non-goal, and approval/decline workflow can provide useful support value without triggering financial side effects in version one.

### Remaining Clarifying Question

What exact rule makes an order eligible for return in version one: delivery status, return window, product exclusions, final-sale items, or support override?

### Evidence

Files inspected: `Challenge_info.md` Part 2 PRD To Tickets brief, `challenge_two/PLAN.md`, `challenge_two/task_3_prd_to_tickets/Agents.md`, `challenge_two/task_3_prd_to_tickets/PLAN.md`, and `challenge_two/task_3_prd_to_tickets/README.md`.

Commands run:

```bash
sed -n '1,220p' challenge_two/PLAN.md
sed -n '1,240p' challenge_two/task_3_prd_to_tickets/Agents.md
sed -n '1,260p' challenge_two/task_3_prd_to_tickets/PLAN.md
find challenge_two/task_3_prd_to_tickets -name 'AGENTS.md' -o -name 'Agents.override.md' -o -name 'AGENTS.override.md' -o -path '*/.codex/config.toml'
sed -n '1,220p' challenge_two/task_3_prd_to_tickets/README.md
```

No return-request feature code, database migrations, scripts, tests, or app files were changed for Task 3.

## API Script

### Script Or Partial Script

Script path: `challenge_two/task_4_api_script/low_stock_report.py`

The script uses Python standard-library modules only. It fetches `http://localhost:5050/api/items`, reads the `items` array, filters items where `stock < reorderAt`, sorts by `margin` descending, prints one line per low-stock item, and prints the total retail value as `sum(price * stock)`.

### Output Expected Or Got

Actual output:

```text
Pocket Lantern | category=gear | stock=2 | reorderAt=5 | margin=$13.50
Moonlit Marmalade | category=pantry | stock=4 | reorderAt=8 | margin=$7.25
Clockwork Pear | category=produce | stock=0 | reorderAt=6 | margin=$4.75
Total retail value of low-stock items: $106.00
```

### Assumptions

- The endpoint response shape is `{ "items": [...] }`, matching `server.py`.
- The server-provided `margin` field is the value to sort and print.
- Low stock means strictly less than the reorder point, so items with `stock == reorderAt` are not included.
- Total retail value uses current stock only, so out-of-stock items contribute `$0.00`.

### What To Improve Next

Next improvement: add friendlier error handling for connection failures, non-200 responses, and malformed payloads so the script prints a concise operational error instead of a Python traceback.

### Evidence

Files inspected: `Challenge_info.md` Part 2 API Script brief, `challenge_two/PLAN.md`, `challenge_two/task_4_api_script/Agents.md`, `challenge_two/task_4_api_script/PLAN.md`, `challenge_two/task_4_api_script/api-script-server/README.md`, and `challenge_two/task_4_api_script/api-script-server/server.py`.

Files changed: added `challenge_two/task_4_api_script/low_stock_report.py`; no server files were changed.

Commands run:

```bash
sed -n '1,220p' challenge_two/PLAN.md
sed -n '1,240p' challenge_two/task_4_api_script/Agents.md
sed -n '1,260p' challenge_two/task_4_api_script/PLAN.md
find challenge_two/task_4_api_script -name 'AGENTS.md' -o -name 'Agents.override.md' -o -name 'AGENTS.override.md' -o -path '*/.codex/config.toml'
sed -n '1,240p' challenge_two/task_4_api_script/api-script-server/README.md
nl -ba challenge_two/task_4_api_script/api-script-server/server.py | sed -n '1,260p'
python3 server.py
python3 challenge_two/task_4_api_script/low_stock_report.py
python3 -m py_compile challenge_two/task_4_api_script/low_stock_report.py
find challenge_two/task_4_api_script -name '__pycache__' -o -name '*.pyc'
rm -rf challenge_two/task_4_api_script/__pycache__
```

Notes: starting the server and running the localhost-fetching script required escalation because the sandbox blocked binding to and connecting to port 5050. The server printed `Moon Market API running on http://localhost:5050`; the script output is shown above. The temporary `__pycache__` created by `py_compile` was removed.

## Failing Tests

### Valid Tests Exposing Broken Code

1. `orders of exactly 100 dollars get free shipping` was valid. Product rule: orders with a subtotal of `$100` or more get free standard shipping. The code used `subtotal > 100`, so exactly `$100` still charged `$8`.
2. `WELCOME10 removes 10 percent from the total` was valid. Product rule: `WELCOME10` means the customer pays 10% less than the original total. The code returned `total * 0.1`, charging only 10% of the original total instead of 90%.
3. The unknown-discount rule exposed a related code risk even though the existing `NOPE` test passed. Product rule: unknown discount codes do not change the total. The code treated `FREESHIP` as a special code even though the product rules only define `WELCOME10`, so I removed that unsupported branch.

### Wrong Or Misleading Tests

1. `packed orders are packed` was wrong. Product rule: `paid` and `packed` orders are both reported as `ready`. The implementation already returned `ready` for `packed`, so the test expectation and name were misleading.
2. The original API route test setup was misleading under the local Node 19 test runner: top-level `before`/`after` hooks did not initialize `baseUrl` before the test body, so the failure was `Failed to parse URL from undefined/api/quote` rather than a product behavior failure. I moved server setup/teardown into the test body so the test exercises the route.

### Changes Made

- Updated `calculateShipping` in `parcelRules.js` to use `subtotal >= 100` for free standard shipping.
- Updated `applyDiscount` in `parcelRules.js` so `WELCOME10` returns `total * 0.9`.
- Removed the unsupported `FREESHIP` discount branch so unknown discount codes leave totals unchanged.
- Updated the packed-status test name and expectation in `parcelRules.test.js` to expect `ready`.
- Updated `server.test.js` to start the Express app inside the route test, build `baseUrl` from the listening server, and close the server in a `finally` block.

### Evidence

Files inspected: `Challenge_info.md` Part 2 Failing Tests brief, `challenge_two/PLAN.md`, `challenge_two/task_5_failing_tests/Agents.md`, `challenge_two/task_5_failing_tests/PLAN.md`, `README.md`, `package.json`, `parcelRules.js`, `parcelRules.test.js`, `server.js`, and `server.test.js`.

Files changed: `challenge_two/task_5_failing_tests/parcelRules.js`, `challenge_two/task_5_failing_tests/parcelRules.test.js`, and `challenge_two/task_5_failing_tests/server.test.js`.

Pre-edit command:

```bash
npm test
```

Pre-edit failure summary:

```text
not ok - orders of exactly 100 dollars get free shipping: actual 8, expected 0
not ok - packed orders are packed: actual "ready", expected "packed"
not ok - WELCOME10 removes 10 percent from the total: actual 8, expected 72
not ok - POST /api/quote returns subtotal, shipping, total, and status: Failed to parse URL from undefined/api/quote
```

Post-edit verification:

```bash
npm test
```

Sandboxed post-edit run: rule tests passed, but the route test could not bind an ephemeral local port (`listen EPERM: operation not permitted 0.0.0.0`). Reran `npm test` with escalation so Express could listen locally.

Escalated post-edit result:

```text
1..2
# tests 2
# pass 2
# fail 0
# duration_ms 538.818495
```

No generated test artifacts were found after the run.

## AI Use And Verification Notes

### Tools Used

Codex was used to inspect files, draft notes, write the small API consumer script, apply minimal failing-test fixes, run local commands, and keep a progress log. Local verification used shell commands, Python standard-library tooling, Node's built-in test runner, and Git diff/status checks.

### Where AI Helped

AI helped organize the five tasks in order, compare code/test behavior against the challenge rules, draft submission-ready notes, and produce small scoped code edits where implementation work was required. The most useful AI assistance was classifying Task 5 failures against the product rules and keeping Task 2/Task 3 output concrete rather than overbuilding the return-request feature.

### How The Output Was Checked

Each task section records the files inspected and commands run. Static-review findings cite concrete source lines. Documentation-only tasks were checked against the required counts and scope. The API script was run against the local server and produced actual output. The failing-tests app was run before edits and after edits; the final escalated `npm test` passed. Final repository checks were run before commit.

## Final Carry-Over Notes For Submission Template

Challenge Two was completed in one AI-assisted pass across all five technical tasks. The main deliverable is this `challenge_two/codex_notes.md` file, which contains submission-ready material and evidence for each task. Code changes were limited to the Task 4 consumer script and minimal Task 5 parcel-rule/test fixes. `Original_Files/` and `agentic-launchpad-selection-submission.md` were intentionally left untouched.
