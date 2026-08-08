import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const script = join(dirname(fileURLToPath(import.meta.url)), "verify-pr-title.mjs");

function verify(title) {
  return spawnSync(process.execPath, [script, title], { encoding: "utf8" });
}

test("accepts release-classified PR titles", () => {
  for (const title of [
    "feat(sdk): add typed agent client",
    "fix(installer): preserve user-owned agent files",
    "refactor!: remove the legacy agent entrypoint",
    "chore(release): 0.3.0",
  ]) {
    assert.equal(verify(title).status, 0, title);
  }
});

test("rejects titles that release-please cannot classify", () => {
  const result = verify("Add code quality features");

  assert.notEqual(result.status, 0);
  assert.match(result.stderr, /Conventional Commit/);
});
