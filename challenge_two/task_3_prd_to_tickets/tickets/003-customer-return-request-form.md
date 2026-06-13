# Ticket 003: Customer Return Request Form

## Purpose

Let customers submit a return request from an eligible order.

## Scope

- Add a return request action to eligible order details.
- Provide a predefined return reason list.
- Provide a short plain-text customer note field.
- Validate required reason, note length, ownership, domestic order support, and duplicate open requests.
- Create the return request with status `open`.

## Dependency And Order Context

Build after eligibility so the form appears only for supported orders and after the data model so submissions can be persisted.

## Acceptance Check

Given an eligible domestic order, when the customer selects a reason, enters a short note, and submits, an open return request is created for that order.
