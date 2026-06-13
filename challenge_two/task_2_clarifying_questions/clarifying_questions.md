# Task 2 Clarifying Questions

## Feature Brief

Build a feature that lets customers request a return for an order and lets support staff review it.

## Clarifying Questions

1. Which orders are eligible for return requests, and what rules decide eligibility, such as delivery status, purchase age, product type, domestic/international shipping, or previous return status?
2. What return-request statuses are required, and what transitions are allowed for customers and support staff?
3. What information must a customer provide when requesting a return: reason list, short note, item selection, quantity, photos, packaging state, or preferred resolution?
4. Can customers request a partial return for selected items, or is version one limited to returning the whole order?
5. What should support staff see in the review queue, and how should it be sorted or filtered?
6. What actions can support staff take besides approve or decline, such as adding internal notes, requesting more information, or changing the reason?
7. How should customers see the current request status after submission, and should they receive any confirmation or notification outside the app?

## Top Two Questions To Ask First

1. **Which orders are eligible for return requests?** This determines the data model, validation rules, customer entry point, and whether the feature can safely prevent invalid requests before support has to review them.

2. **What statuses and transitions are required?** The customer flow and support review flow both depend on a shared state model. If the team gets this wrong, later fixes can require database changes, UI changes, and migration of already-submitted requests.

## Assumptions If We Had To Start Today

1. Version one supports domestic orders only and only one open return request per order.
2. Customers can submit a return request only from an authenticated account that owns the eligible order.
3. The first request form captures a predefined reason plus a short plain-text note; support can approve or decline and optionally add an internal note.

## Smallest Useful First Version

Build a domestic-only return request flow for eligible delivered orders:

- Customer opens an eligible order, chooses one reason, adds a short note, and submits a request.
- Support staff sees open requests ordered by newest first.
- Support staff approves or declines the request.
- Customer sees the request status on the order page.

## Main Risk If Assumptions Are Wrong

The largest risk is building the wrong eligibility and state model. If returns need item-level handling, international orders, multiple requests per order, refund integration, or more support states, a whole-order domestic-only model may need substantial rework.

## Evidence

Source files inspected:

- `Challenge_info.md`
- `AGENTS.md`
- `challenge_two/PLAN.md`
- `challenge_two/task_2_clarifying_questions/PLAN.md`
- `challenge_two/task_2_clarifying_questions/Agents.md`
- `challenge_two/task_2_clarifying_questions/README.md`

Commands run:

- `sed -n '100,122p' Challenge_info.md`
- `sed -n '1,260p' challenge_two/PLAN.md`
- `sed -n '1,220p' challenge_two/task_2_clarifying_questions/PLAN.md`
- `sed -n '1,220p' challenge_two/task_2_clarifying_questions/Agents.md`
- `find challenge_two/task_2_clarifying_questions -maxdepth 2 -type f -print`
- `nl -ba challenge_two/task_2_clarifying_questions/README.md`

Verification:

- Documentation-only task. No app code or implementation tickets were created for this task.
