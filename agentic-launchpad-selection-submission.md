# Agentic Launchpad Selection Submission

## Part 1: Learning Challenge

Technology chosen: Github actions
Learning task time spent: 4hrs+ due to getting to invested in the subject matter for my own personal interest
Aim for around 60 minutes. Extra time is optional and will not earn extra points.
Goal: Create a functional Github workflow that is based on this repo.
What I tried: I used Codex to complete the implimentation after spending too much time on research/learning
What worked: to put it bluntly, Using Codex to impliment the Workflow after carefully reviewing the proposed plan and having the understanding of what was being discussed. the workflow runs sucessfully on github: https://github.com/tucktuck101/Agentic-launchpad-Selection-submission/actions/runs/27459706632
What did not work yet: there is a few things noted below that codex reports does not work. From my perspective what didnt work is not having the correct dependancies installed locally to set up proper basic checks like Linting etc, which was my original goal I decided to migrate away from in order to save time.
What I would try next: I'd go over the repo and actually look at what the requrements are for a proper CI workflow with codex and use it to help guide me on a few different decisions. If this was a full scale product rather than a submission challenge, id be looking at things like Cybersecurity checks, Implimenting the test automation suite etc. 

- https://youtu.bemFFXuXjVgkUsi=qygEyBhLqM9xayU_

- Codex's knowlege (asking it questions about best approach with workflows vs jobs etc)
- GitHub Actions docs and official action release pages for current action versions and least-privilege `GITHUB_TOKEN` permissions.

## Part 2: Technical Work Sample

Tasks attempted:
What I changed or wrote:
Reasoning:
What I would do next:

## AI Use

Tools used: 
Where they helped: 
How I checked the output: 

## Aditional Notes
 Something I want to point out is that a large portion of my time on this project has been spent on enviroment configuration issues due to using a Linux machine that isnt my "default" workstation. some of the info in Codex.log (the file I have set up to track my usage of Codex) will reflect this. honestly its been an interesting part of the challenge as Im normally on MacOS and this Machine is a linux box for me to mess around with. so even though things like using Dev containers are my normal approach to help manage packages etc (mostly in case a package gets comprimised in a supplychain attack and it affect my machine) and show up in git and potentially other areas of this project, ive had to go without because my linux box has 8gb of ram and was crashing VS code. 

one of the things I made sure to focus on before i started these challenges was to set up my project to be "Agent friendly" (see Agents.md). my usual approach is to focus my time on curating the ideal enviroment for Codex or Claude (sometimes both) so that way I dont actually have to write any code and i focus my time on quality checking the outputs/ verifying the agent is not lying to me or done something "technically correct" but is poor quality due to something like a context window getting to large. How i go about this is making sure that the correct documentation or context is available for the agent, typically by leveraging industry standard practices as this is likely what the agent had been trained on. in this project Ive instead focused on making sure Codex has the same information available that I do (minus any external resources mentioned). you'll notice that I have a CHallenge_info.md file that is a localised version of the website's info. by doing this it makes it easier for Codex and I to understand the challenge scope and whats required, as well as not bloat the Agent.md file. as a saftey measure, ive also set up the "original_files" folder to make it simple as possible to fix any destructive actions that codex might make. in a regular repo, i'd rely on git like i have set up anyway but this was a "design choice" just because of the scope of this project. 

codex at one point updated this doc while using its plan flag. I have added it below for interests sake:
Goal: Design and build a basic GitHub Actions CI workflow for this repository that runs on pull requests and pushes, separates checks into clear jobs for the repo's main file types, avoids modifying `Original_Files/`, uses least-privilege workflow permissions, and documents how to run or debug the checks locally. The goal is complete when the workflow file is added, the checks are scoped to the current repo structure, and my submission notes explain what was built, what passed, what is still incomplete, and what I would add next.
What **Codex** tried: I inspected the repository first instead of starting with a generic workflow. The repo has Markdown challenge/submission files, a React/Vite and Express code-review app, a separate Express parcel app with Node's built-in test runner, and a small standard-library Python API server. I added one CI workflow with separate jobs for repository docs/guardrails, the code-review app, the failing-tests app, and the Python API.
What worked: The workflow uses `permissions: contents: read`, runs on `push` and `pull_request`, avoids `Original_Files/`, installs Node dependencies from lockfiles with `npm ci`, checks JavaScript server syntax, builds the Vite client, checks Python syntax, and smoke-tests the Python API endpoint. Local Python syntax checking passed using `python3`, and the API smoke test returned the expected item JSON when localhost binding was allowed. A clean temporary install of the code-review app passed `npm ci`, `node --check server/index.js`, and the Vite build. A clean temporary install of the failing-tests app ran the real test suite and produced the expected challenge failures, which confirms the job is useful for visibility even though it is not ready to be a blocking gate.
What did not work yet: The failing-tests app is intentionally not green yet because the challenge includes application bugs and at least one misleading test. The existing checked-in `node_modules` for the code-review app are platform-sensitive; Rollup's optional native dependency was missing locally before a fresh install, so CI installs from the lockfile rather than relying on local `node_modules`.
What **Codex** would try next: Fix or classify the failing parcel tests, remove `continue-on-error` once the expected behavior is clear, add real lint tooling such as ESLint or markdownlint if the repo adopts it, add a Docker build check for the Python API Dockerfile, and consider dependency/security checks once the baseline CI is stable.
## AI Use
Tools used: Codex, terminal commands, and GitHub Actions documentation.
Where they helped: Codex helped inspect the repo, identify realistic checks from the actual package scripts and source files, draft the workflow, and capture notes in the submission.
How I checked the output: I inspected the generated workflow, parsed the workflow as YAML, ran local equivalents where possible, confirmed Python syntax and the API smoke test, verified a clean temporary code-review app install/build, observed the known failing Node tests after a clean temporary install, and documented the limitation with checked-in `node_modules`.