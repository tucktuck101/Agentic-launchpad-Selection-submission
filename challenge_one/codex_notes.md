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
