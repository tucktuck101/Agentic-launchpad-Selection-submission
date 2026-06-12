# Challenge One Codex Notes

Challenge one topic: GitHub Actions

## Q&A Log

### Question

ok, so my goal for the first challenge is to set up a basic GIthub action. what I am thinking could be a good one is a Lint check over the files. what do you think?

### Response

A lint check is a strong first GitHub Action because it is simple, useful, and shows an automated quality gate. For this repo, a lightweight quality check can cover JavaScript syntax with `node --check`, Python syntax with `python -m py_compile`, and Markdown linting if we add a Markdown linter. Since the existing Node apps did not start with lint scripts, starting with focused syntax/lint jobs is a clean first step.

### Question

ok I'm thinking we should break up the Lint checks into Multiple actions where it targets a specific thing, such as one that focuses on Markdown, one that focuses on python etc. whats your thoughts?

### Response

Breaking the checks up by target is a good idea, but it is better to start with separate jobs inside one workflow rather than separate workflow files. A single workflow can have jobs such as `markdown-lint`, `python-lint`, and `javascript-lint`, which gives clear pass/fail signals without duplicating too much YAML. Later, the checks can be split into separate workflows if they need different triggers.

### Question

ok. if we wanted github actions to later run the tests, would you put that in a seperate workflow or would you instead have a singular one that then runs one or more tests as a job?

### Response

Tests should go in the same workflow at first, as one or more separate jobs. A good structure would be a broader `ci.yml` workflow with jobs for Markdown linting, Python linting, JavaScript linting, and Node tests. Separate workflows make sense later if linting, tests, deploys, or scheduled checks need different triggers.

### Question

how would you describe what a job is?

### Response

A job is a named chunk of work inside a GitHub Actions workflow. Each job runs in its own environment and contains the steps needed to complete a task, such as checking out the code, installing dependencies, and running a Markdown lint, Python check, JavaScript check, or test command. Jobs can run independently, fail independently, and run in parallel by default unless configured with dependencies.
