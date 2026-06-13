# Agents.md

These instructions apply to the Challenge Two code review app.

## Purpose

- Review the small Express/React ecommerce support app.
- Do not fix the app unless the user explicitly asks for fixes.
- Focus on what the app does, bugs, risks, design concerns, and useful next context.

## Review Workflow

- Inspect both server and client code before writing findings.
- Prioritize behavioral bugs and user-facing risks over style comments.
- Use file and line references for concrete findings when possible.
- Lead with at least three bugs, risks, or design concerns.
- Include the first change you would make and why.
- Include what you would leave alone for now.
- Include extra information that would help the review.
- Write the full reviewer-facing review in `code-review-notes.md` in this task folder.
- Optionally update `../codex_notes.md` only as a brief cross-task index or pointer.

## Review Focus

- Order filtering and status handling.
- Marking orders as contacted.
- Adding and preserving internal notes.
- Data persistence, validation, and error handling.
- Support-team workflow clarity.
- Security or privacy risks around order/customer data.

## Boundaries

- Avoid broad refactors.
- Do not fix app code unless the user explicitly asks for fixes.
- Do not install new dependencies just to perform the review.
- Do not modify `node_modules/`, build output, or generated files.
