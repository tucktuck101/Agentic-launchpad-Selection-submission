# Agentic Launchpad Selection Submission

This repository is a working space for an Agentic Launchpad selection challenge. It contains the challenge brief, a submission template, and task folders used to demonstrate learning process, technical judgment, debugging, and communication.

## Repository Contents

- `Challenge_info.md`: cleaned Markdown version of the challenge instructions.
- `agentic-launchpad-selection-submission.md`: submission template to fill in as work is completed.
- `Agents.md`: local guidance for Codex and future agentic work in this repo.
- `Codex.log`: timestamped one-line summaries of Codex actions.
- `challenge_two/PLAN.md`: high-level plan for the Part 2 technical work sample.
- `challenge_two/codex_notes.md`: canonical staging notes for Challenge Two submission-ready material.
- `challenge_two/task_1_code_review/`: Express/React code review task.
- `challenge_two/task_2_clarifying_questions/`: return-request clarification task.
- `challenge_two/task_3_prd_to_tickets/`: return-request PRD ticket breakdown task.
- `challenge_two/task_4_api_script/`: tiny Python API and scripting task.
- `challenge_two/task_5_failing_tests/`: Express failing-tests task.
- `Original_Files/`: original reference materials. Do not modify files in this folder.

## Setup Notes

Python and Docker can be used for the API script task. The Node-based tasks require Node.js and npm before their install, test, or dev commands can run.

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

Use `Challenge_info.md` as the source of truth for the challenge and fill in `agentic-launchpad-selection-submission.md` as work progresses. For Challenge Two, stage submission-ready material in `challenge_two/codex_notes.md` instead of editing the final submission template unless a final-copy step is explicitly requested. Keep notes concrete: what was tried, what changed, what worked, what did not, and what would be done next.

`Original_Files/` is intentionally ignored by Git and should remain unchanged.

## Continuous Integration

The basic GitHub Actions workflow lives in `.github/workflows/ci.yml`. It runs on pushes and pull requests with `contents: read` permissions and separates checks by repo area:

- Repository docs and guardrails: confirms key files exist, checks Markdown for merge markers, and verifies `Original_Files/` is not tracked.
- Code review app: installs dependencies with `npm ci`, checks the Express server syntax, and builds the Vite client.
- Failing tests app: installs dependencies and runs `npm test` as a known-failing challenge signal with `continue-on-error`.
- Python API: checks `server.py` syntax and smoke-tests `GET /api/items`.

Run or debug the checks locally with:

```bash
# Repository/docs guard
test -f README.md
test -f Challenge_info.md
test -f agentic-launchpad-selection-submission.md
test -f Requirements.txt
test -f Agents.md
test -f challenge_two/Agents.md
test -f challenge_two/PLAN.md
test -f challenge_two/codex_notes.md
test -f challenge_two/task_1_code_review/Agents.md
test -f challenge_two/task_2_clarifying_questions/Agents.md
test -f challenge_two/task_3_prd_to_tickets/Agents.md
test -f challenge_two/task_4_api_script/Agents.md
test -f challenge_two/task_5_failing_tests/Agents.md
if grep -RInE '^(<<<<<<<|=======|>>>>>>>)' -- README.md Challenge_info.md agentic-launchpad-selection-submission.md challenge_one/*.md challenge_two/*.md challenge_two/*/*.md challenge_two/task_1_code_review/code-review-app/README.md challenge_two/task_4_api_script/api-script-server/README.md; then
  echo "Unresolved merge marker found in Markdown files."
  exit 1
fi
if git ls-files --error-unmatch Original_Files >/dev/null 2>&1; then
  echo "Original_Files contains tracked files."
  exit 1
fi

# Code review app
cd challenge_two/task_1_code_review/code-review-app
npm ci
node --check server/index.js
npm exec -- vite build --outDir /tmp/code-review-app-dist --emptyOutDir

# Failing tests app
cd ../../task_5_failing_tests
npm ci
npm test

# Python API
cd ../task_4_api_script/api-script-server
python3 -m py_compile server.py
python3 server.py &
server_pid=$!
trap 'kill "$server_pid"' EXIT
sleep 2
curl --fail --silent --show-error http://127.0.0.1:5050/api/items
```

The failing-tests app is intentionally not a required green gate yet because the challenge includes known code bugs and at least one misleading test expectation. The next CI improvement would be to fix or classify those tests, remove `continue-on-error`, and add real linting tools such as ESLint, markdownlint, Ruff, or Prettier if the repo adopts them.
