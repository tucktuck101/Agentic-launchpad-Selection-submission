# Ticket 006: Customer Return Status

## Purpose

Let customers see the current state of their submitted return request.

## Scope

- Show return request status on the customer's order detail page.
- Display at least pending/open, approved, and declined states in customer-friendly language.
- Include the selected reason and submitted note for customer reference.
- Do not add email, Slack, refund processing, or analytics behavior in version one.

## Dependency And Order Context

Build after customer submission and support decisions so the status view can show both newly opened and reviewed requests.

## Acceptance Check

Given a customer has submitted a return request, the order detail page shows the current status and updates after support approves or declines the request.
