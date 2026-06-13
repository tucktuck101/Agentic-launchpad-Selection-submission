# GitHub Actions And CI Workflows: From First Workflow To Confident Automation

## Who This Article Is For

This article is for tertiary education students who are learning how software teams automate checks, reduce repetitive work, and build safer delivery pipelines with GitHub Actions.

You do not need to be a DevOps engineer to follow it. You should be comfortable with basic Git, GitHub repositories, pull requests, and command-line tools such as `npm`, `python`, or `git`.

By the end, you should be able to:

- Explain what GitHub Actions is.
- Read a workflow YAML file without feeling lost.
- Write a basic workflow from scratch.
- Split checks into jobs.
- Understand how GitHub Actions fits into CI/CD.
- Debug failed workflow runs.
- Use permissions and secrets more safely.
- Recognize how GitHub Actions can reduce toil.
- Understand where advanced topics like GitOps, ArgoCD, and AI agents fit.

The goal is not to memorize every YAML option. The goal is to build a mental model strong enough that you can look up details confidently and know what you are trying to build.

## 1. The Problem GitHub Actions Solves

Modern software projects change constantly. Developers open pull requests, fix bugs, add features, update dependencies, change documentation, and deploy applications.

Without automation, every project relies on people remembering to run the right checks:

- Did anyone run the tests?
- Did anyone check formatting?
- Did anyone verify the app still builds?
- Did anyone check for vulnerable dependencies?
- Did anyone update the documentation?
- Did anyone deploy the same version that was tested?

Humans are good at judgment. Humans are not great at repeating the same checklist perfectly forever.

GitHub Actions helps by running automated workflows in response to repository events. For example:

- When someone opens a pull request, run linting and tests.
- When someone pushes to `main`, build the project.
- Every night, scan dependencies.
- When a release is created, publish an artifact.
- When documentation changes, check links.

A simple definition:

> GitHub Actions is GitHub's automation system. It runs workflows in response to repository events.

## 2. CI, CD, And Where GitHub Actions Fits

Two common terms are CI and CD.

CI means continuous integration. It is the practice of frequently merging code changes into a shared branch, with automated checks proving that the project still works.

Typical CI checks include:

- Linting.
- Formatting checks.
- Unit tests.
- Build checks.
- Security scans.

CD can mean continuous delivery or continuous deployment.

Continuous delivery means the software is always kept in a deployable state, but a human may still approve the release.

Continuous deployment means approved changes are automatically deployed all the way to users.

GitHub Actions can be used for both CI and CD, but a common pattern is:

- GitHub Actions handles CI: checks, tests, builds, scans, and artifact publishing.
- A deployment tool handles CD: for example, ArgoCD syncing Kubernetes environments from Git.

This split matters because CI and CD often need different permissions. CI usually needs to read code, install dependencies, run tests, and publish build artifacts. CD may need access to staging or production environments.

## 3. Core Vocabulary

Before writing workflows, learn the core building blocks.

### Workflow

A workflow is an automation file stored in `.github/workflows/`.

Example path:

```text
.github/workflows/ci.yml
```

A workflow says:

- What event starts the automation.
- What jobs should run.
- What steps each job should perform.

### Event Trigger

A trigger is the event that starts a workflow.

Common triggers include:

- `pull_request`: run when a pull request is opened, updated, or reopened.
- `push`: run when commits are pushed.
- `workflow_dispatch`: allow someone to run the workflow manually.
- `schedule`: run on a cron schedule.
- `workflow_run`: run after another workflow finishes.

### Job

A job is a named unit of work inside a workflow.

Examples:

- `markdown-lint`
- `python-check`
- `javascript-check`
- `unit-tests`
- `security-scan`
- `build-image`

Jobs usually run independently and in parallel unless you tell GitHub Actions otherwise.

### Step

A step is one command or action inside a job.

Steps run in order.

Example steps:

- Check out the code.
- Install Node.js.
- Install dependencies.
- Run tests.

### Action

An action is a reusable piece of workflow logic.

For example:

```yaml
- uses: actions/checkout@v4
```

This action checks out your repository code onto the runner.

### Runner

A runner is the machine that executes the job.

GitHub provides hosted runners such as:

- `ubuntu-latest`
- `windows-latest`
- `macos-latest`

Most beginner CI workflows use `ubuntu-latest`.

### Artifact

An artifact is a file or folder saved from a workflow run.

Artifacts can include:

- Test reports.
- Build outputs.
- Logs.
- Screenshots.
- Coverage reports.
- Packaged applications.

### Secret

A secret is a sensitive value stored in GitHub, such as an API token, deploy key, or cloud credential.

Secrets should not be printed in logs or passed to untrusted code.

### Environment

A GitHub environment represents a deployment or protected area such as:

- `dev`
- `staging`
- `production`
- `ai-repair`

Environments can require human approval before a job continues.

### Required Check

A required check is a workflow job that must pass before a pull request can be merged into a protected branch.

For example, a team may require:

- `markdown-lint`
- `unit-tests`
- `security-scan`

## 4. Anatomy Of A Workflow File

Here is a basic workflow:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  javascript-check:
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test
```

Read it from top to bottom.

`name` is the display name in GitHub Actions.

`on` defines what starts the workflow. This one runs on pull requests and pushes to `main`.

`permissions` controls what the workflow token can do. `contents: read` means the workflow can read repository contents but cannot push changes.

`jobs` defines the units of work.

`javascript-check` is the job name.

`runs-on` chooses the runner operating system.

`steps` are the commands or actions inside the job.

`uses` runs an existing action.

`run` runs a shell command.

`with` passes inputs to an action.

`env` defines environment variables for a workflow, job, or step.

`if` makes a job or step conditional.

`needs` makes one job wait for another job.

Here is a small example using all three:

```yaml
jobs:
  test:
    runs-on: ubuntu-latest
    env:
      NODE_ENV: test
    steps:
      - uses: actions/checkout@v4
      - run: npm test

  report:
    needs: test
    if: failure()
    runs-on: ubuntu-latest
    steps:
      - run: echo "The test job failed, so this report job is running."
```

In this example, `report` waits for `test`, and it only runs if something failed.

## 5. Events And Triggers

Choose triggers based on the question: "When should this automation run?"

### Pull Request

Use `pull_request` for checks that should run before merge.

```yaml
on:
  pull_request:
```

Good for:

- Linting.
- Unit tests.
- Build checks.
- Security checks.
- Documentation checks.

### Push

Use `push` when you want checks after commits land on a branch.

```yaml
on:
  push:
    branches:
      - main
```

Good for:

- Building after merge.
- Publishing artifacts.
- Updating documentation previews.

### Workflow Dispatch

Use `workflow_dispatch` for manual workflows.

```yaml
on:
  workflow_dispatch:
```

Good for:

- Manual release jobs.
- Approved repair workflows.
- One-off maintenance.
- Higher-risk automations.

### Schedule

Use `schedule` for recurring jobs.

```yaml
on:
  schedule:
    - cron: "0 8 * * 1"
```

This example runs every Monday at 08:00 UTC.

Good for:

- Weekly dependency scans.
- Link checks.
- Stale branch reports.
- Scheduled backups.

### Workflow Run

Use `workflow_run` when one workflow should react to another workflow finishing.

Good for:

- Running a follow-up triage workflow after CI fails.
- Publishing reports after test workflows complete.
- Triggering deployment only after a build workflow succeeds.

## 6. Jobs, Steps, And Execution Order

Jobs run independently by default.

This means these jobs can run at the same time:

```yaml
jobs:
  markdown-lint:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Check Markdown"

  python-check:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Check Python"
```

Steps inside one job run in order:

```yaml
steps:
  - name: Install dependencies
    run: npm ci

  - name: Run tests
    run: npm test
```

The test step runs after dependency installation.

If one job must wait for another, use `needs`:

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - run: echo "Build the app"

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - run: echo "Deploy the app"
```

Here, `deploy` waits for `build`.

## 7. A Practical First CI Workflow

For a small mixed-language repo, a good first workflow is not a giant deployment pipeline. A good first workflow is a clear quality gate.

This repo has:

- Markdown documentation.
- A Python API server.
- JavaScript/Node apps.

A practical first workflow can have three jobs:

- `markdown-check`
- `python-check`
- `javascript-check`

Example:

```yaml
name: CI

on:
  pull_request:
  push:
    branches:
      - main

permissions:
  contents: read

jobs:
  markdown-check:
    name: Markdown check
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Check Markdown files exist
        run: |
          test -f README.md
          test -f Challenge_info.md
          test -f agentic-launchpad-selection-submission.md

  python-check:
    name: Python syntax check
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Python
        uses: actions/setup-python@v5
        with:
          python-version: "3.12"

      - name: Compile Python files
        run: |
          python -m py_compile challenge_two/launchpad-api-script-server/api-script-server/server.py

  javascript-check:
    name: JavaScript syntax check
    runs-on: ubuntu-latest

    steps:
      - name: Check out code
        uses: actions/checkout@v4

      - name: Set up Node
        uses: actions/setup-node@v4
        with:
          node-version: 18

      - name: Check JavaScript syntax
        run: |
          node --check challenge_two/launchpad-code-review-app/code-review-app/server/index.js
          node --check challenge_two/failing-tests-app/server.js
          node --check challenge_two/failing-tests-app/parcelRules.js
```

This is intentionally modest. It gives useful feedback without adding many new dependencies.

Later, you could replace simple checks with stronger tools:

- Markdown linting with `markdownlint-cli2`.
- Python linting with `ruff`.
- JavaScript linting with ESLint.
- Test jobs with `npm test`.

## 8. Installing Dependencies In CI

CI runners start from a clean environment. They do not automatically have your project dependencies installed.

For Node projects, prefer:

```yaml
- name: Install dependencies
  run: npm ci
```

`npm ci` is designed for CI. It installs dependencies from `package-lock.json` and fails if the lockfile and `package.json` disagree.

For Python projects, you might use:

```yaml
- name: Install Python dependencies
  run: pip install -r requirements.txt
```

In this repo, the Python API server uses the standard library, so it does not currently need Python package installation.

Good dependency habits:

- Commit lockfiles.
- Use repeatable install commands.
- Avoid depending on tools installed only on your laptop.
- Set up runtimes explicitly.
- Keep CI setup close to documented local setup.

## 9. Debugging Failed Workflow Runs

When a workflow fails, do not panic. Read it like a stack trace.

Ask:

1. Which workflow failed?
2. Which job failed?
3. Which step failed?
4. What command was running?
5. What did the log say?
6. Can I reproduce that command locally?

GitHub Actions shows a tree:

```text
Workflow run
  Job
    Step
      Command output
```

If `javascript-check` fails, you do not need to inspect the Markdown job first. The job name points you toward the problem.

This is why separate jobs are useful. A failure in `python-check` immediately tells you the problem is in the Python check area.

## 10. Artifacts And Reports

Logs are useful, but sometimes a workflow produces files you want to keep.

Examples:

- Test reports.
- Coverage reports.
- Build outputs.
- Screenshots.
- Debug logs.
- Generated documentation.

Use `actions/upload-artifact`:

```yaml
- name: Upload test report
  uses: actions/upload-artifact@v4
  with:
    name: test-report
    path: reports/
```

Artifacts are especially useful when a job runs in CI but the result is easier to inspect as a file.

## 11. Permissions And The GitHub Token

GitHub Actions gives workflows a token called `GITHUB_TOKEN`. This token lets workflows interact with the repository.

The important question is: what should this workflow be allowed to do?

For most CI checks, read-only access is enough:

```yaml
permissions:
  contents: read
```

This is safer than giving broad write access.

Use least privilege:

- If a job only reads code, give it read access.
- If a job opens pull requests, give it pull request write access only where needed.
- If a job publishes packages, give it package permissions only where needed.
- If a job deploys, protect it with environments and approvals.

Avoid this pattern unless you truly need it:

```yaml
permissions: write-all
```

It is too broad for most workflows.

## 12. Secrets And Fork Safety

Secrets are sensitive values such as API keys, deploy tokens, or cloud credentials.

Rules of thumb:

- Do not print secrets.
- Do not pass secrets to untrusted code.
- Be careful with pull requests from forks.
- Use environment secrets for higher-risk jobs.
- Use manual approvals before jobs that use powerful secrets.

Forked pull requests are risky because the code comes from outside the repository. If a workflow runs untrusted code with secrets or write permissions, that code may try to steal secrets or modify the repository.

Safe beginner pattern:

- Run normal read-only checks on pull requests.
- Avoid secrets in pull request workflows.
- Use protected environments for deployments.

## 13. Branch Protection And Human Review

GitHub Actions is most powerful when connected to branch protection.

Branch protection can require:

- Pull request reviews.
- Passing CI checks.
- Up-to-date branches.
- Signed commits.
- Restricted pushes.

For example, a repository can require these checks before merging:

- `Markdown check`
- `Python syntax check`
- `JavaScript syntax check`

Passing CI means required commands passed. It does not mean the change is automatically correct.

Humans are still needed for:

- Product judgment.
- Security judgment.
- Architecture decisions.
- Code readability.
- Reviewing AI-generated changes.
- Deciding whether tests match intended behavior.

Automation proves repeatable facts. Humans make judgment calls.

## 14. Security And Quality Jobs

Security checks are often added as separate jobs so failures are easy to understand.

Common CI security jobs include:

- Dependency scanning: checks packages for known vulnerabilities.
- Secret scanning: finds committed tokens, passwords, or private keys.
- Static application security testing: scans code for insecure patterns.
- Container scanning: checks Docker images for vulnerable packages.
- Infrastructure-as-code scanning: checks Terraform, Kubernetes, or Dockerfile settings.
- License scanning: checks dependency licenses.
- Workflow hardening: checks permissions, pinned actions, and unsafe patterns.

Examples of tools:

- `npm audit`
- Dependabot
- CodeQL
- Semgrep
- Gitleaks
- Trivy
- Checkov

For a first project, useful early additions are:

- Dependency scanning.
- Secret scanning.
- Basic linting.
- Basic tests.

## 15. Reducing Toil With GitHub Actions

Toil is repetitive operational work that is necessary but not especially creative.

GitHub Actions can reduce toil by automating small chores.

Examples:

- Check Markdown links.
- Validate README examples.
- Draft release notes.
- Generate changelogs.
- Apply pull request labels.
- Detect stale branches.
- Validate generated files are up to date.
- Build documentation previews.
- Run scheduled dependency audits.
- Notify teams about failing checks.
- Check that required files exist.

Good toil-reduction workflows are:

- Small.
- Reliable.
- Easy to explain.
- Easy to debug.
- Safe to run automatically.

If a task is repetitive, easy to forget, and has a clear pass/fail result, it may be a good GitHub Actions candidate.

## 16. Build Once, Promote The Same Artifact

In deployment pipelines, a key best practice is:

> Build once, promote the same artifact.

An artifact is the thing you built. It might be:

- A Docker image.
- A compiled binary.
- A static website.
- A release bundle.
- A packaged application.

The risky pattern is rebuilding separately for each environment:

```text
Build for dev -> deploy dev
Build again for staging -> deploy staging
Build again for production -> deploy production
```

The better pattern is:

```text
Build once -> test artifact -> deploy same artifact to dev -> promote same artifact to staging -> promote same artifact to production
```

Why this matters:

- Dependencies can change.
- Build systems can behave differently.
- Package registries can return different versions.
- Production may not receive the exact thing tested in staging.

For Docker:

```text
Build image from commit abc123
Push ghcr.io/example/app:abc123
Deploy ghcr.io/example/app:abc123 to dev
Promote ghcr.io/example/app:abc123 to staging
Promote ghcr.io/example/app:abc123 to production
```

Use immutable identifiers such as:

- Git SHA tags.
- Docker image digests.
- Release versions.

## 17. GitHub Actions And GitOps

GitOps means Git is the source of truth for desired system state.

In a GitOps model:

- Changes are proposed through Git.
- Pull requests review those changes.
- Automation applies approved Git state.
- The history is auditable.

A common tool stack:

```text
GitHub Actions -> builds and tests
Container registry -> stores images
Git repo -> stores deployment config
ArgoCD -> syncs Kubernetes to Git state
```

A simple flow:

```text
Pull request
  -> CI checks
  -> merge
  -> build artifact
  -> update deployment config
  -> ArgoCD syncs environment
```

GitHub Actions and ArgoCD are not enemies. They often solve different parts of the delivery chain.

GitHub Actions is good at:

- Running checks.
- Building artifacts.
- Publishing images.
- Updating deployment config.

ArgoCD is good at:

- Watching Git.
- Comparing desired and actual Kubernetes state.
- Syncing environments.
- Showing deployment drift.

## 18. Maintainability: Avoiding Workflow Sprawl

As workflows grow, maintainability matters.

Good habits:

- Use clear job names.
- Keep each job focused.
- Avoid duplicating large blocks of YAML.
- Prefer one workflow with multiple related jobs when triggers are the same.
- Split workflows when triggers or purposes are different.
- Document what workflows do.
- Avoid overengineering early.
- Pin important runtimes and actions where appropriate.
- Use caching carefully to speed up workflows without hiding broken dependency setup.

One workflow with jobs like this is often a good start:

```text
ci.yml
  markdown-check
  python-check
  javascript-check
  tests
```

Separate workflows make sense when behavior diverges:

```text
ci.yml          -> pull request checks
security.yml    -> scheduled security scans
release.yml     -> release publishing
deploy.yml      -> deployment
```

Advanced maintainability tools include:

- Reusable workflows.
- Composite actions.
- Shared scripts.
- Organization workflow templates.

### Caching

Caching can make workflows faster by reusing downloaded dependencies.

For Node projects, `actions/setup-node` can cache npm dependencies:

```yaml
- name: Set up Node
  uses: actions/setup-node@v4
  with:
    node-version: 18
    cache: npm
    cache-dependency-path: challenge_two/failing-tests-app/package-lock.json
```

Use caching for speed, not correctness. A workflow should still be able to run correctly from a clean environment.

### Pinning

Many examples use version tags such as `actions/checkout@v4`. This is common and readable. Higher-security environments may pin third-party actions to a full commit SHA so the exact code being run cannot change unexpectedly.

The principle is:

- Pin runtimes such as Node or Python versions.
- Prefer well-known official actions for common setup.
- Be more cautious with third-party actions.
- Review what a third-party action does before trusting it with secrets or write permissions.

## 19. AI Integrations In CI

AI agents can help CI, but they should not replace CI.

Useful AI-assisted patterns:

- Summarize pull requests.
- Explain failed tests.
- Summarize CI logs.
- Draft release notes.
- Suggest documentation updates.
- Explain security scan results.
- Propose fix branches for failing tests.

The key principle:

> AI can propose and explain, but deterministic checks and human review decide what is accepted.

AI output should usually be advisory or review-gated.

Be careful with:

- Secrets.
- Write permissions.
- Pull requests from forks.
- Running untrusted code.
- Letting an AI weaken tests to make them pass.

## 20. Advanced Example: AI-Assisted Test Repair

An AI test repair workflow is advanced because it combines:

- Failed test logs.
- Artifacts.
- Pull request context.
- Permissions.
- Secrets.
- Human approval gates.
- AI-generated code changes.

A safer high-level flow:

```text
Normal CI runs tests
  -> Tests fail
  -> Logs are collected
  -> Preflight checks PR trust level
  -> Untrusted PRs get diagnosis-only mode
  -> Human approves AI repair attempt
  -> Trusted automation runs the agent
  -> Agent produces a patch
  -> Tests verify the patch
  -> Write-capable job opens a fix PR
  -> Human reviews before merge
```

Important safety choices:

- Do not run PR-controlled scripts with write tokens.
- Keep AI secrets away from untrusted code.
- Use read-only diagnosis for unsafe contexts.
- Have the agent produce a patch, not merge directly.
- Require tests to pass.
- Require human review.

The reason is simple: tests can prove that known checks passed, but humans decide whether the change is the right change.

## 21. Hands-On Exercises

Use these exercises to turn the concepts into skill.

### Exercise 1: Create A Pull Request Workflow

Create `.github/workflows/ci.yml` and make it run on pull requests.

Goal:

- You can explain what starts the workflow.

### Exercise 2: Add A Markdown Job

Add a job that checks important Markdown files exist.

Goal:

- You can create a job with steps.

### Exercise 3: Add A Python Job

Add a job that runs:

```bash
python -m py_compile challenge_two/launchpad-api-script-server/api-script-server/server.py
```

Goal:

- You can set up a runtime and run a command.

### Exercise 4: Add A JavaScript Job

Add a job that runs `node --check` against JavaScript files.

Goal:

- You can create language-specific checks.

### Exercise 5: Use `needs`

Create a job that waits for another job.

Goal:

- You understand job dependencies.

### Exercise 6: Upload An Artifact

Create a small log file and upload it.

Goal:

- You understand how artifacts help debugging.

### Exercise 7: Add Least-Privilege Permissions

Add:

```yaml
permissions:
  contents: read
```

Goal:

- You understand safe defaults.

### Exercise 8: Add A Manual Workflow

Create a workflow using:

```yaml
on:
  workflow_dispatch:
```

Goal:

- You understand manual operations.

### Exercise 9: Debug A Failure

Intentionally make one check fail and read the logs.

Goal:

- You can identify the failed job, failed step, and failed command.

### Exercise 10: Design A Future Enhancement

Sketch one of these:

- A secret scan.
- A Markdown link check.
- A dependency audit.
- A release note generator.
- An AI failure summary.

Goal:

- You can connect GitHub Actions to practical automation ideas.

## 22. Confidence Checklist

You are ready to write basic GitHub Actions workflows independently when you can answer:

- What is GitHub Actions?
- What is a workflow?
- What is a job?
- What is a step?
- What is an action?
- What is a runner?
- Where do workflow files live?
- What starts a workflow?
- What is `actions/checkout` used for?
- Why do CI jobs install dependencies?
- How do jobs run in parallel?
- How does `needs` change job order?
- What happens when a job fails?
- How do artifacts help debugging?
- What is `GITHUB_TOKEN`?
- Why should workflows use least privilege?
- What are secrets?
- Why are forked pull requests risky?
- What is branch protection?
- What is a required check?
- When should a human approval gate be used?
- What security checks can run in CI?
- How can GitHub Actions reduce toil?
- What does "build once, promote the same artifact" mean?
- How does GitHub Actions relate to ArgoCD?
- How can AI agents help CI?
- Why should AI-generated fixes still require human review?

## 23. Final Mental Model

If you remember one model, remember this:

```text
Event starts workflow
  -> Workflow runs jobs
  -> Jobs run steps
  -> Steps run actions or commands
  -> Results become checks, logs, artifacts, or deployments
```

Good GitHub Actions workflows are:

- Clear.
- Small enough to debug.
- Automated where automation is reliable.
- Human-gated where judgment matters.
- Designed with least privilege.
- Improved gradually.

Start with a simple CI workflow. Add jobs as the project needs them. Keep the workflow readable. Protect important branches. Use automation to reduce repetitive work. Treat advanced tools, including AI agents, as helpers that support human decision-making rather than replacing it.
