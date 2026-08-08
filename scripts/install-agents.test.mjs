import assert from "node:assert/strict";
import {
  mkdtempSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const installer = join(dirname(fileURLToPath(import.meta.url)), "install-agents.mjs");

function workspace() {
  return mkdtempSync(join(tmpdir(), "automation-engineering-skills-installer-"));
}

test("installs all agents into each supported project directory", () => {
  const cwd = workspace();
  try {
    const result = spawnSync(process.execPath, [installer, "--copy"], {
      cwd,
      encoding: "utf8",
    });
    assert.equal(result.status, 0, result.stderr);
    for (const harness of [".cursor", ".claude", ".codex"]) {
      assert.equal(readdirSync(join(cwd, harness, "agents")).length, 5);
    }
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});

test("refuses to overwrite an unmanaged agent file", () => {
  const cwd = workspace();
  const conflict = join(cwd, ".cursor", "agents", "code-quality-reviewer.md");
  try {
    mkdirSync(dirname(conflict), { recursive: true });
    writeFileSync(conflict, "user-owned\n");

    const result = spawnSync(process.execPath, [installer, "--copy"], {
      cwd,
      encoding: "utf8",
    });

    assert.notEqual(result.status, 0);
    assert.equal(readFileSync(conflict, "utf8"), "user-owned\n");
  } finally {
    rmSync(cwd, { recursive: true, force: true });
  }
});
