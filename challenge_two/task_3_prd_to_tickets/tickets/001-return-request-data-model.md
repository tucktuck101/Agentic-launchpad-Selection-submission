# Ticket 001: Return Request Data Model

## Purpose

Create the persistent return request record that customer, support, and status views can share.

## Scope

- Add a return request entity/table using the existing database.
- Link each return request to an existing order and customer.
- Store status, reason, customer note, support decision note if available, created timestamp, and updated timestamp.
- Support initial statuses needed for version one: `open`, `approved`, and `declined`.
- Enforce one open return request per order for version one.

## Dependency And Order Context

Build this first because eligibility, customer submission, support review, and customer status all need the same source of truth.

## Acceptance Check

Given an eligible order, the system can persist one open return request with reason, customer note, order ID, customer ID, status `open`, and timestamps.
