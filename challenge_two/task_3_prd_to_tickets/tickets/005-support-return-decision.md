# Ticket 005: Support Return Decision

## Purpose

Let support staff approve or decline an open return request.

## Scope

- Add support actions to approve or decline an open request.
- Update the request status to `approved` or `declined`.
- Record the decision timestamp.
- Optionally capture a short support note if the existing support UI has a suitable pattern.
- Prevent decisions on requests that are already approved or declined.

## Dependency And Order Context

Build after the support queue because staff need a request detail or queue action from which to make the decision.

## Acceptance Check

Given an open return request, when support approves it, the request status changes to `approved` and it no longer appears in the open request queue.
