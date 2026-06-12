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

### Question

how do DevOps engineers normally document the design or "Current state" of CI/CD pipelines?

### Response

DevOps engineers usually document CI/CD pipelines in a short architecture or runbook-style document. The goal is to make the current automation understandable without requiring someone to reverse-engineer every workflow file.

Common sections include:

- Purpose: what the pipeline is meant to protect or automate.
- Triggers: when it runs, such as push, pull request, schedule, release, or manual dispatch.
- Workflow layout: which workflow files exist and what each one does.
- Jobs: the major units of work, such as linting, testing, building, security scanning, packaging, or deployment.
- Dependencies: required runtimes, package managers, secrets, tokens, containers, or external services.
- Environments: where code is deployed, such as dev, staging, or production.
- Gates: required checks, approvals, branch protections, or manual review points.
- Artifacts: build outputs, test reports, coverage reports, container images, or logs.
- Failure handling: common failure causes and where to look first when debugging.
- Ownership: who maintains the pipeline and who should be contacted when it breaks.

For this challenge, a good current-state note could describe the planned GitHub Actions workflow as a CI pipeline with separate jobs for Markdown checks, Python checks, JavaScript checks, and later tests.

### Question

when it comes to Cybersecurity, what are some example jobs people may run /methods people use to make sure that a project is secure?

### Response

Security checks in CI/CD are often grouped into separate jobs so each type of risk is easy to see and debug. Common examples include:

- Dependency scanning: checks third-party packages for known vulnerabilities. Examples include `npm audit`, Dependabot, GitHub dependency review, Snyk, or OWASP Dependency-Check.
- Secret scanning: looks for accidentally committed API keys, tokens, passwords, or private keys. Examples include GitHub secret scanning, Gitleaks, or TruffleHog.
- Static application security testing: scans source code for insecure patterns without running the app. Examples include CodeQL, Semgrep, SonarQube, or Bandit for Python.
- Container image scanning: checks Docker images for vulnerable operating system packages or unsafe image layers. Examples include Trivy, Grype, Docker Scout, or Anchore.
- Infrastructure-as-code scanning: checks Terraform, Kubernetes YAML, Dockerfiles, and cloud configs for risky settings. Examples include Checkov, tfsec, Terrascan, or Trivy config scanning.
- License compliance scanning: checks whether dependencies use licenses that are allowed by the project or company.
- Dynamic application security testing: runs security tests against a live app or test environment. Examples include OWASP ZAP baseline scans or authenticated web app scans.
- Permissions and workflow hardening: checks whether CI jobs use least-privilege tokens, pinned actions, protected environments, and required approvals.

For this challenge, the most realistic first security job would be dependency scanning or secret scanning because those are useful, easy to explain, and fit naturally into GitHub Actions.

### Question

so i know a common toolstack for CI/CD pipelines is Github actions and ArgoCD. what i want to know is when it comes to building CI/CD piplelines, whats considered a good baseline or best practice?

### Response

A good CI/CD baseline is usually built around one idea: every change should be validated automatically before it reaches users, and deployments should be repeatable, visible, and reversible.

For a GitHub Actions plus ArgoCD setup, a common best-practice split is:

- GitHub Actions handles CI: linting, testing, security checks, building artifacts, and publishing images.
- ArgoCD handles CD: watching Git for deployment manifests and syncing the desired state into Kubernetes.

Good baseline practices include:

- Run checks on pull requests: lint, tests, builds, and security checks should run before code is merged.
- Keep jobs separated by responsibility: examples include `markdown-lint`, `python-lint`, `javascript-lint`, `unit-tests`, `security-scan`, and `build-image`.
- Use branch protection: require important checks to pass before merging to the default branch.
- Build once, promote the same artifact: avoid rebuilding different artifacts for staging and production. Build an image once, tag it clearly, and promote that image through environments.
- Use Git as the source of truth: especially with ArgoCD, deployment state should come from version-controlled manifests or Helm/Kustomize config.
- Keep CI and CD credentials separate: CI may publish artifacts, while CD should have only the access needed to deploy.
- Use least-privilege permissions: GitHub Actions workflows should set narrow `permissions`, and secrets should be limited to jobs that need them.
- Pin important dependencies: pin action versions and runtime versions where practical so the pipeline is repeatable.
- Cache dependencies carefully: use caching to speed up builds, but avoid caching secrets or untrusted outputs.
- Add security checks early: dependency scanning, secret scanning, static code scanning, and container scanning are common baseline jobs.
- Make failures easy to debug: use clear job names, focused steps, readable logs, and uploaded reports when useful.
- Separate environments: use dev, staging, and production environments with different approvals or gates.
- Require production approval: production deployments often need a manual approval, protected environment, or release process.
- Support rollback: the team should know how to revert a deployment by rolling back Git state, image tags, or ArgoCD application history.
- Keep pipelines fast: the required PR checks should be useful but not painfully slow. Longer scans can run on schedule or before release.
- Document the current state: explain what workflows exist, what triggers them, what each job does, what secrets are required, and how to debug failures.

For this challenge repo, a strong baseline would start with a `ci.yml` workflow that runs separate jobs for Markdown checks, Python checks, JavaScript checks, and eventually tests/security scans. If the project later had a deployable Kubernetes app, ArgoCD would be introduced after CI builds and publishes a deployable artifact.

### Question

can you elaborate on "build once, Promote the same artifact" and how that applies to github workflows/actions?

### Response

"Build once, promote the same artifact" means the pipeline should create one deployable output and move that exact output through each environment instead of rebuilding it separately for dev, staging, and production.

An artifact can be:

- A Docker image.
- A packaged application file.
- A compiled binary.
- A static site build.
- A release bundle.

The reason this matters is that rebuilding for each environment can accidentally produce different outputs. A dependency version may change, a build script may behave differently, or a package registry may return something different. If staging tested one build but production receives a different build, the staging result is less trustworthy.

In GitHub Actions, a good pattern is:

- A CI workflow runs on pull requests and checks code quality.
- After merge to `main`, a build job creates the artifact once.
- The workflow tags or identifies that artifact clearly, often with the Git SHA.
- The workflow publishes it somewhere durable, such as GitHub Releases, GitHub Actions artifacts, GitHub Packages, or a container registry.
- Later deployment jobs or workflows deploy that same artifact to dev, staging, and production.

For Docker-based apps, this often looks like:

- Build image from commit `abc123`.
- Push image as `ghcr.io/org/app:abc123`.
- Optionally also tag it as `dev`, `staging`, or `prod`, but keep the immutable SHA tag as the real identity.
- Deploy `ghcr.io/org/app:abc123` to dev.
- Promote that exact image tag or digest to staging.
- Promote that exact image tag or digest to production.

In GitHub Actions, this can be modeled with separate jobs:

- `build`: checks out code, builds the artifact, and publishes it.
- `deploy-dev`: deploys the built artifact to dev.
- `deploy-staging`: deploys the same artifact after dev passes.
- `deploy-production`: deploys the same artifact after approval.

The jobs should pass around the artifact identity, such as an image tag, image digest, release version, or uploaded artifact name. They should not each rebuild from source.

With ArgoCD, GitHub Actions often builds and publishes the Docker image, then updates a deployment manifest or Helm values file with the image tag or digest. ArgoCD then sees that Git change and syncs the environment. Promotion means updating the next environment's manifest to point to the already-built image.

For this challenge repo, we probably do not need artifact promotion yet because the first workflow is focused on linting and checks. But if the project later adds deployment, GitHub Actions should build once, store the artifact identity, and have later jobs or workflows promote that same output instead of rebuilding it.

### Question

what are some ways that github actions could be used to help with administration or documentation that people dont typically think about?

### Response

GitHub Actions is often treated as a build/test/deploy tool, but it can also automate a lot of repository administration and documentation work. Good examples include:

- Documentation freshness checks: fail a pull request when code changes but related docs are not updated.
- Auto-generating documentation: build API docs, CLI docs, architecture diagrams, dependency lists, or configuration references from source files.
- Link checking: scan Markdown files for broken internal links, broken external links, missing anchors, or stale references.
- Table of contents updates: regenerate Markdown tables of contents automatically when docs change.
- Changelog generation: create or validate changelog entries from pull request labels, commit messages, or release notes.
- Release note drafting: collect merged pull requests since the last release and draft a release summary.
- Issue and pull request labeling: apply labels based on changed files, branch names, title patterns, or templates.
- Stale issue management: flag old issues or pull requests that need attention, while being careful not to close important work too aggressively.
- CODEOWNERS validation: check that changed areas have owners and that CODEOWNERS syntax is valid.
- Repository health checks: verify required files exist, such as `README.md`, `LICENSE`, `SECURITY.md`, `CONTRIBUTING.md`, or issue templates.
- Policy checks: enforce pull request title format, branch naming rules, signed commits, conventional commits, or required checklist items.
- Dependency inventory: periodically generate a list of dependencies, licenses, package versions, or outdated packages.
- Architecture decision record checks: require an ADR when certain high-impact files or infrastructure directories change.
- Screenshot or diagram updates: regenerate screenshots, Mermaid diagrams, OpenAPI docs, or static docs previews.
- Documentation preview deployments: publish a temporary docs preview for each pull request.
- Contributor onboarding checks: verify setup scripts, sample env files, and local development instructions still work.
- Workflow documentation: generate a summary of existing GitHub Actions workflows, triggers, jobs, and required secrets.
- Secret and environment inventory reminders: document which secrets are expected without exposing secret values.
- Scheduled audits: run weekly checks for stale dependencies, inactive workflows, unused labels, or missing branch protection assumptions.

For this challenge, a practical administration/documentation use of GitHub Actions could be a Markdown documentation check job. It could validate links, check formatting, and make sure key files like `README.md`, `Challenge_info.md`, and `agentic-launchpad-selection-submission.md` stay readable.

### Question

what are some other ways that github actions can be used to automate "mundane" tasks?

### Response

GitHub Actions is useful for automating repetitive maintenance work that people often forget, delay, or do inconsistently. Examples include:

- Formatting checks: run Prettier, Black, Ruff, or other formatters to confirm files follow the project style.
- Auto-format pull requests: commit formatting fixes back to a branch when safe to do so.
- Dependency update checks: regularly check for outdated packages and open issues or pull requests.
- Lockfile validation: make sure `package-lock.json`, `poetry.lock`, or similar files are updated when dependencies change.
- Version bumping: update package versions, changelogs, or release metadata after a release is approved.
- File generation: regenerate docs, schemas, API clients, type definitions, or configuration files.
- Template validation: make sure issue templates, pull request templates, and required checklist items are present.
- Pull request summaries: post a generated summary of changed files, test results, or deployment impact.
- Label cleanup: remove unused labels, sync label colors/descriptions, or apply labels based on file paths.
- Assignment reminders: notify reviewers when a pull request has been waiting too long.
- Stale branch detection: report branches that have not been updated in a long time.
- Scheduled backups: export issues, release metadata, package lists, or repository settings to a file or external storage.
- Environment drift checks: compare expected configuration against what is actually deployed or configured.
- License header checks: confirm source files include required notices.
- Generated asset checks: verify generated files are committed and up to date.
- README validation: run example commands from the README to ensure setup instructions still work.
- Broken link checks: scan documentation for dead links on a schedule.
- Spell checking: run a documentation spell checker against Markdown files.
- Size checks: warn when images, bundles, dependencies, or generated files get too large.
- Cleanup previews: delete old preview environments after pull requests close.
- Metrics collection: publish basic repository stats, test duration trends, or dependency counts.
- Notifications: send Slack, Teams, or email messages when important workflow events happen.

The best mundane automations are small, reliable, and easy to explain. A good rule is: if a task is repetitive, easy to forget, and has a clear pass/fail outcome, it is probably a good GitHub Actions candidate.

For this challenge, useful mundane tasks could include Markdown link checking, README validation, dependency audit checks, or a workflow that confirms required project files still exist.

### Question

how are AI agents being used in CI/github actions?

### Response

AI agents are increasingly being used in CI and GitHub Actions as helpers around review, diagnosis, documentation, and maintenance. They are usually most useful when they summarize context, explain failures, or propose changes, while the pipeline still uses deterministic checks for final pass/fail decisions.

Common uses include:

- Pull request summaries: read the diff and post a plain-English summary of what changed, why it matters, and which files are affected.
- Review assistance: flag risky changes, missing tests, confusing logic, or possible regressions before a human reviewer spends time on the pull request.
- CI failure triage: inspect failed job logs, identify the likely root cause, and suggest the next debugging step.
- Test failure explanation: summarize failing tests, expected vs. actual behavior, and likely related code.
- Suggested fixes: open a pull request or commit proposal that attempts to fix a failing lint, test, dependency, or documentation issue.
- Documentation updates: generate draft README updates, changelog entries, release notes, or API docs based on code changes.
- Security explanation: summarize vulnerability scan results in human-friendly language and suggest remediation paths.
- Dependency update help: explain what changed in a dependency update and whether the change looks risky.
- Issue routing: label issues, identify duplicates, suggest owners, or request missing reproduction details.
- Release note generation: summarize merged pull requests into user-facing release notes.
- Workflow maintenance: explain GitHub Actions failures, detect repeated flaky jobs, or suggest workflow simplifications.

Good guardrails are important:

- AI output should usually be advisory, not the only required check.
- Deterministic tools should still enforce pass/fail checks such as tests, linting, type checks, security scanners, and build steps.
- Agents should use limited permissions, especially when they can write comments, push commits, or open pull requests.
- Secrets should not be exposed to AI prompts or logs.
- Generated changes should go through normal review.
- The workflow should clearly show what the agent read, what it changed, and why.

In GitHub Actions, an AI-assisted workflow might run after tests fail, collect the logs, ask an agent to summarize the failure, and post the explanation as a pull request comment. A more advanced workflow might allow the agent to open a separate fix branch, but still require normal CI and human review before merging.

For this challenge, AI agents do not need to be part of the first workflow. A strong first step is still a clear CI workflow with lint jobs. Later, an AI helper could be added to summarize failed lint jobs or suggest documentation updates.
