import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const read = (path) => readFileSync(join(root, path), "utf8");
const readJson = (path) => JSON.parse(read(path));

const semver = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

test("release metadata keeps public manifests and release-please configuration aligned", () => {
  const config = readJson("release-please-config.json");
  const manifest = readJson(".release-please-manifest.json");
  const packageJson = readJson("package.json");
  const cursorPlugin = readJson(".cursor-plugin/plugin.json");
  const claudePlugin = readJson(".claude-plugin/plugin.json");

  assert.equal(config["release-type"], "node");
  assert.equal(config["include-v-in-tag"], true);
  assert.equal(config["include-component-in-tag"], false);
  assert.equal(config["bump-minor-pre-major"], true);
  assert.equal(config.packages["."]["changelog-path"], "CHANGELOG.md");
  assert.match(manifest["."], semver);
  assert.match(packageJson.version, semver);
  assert.equal(cursorPlugin.version, packageJson.version);
  assert.equal(claudePlugin.version, packageJson.version);
  assert.match(read("CHANGELOG.md"), /^# Changelog\n/);
  assert.deepEqual(config.packages["."]["extra-files"], [
    { type: "json", path: ".cursor-plugin/plugin.json", jsonpath: "$.version" },
    { type: "json", path: ".claude-plugin/plugin.json", jsonpath: "$.version" },
  ]);

  const sections = Object.fromEntries(
    config["changelog-sections"].map(({ type, hidden = false }) => [type, hidden]),
  );
  assert.deepEqual(sections, {
    feat: false,
    fix: false,
    perf: false,
    refactor: false,
    docs: true,
    test: true,
    build: true,
    ci: true,
    chore: true,
  });
});

test("GitHub Actions verifies pull requests and creates releases from main", () => {
  const verify = read(".github/workflows/verify.yml");
  const release = read(".github/workflows/release-please.yml");

  assert.match(verify, /pull_request:/);
  assert.match(verify, /node scripts\/verify-pr-title\.mjs/);
  assert.match(verify, /node scripts\/verify-skills\.mjs/);
  assert.match(verify, /node --test scripts\/\*\.test\.mjs/);
  assert.match(verify, /node docs\/verify-automation-skills-approval-review\.mjs/);
  assert.match(verify, /npm pack --dry-run --json/);
  assert.match(release, /push:\n\s+branches:\n\s+- main/);
  assert.match(release, /googleapis\/release-please-action@16a9c90856f42705d54a6fda1823352bdc62cf38/);
  assert.match(release, /config-file: release-please-config\.json/);
  assert.match(release, /manifest-file: \.release-please-manifest\.json/);
});

test("skill verification does not pin a single release version", () => {
  const verifier = read("scripts/verify-skills.mjs");

  assert.doesNotMatch(verifier, /assert\.equal\(version, "0\.3\.0"/);
  assert.match(verifier, /package version must be valid SemVer/);
});
