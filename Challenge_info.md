# Agentic Launchpad Selection Submission

## Overview

### Big Picture

### What We Are Looking For
This challenge helps us prepare for your interview. It gives us concrete work to discuss together, and gives you a way to show how you learn and approach coding.

There is no single correct answer. We are not looking for a polished finished product or one hidden solution.

A strong submission explains your decisions. Tell us what you tried, what changed your plan, what you checked, where you got blocked, and what you would do next.

Your story matters as much as the work product. We are interested in how you approached these challenges, not just what you produced.

## How This Works

Use the Markdown submission template in `agentic-launchpad-selection-submission.md` and fill it in as you work.

The timers are guidelines only. Spend as much or as little time as you like, just note the time you spent in your submission.

We care more about your approach than the outcome. There are no bonus points for doing lots quickly.

## Start Here

Use the template in `agentic-launchpad-selection-submission.md`, save it somewhere you can find it, and add notes as you complete each part. Explain what you did and why you chose it rather than aiming only to finish.

## You May Use

- Documentation and tutorials
- Search
- AI tools
- Your editor and terminal
- Your own notes

## Part 1: Learning

### Part 1: Learning Challenge

#### This Is About Learning
Spend 60 minutes learning one unfamiliar technology. You decide how practical to get: reading, sketching, trying commands, writing code, or building a tiny demo are all valid.

Finishing is not required. Aim for around 60 minutes. You are welcome to keep exploring if you are interested, but extra time will not earn extra points. Tell us how much time you actually spent.

#### Your Task

- Choose one technology you have not used much before.
- Write a small goal for what you will try to understand or build.
- Spend 60 minutes learning. It is your call how practical to get during that time.
- Keep notes as you go, especially when something is confusing or changes your plan.
- Submit the story of your learning process in the Markdown template.

#### Choose One Technology

- Supabase Edge Function
- Cloudflare Worker
- SQL report function
- GitHub Action
- Webhook receiver
- Vercel serverless function

#### Example Small Goals

- Supabase Edge Function: receive an order JSON payload and return a transformed response.
- Cloudflare Worker: create a tiny endpoint that returns JSON.
- SQL report function: return a customer's order count and latest order date from sample rows.
- GitHub Action: run on push and print a status message.
- Webhook receiver: accept a POST request and return part of the payload.

## Part 2: Technical

### Part 2: Technical Work Sample

#### How To Approach This
Spend around 60 minutes total. The time is a guide, not a hard stop.

You are welcome to use AI or work by hand. If you work mostly by hand, choose at least 3 tasks.

If you use AI extensively, attempt all technical tasks. It is fine if you do not complete them all in the time.

### Code Review

#### Task
Review the small Express/React ecommerce app in `launchpad-code-review-app/` and spend around 20 to 30 minutes reviewing it. You do not need to fix the app.

#### Context
The app lets a support team review ecommerce orders, filter by status, mark orders as contacted, and add an internal note.

#### Submit

- What the app does.
- At least three bugs, risks, or design concerns.
- The first change you would make and why.
- What you would leave alone for now.
- Extra information that would help your review.

### Clarifying Questions

Read a short feature brief, then write the questions and assumptions you would use before starting.

#### Feature Brief
You are joining a project. The product owner has only written this so far:

Build a feature that lets customers request a return for an order and lets support staff review it.

Your job is not to build the feature yet. Your job is to identify what the team needs to know before building.

#### Your Task

- Write 5 to 8 clarifying questions.
- Pick the 2 questions that matter most before coding.
- Write 3 assumptions you would make if you had to start today.
- Name one simple first version of the feature.

#### Submit

- Your questions.
- The two questions you would ask first, with reasons.
- Your assumptions if you had to start now.
- The smallest useful version you would build first.
- The main risk if your assumptions are wrong.

### PRD To Tickets

Read the supplied PRD, then break it into ordered implementation tickets with acceptance checks.

#### PRD: Customer Return Requests

Customers need to request a return for an order. Support staff need a simple way to see open return requests, review the reason, and mark each request as approved or declined.

#### Goals

- Customers can request a return from an eligible order.
- Customers can choose a return reason and add a short note.
- Support staff can see open return requests by date.
- Support staff can approve or decline a request.
- Customers can see the current status of their request.

#### Non-Goals For Version One

- No rich text editor.
- No email or Slack notifications.
- No refund payment processing.
- No analytics dashboard.

#### Constraints

- Use the existing app authentication.
- Use the existing database.
- Build a small version first.
- The first version should support domestic orders only.

#### Your Task

- Write 4 to 8 implementation tickets.
- Put them in the order you would build them.
- Add one acceptance check per ticket.
- Name the highest-risk ticket and explain why.
- Name one thing you would leave out of version one.

#### Submit

- Your ticket list.
- Your build order reasoning.
- The highest-risk ticket.
- One thing you would leave out and why.
- One clarifying question you would still ask.

### API Script

#### Task
Run the tiny Python API server in `launchpad-api-script-server/` locally, then write a script that consumes its endpoint.

#### Run The Server

```bash
docker build -t moon-market-api .
docker run --rm -p 5050:5050 moon-market-api
```

Or run it without Docker:

```bash
python3 server.py
```

#### Endpoint

`http://localhost:5050/api/items`

#### Your Script

- Fetch the endpoint.
- Find items where stock is less than reorderAt.
- Sort them by highest margin first.
- Print one line per item with name, category, stock, reorder point, and margin.
- Print the total retail value of the low-stock items: sum of price * current stock.

#### Submit

- Your script or partial script.
- The output you expected or got.
- Any assumptions you made.
- What you would improve next.

### Failing Tests

#### Task
Work through the Express parcel-quote app in `launchpad-failing-tests-app/`, run `npm test`, and work out which failures are code bugs and which tests are themselves wrong.

#### Run It

```bash
npm install
npm test
```

#### What Is Included

- An Express app for ecommerce parcel quotes.
- 10 test cases across business rules and one API route.
- A mix of application bugs and incorrect tests.

#### Product Rules

- Standard New Zealand shipping is `$8`.
- Orders with a subtotal of `$100` or more get free standard shipping.
- Orders with 5 or more items add a `$5` handling fee.
- International orders add `$20`.
- `paid` and `packed` orders are both reported as `ready`.
- `WELCOME10` means the customer pays 10% less than the original total.
- Unknown discount codes do not change the total.

#### Submit

- Which tests were valid and exposed broken code.
- Which tests were wrong or misleading.
- What changes you made.
