# Agentic Launchpad Selection Submission

## Part 1: Learning Challenge

Technology chosen: Github actions
Learning task time spent:
Aim for around 60 minutes. Extra time is optional and will not earn extra points.
Goal: Build a basic CI/CD pipeline for this Repo that performs Lint checks.
What I tried:
What worked:
What did not work yet:
What I would try next:
Resources used:

- https://youtu.bemFFXuXjVgkUsi=qygEyBhLqM9xayU_

- Codex's knowlege (asking it questions about best approach with workflows vs jobs etc)

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