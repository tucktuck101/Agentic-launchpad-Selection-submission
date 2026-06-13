# Ticket 004: Support Open Requests Queue

## Purpose

Give support staff a simple dated queue of return requests to review.

## Scope

- Add a support-only view or endpoint for open return requests.
- Show request date, order identifier, customer identifier or name, reason, and short customer note.
- Sort open requests by request date, newest first unless the product owner chooses oldest first.
- Use existing app authentication and support authorization.

## Dependency And Order Context

Build after customers can create requests so the queue can be verified with real open records.

## Acceptance Check

Given multiple open return requests, support staff can see them in a list ordered by request date with the reason and customer note visible.
