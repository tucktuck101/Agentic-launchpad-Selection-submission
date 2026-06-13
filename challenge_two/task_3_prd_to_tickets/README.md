# Task 3 PRD To Tickets

## Source PRD Summary

Customers need to request a return for an eligible domestic order. Support staff need to see open return requests by date, review the reason, and approve or decline each request. Customers need to see the current request status. Version one excludes rich text, email or Slack notifications, refund payment processing, analytics dashboards, and international orders.

## Ticket Index

1. [`001-return-request-data-model.md`](tickets/001-return-request-data-model.md) - Add return request data model and status values.
2. [`002-customer-return-eligibility.md`](tickets/002-customer-return-eligibility.md) - Expose return eligibility for customer orders.
3. [`003-customer-return-request-form.md`](tickets/003-customer-return-request-form.md) - Let customers submit a reason and short note.
4. [`004-support-open-requests-queue.md`](tickets/004-support-open-requests-queue.md) - Show support staff open requests ordered by date.
5. [`005-support-return-decision.md`](tickets/005-support-return-decision.md) - Let support approve or decline a request.
6. [`006-customer-return-status.md`](tickets/006-customer-return-status.md) - Show customers the current request status.

## Build Order Reasoning

The build starts with data and status because every other workflow depends on a shared return-request record. Eligibility comes next so customers only see the action on supported domestic orders. The customer request form creates real requests for support to review. The support queue and decision action follow so staff can process open work. Customer status visibility comes last because it depends on request creation and support decisions.

## Highest-Risk Ticket

The highest-risk ticket is [`001-return-request-data-model.md`](tickets/001-return-request-data-model.md). The data model and status transitions shape eligibility, customer visibility, support review, and future refund or notification integrations. A wrong model could force migration or rework across every later ticket.

## Version-One Exclusions

I would leave refund payment processing out of version one. The PRD explicitly names it as a non-goal, and approval or decline can be valuable before money movement is automated.

Other excluded v1 behavior from the PRD:

- Rich text editor.
- Email or Slack notifications.
- Analytics dashboard.
- International return support.

## Remaining Clarifying Question

What exact order eligibility rules should version one enforce, including delivery state, return window, product exclusions, and whether partial item returns are allowed?

## Evidence

Source files inspected:

- `Challenge_info.md`
- `AGENTS.md`
- `challenge_two/PLAN.md`
- `challenge_two/task_3_prd_to_tickets/PLAN.md`
- `challenge_two/task_3_prd_to_tickets/Agents.md`
- `challenge_two/task_3_prd_to_tickets/README.md`

Commands run:

- `sed -n '123,168p' Challenge_info.md`
- `sed -n '1,260p' challenge_two/PLAN.md`
- `sed -n '1,240p' challenge_two/task_3_prd_to_tickets/PLAN.md`
- `sed -n '1,240p' challenge_two/task_3_prd_to_tickets/Agents.md`
- `find challenge_two/task_3_prd_to_tickets -maxdepth 3 -type f -print`
- `nl -ba challenge_two/task_3_prd_to_tickets/README.md`

Verification:

- Documentation-only task. No feature, app code, or database files were changed.
