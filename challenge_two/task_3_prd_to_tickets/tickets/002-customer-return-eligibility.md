# Ticket 002: Customer Return Eligibility

## Purpose

Show the return request entry point only when the authenticated customer can request a return for an order.

## Scope

- Use existing app authentication to confirm the customer owns the order.
- Limit version one to domestic orders.
- Hide or disable the return action for orders that already have an open return request.
- Return eligibility state and an ineligible reason from the order detail API or equivalent existing boundary.

## Dependency And Order Context

Build after the data model so eligibility can account for existing return requests before the customer form exists.

## Acceptance Check

Given an authenticated customer viewing a domestic order they own with no open return request, the order detail response marks the order as return-eligible.
