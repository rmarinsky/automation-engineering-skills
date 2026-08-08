#!/usr/bin/env node
/**
 * Install pack agent markdown into Cursor / Claude / Codex agent dirs.
 *
 *   node scripts/install-agents.mjs
 *   node scripts/install-agents.mjs -g
 *   node scripts/install-agents.mjs --copy
 */
import {
  mkdirSync,
  readdirSync,
  symlinkSync,
  copyFileSync,
  rmSync,
  existsSync,
  lstatSync,
} from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { homedir } from "node:os";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const agentsSrc = join(root, "agents");

const args = process.argv.slice(2);
const global = args.includes("-g") || args.includes("--global");
const copy = args.includes("--copy");

const home = homedir();
const cwd = process.cwd();

function targets() {
  if (global) {
    return [
      join(home, ".cursor", "agents"),
      join(home, ".claude", "agents"),
      join(home, ".codex", "agents"),
    ];
  }
  return [
    join(cwd, ".cursor", "agents"),
    join(cwd, ".claude", "agents"),
    join(cwd, ".codex", "agents"),
  ];
}

function agentFiles() {
  return readdirSync(agentsSrc)
    .filter((f) => f.endsWith(".md"))
    .sort();
}

function installOne(destDir, file) {
  mkdirSync(destDir, { recursive: true });
  const src = join(agentsSrc, file);
  const dest = join(destDir, file);
  if (existsSync(dest)) {
    rmSync(dest, { force: true });
  } else {
    try {
      lstatSync(dest);
      rmSync(dest, { force: true });
    } catch {
      /* absent */
    }
  }
  if (copy) {
    copyFileSync(src, dest);
    return `copy → ${dest}`;
  }
  try {
    symlinkSync(src, dest);
    return `symlink → ${dest}`;
  } catch {
    copyFileSync(src, dest);
    return `copy(fallback) → ${dest}`;
  }
}

const files = agentFiles();
if (files.length === 0) {
  console.error("No agents/*.md found");
  process.exit(1);
}

const scope = global ? "global ($HOME)" : `project (${cwd})`;
console.log(
  `Installing ${files.length} agents (${scope}${copy ? ", copy" : ", symlink"})`,
);

for (const dir of targets()) {
  for (const file of files) {
    console.log(`  ${installOne(dir, file)}`);
  }
}

console.log("Done. Invoke @sdet-lead or @code-quality-reviewer in Cursor / Claude / Codex.");
