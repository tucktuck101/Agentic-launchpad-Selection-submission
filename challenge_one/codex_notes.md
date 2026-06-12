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
