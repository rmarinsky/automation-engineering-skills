#!/usr/bin/env node
/**
 * One-shot installer: skills (via npx skills) + sdet agents.
 *
 *   npx -y github:rmarinsky/automation-engineering-skills
 *   npx -y github:rmarinsky/automation-engineering-skills -- -g
 *   node scripts/install.mjs --agents-only -g
 *   node scripts/install.mjs --skills-only --all
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const args = process.argv.slice(2);

const agentsOnly = args.includes("--agents-only");
const skillsOnly = args.includes("--skills-only");
const global = args.includes("-g") || args.includes("--global");
const copy = args.includes("--copy");
const yes = args.includes("-y") || args.includes("--yes");

function run(command, commandArgs, opts = {}) {
  const res = spawnSync(command, commandArgs, {
    stdio: "inherit",
    shell: process.platform === "win32",
    ...opts,
  });
  if (res.status !== 0) {
    process.exit(res.status ?? 1);
  }
}

const doSkills = !agentsOnly;
const doAgents = !skillsOnly;

if (doSkills) {
  const skillsArgs = [
    "--yes",
    "skills",
    "add",
    "rmarinsky/automation-engineering-skills",
    "--all",
  ];
  if (global) skillsArgs.push("-g");
  if (copy) skillsArgs.push("--copy");
  if (yes) skillsArgs.push("-y");
  console.log("→ Installing skills via npx skills …");
  run("npx", skillsArgs);
}

if (doAgents) {
  const agentArgs = [];
  if (global) agentArgs.push("-g");
  if (copy) agentArgs.push("--copy");
  console.log("→ Installing sdet agents …");
  run(process.execPath, [join(here, "install-agents.mjs"), ...agentArgs]);
}

console.log(`
Installed. Next:
  • Skills are available to your coding agents
  • Call @sdet-lead (or the Task/subagent picker) for plan → implement → dual review → PR
`);
