# Agentic Launchpad Selection Submission

This repository is a working space for an Agentic Launchpad selection challenge. It contains the challenge brief, a submission template, and three small technical tasks used to demonstrate learning process, technical judgment, debugging, and communication.

## Repository Contents

- `Challenge_info.md`: cleaned Markdown version of the challenge instructions.
- `agentic-launchpad-selection-submission.md`: submission template to fill in as work is completed.
- `Agents.md`: local guidance for Codex and future agentic work in this repo.
- `Codex.log`: timestamped one-line summaries of Codex actions.
- `launchpad-code-review-app/`: Express/React code review task.
- `launchpad-failing-tests-app/`: Express failing-tests task.
- `launchpad-api-script-server/`: tiny Python API and scripting task.
- `Original_Files/`: original reference materials. Do not modify files in this folder.

## Setup Notes

Python and Docker can be used for the API script task. The Node-based tasks require Node.js and npm before their install, test, or dev commands can run.

### Dev Container

This repo includes a VS Code dev container configuration in `.devcontainer/devcontainer.json`. To use it, install Docker and the VS Code Dev Containers extension, then run:

```text
Dev Containers: Reopen in Container
```

The container includes Node.js, npm, Python 3.12, and Docker access. It installs dependencies for both Node apps after the container is created.

Install project requirements on Debian/Ubuntu with:

```bash
./scripts/install-requirements.sh
```

Before committing work, configure Git identity locally:

```bash
git config user.name "Your Name"
git config user.email "you@example.com"
```

## Workflow

Use `Challenge_info.md` as the source of truth for the challenge and fill in `agentic-launchpad-selection-submission.md` as work progresses. Keep notes concrete: what was tried, what changed, what worked, what did not, and what would be done next.

`Original_Files/` is intentionally ignored by Git and should remain unchanged.
