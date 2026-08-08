#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const evalsRoot = join(root, "evals");
const agentsRoot = join(root, "agents");

const required = [
  {
    id: "EX-PATTERN-01",
    skill: "select-design-pattern",
    must: ["direct", "stdlib", "framework", "forces", "verification"],
  },
  {
    id: "EX-PATTERN-02",
    skill: "select-design-pattern",
    must: ["JVM", "Python", ".NET", "TypeScript", "Swift"],
  },
  {
    id: "EX-REFACTOR-01",
    skill: "refactor-code-safely",
    must: ["behavior", "callers", "characterization", "targeted", "broader"],
  },
  {
    id: "EX-SMELL-01",
    skill: "diagnose-code-smells",
    must: ["evidence", "false positive", "DAMP", "severity", "smallest"],
  },
  {
    id: "EX-ARCH-01",
    skill: "compose-test-architecture",
    must: [
      "language-agnostic",
      "composition",
      "BaseTest",
      "narrow platform",
    ],
    mustNotEncodeAsRule: ["Constructor-free TypeScript"],
  },
  {
    id: "EX-NAME-01",
    skill: "name-test-behavior",
    must: ["observable", "domain", "target", "expected", "local"],
  },
  {
    id: "EX-JAVA-01",
    skill: "junit-java",
    must: ["@MethodSource", "immutable", "@ValueSource", "ParameterResolver"],
  },
  {
    id: "EX-JAVA-02",
    skill: "selenide-java",
    must: ["isLoaded", "shouldBe", "Thread.sleep", "scoped"],
  },
  {
    id: "EX-JAVA-03",
    skill: "junit-java",
    must: ["@ExtendWith", "simplest", "BaseTest"],
  },
  {
    id: "EX-TESTNG-01",
    skill: "testng-java",
    must: ["testng.xml", "said no", "Listener", "parallel"],
  },
  {
    id: "EX-PY-01",
    skill: "playwright-python",
    must: ["parametrize", "frozen", "ids=", "Faker"],
  },
  {
    id: "EX-PY-02",
    skill: "playwright-python",
    must: ["is_loaded", "aggregation", "BasePage", "XPath"],
  },
  {
    id: "EX-API-01",
    skill: "api-automation",
    must: ["APIRequestContext", "Axios", "cleanup"],
  },
  {
    id: "EX-MOBILE-01",
    skill: "choose-mobile-automation-stack",
    must: [
      "native-first",
      "Appium",
      "precondition",
      "postcondition",
      "deep link",
      "clone",
      "architecture",
    ],
  },
  {
    id: "EX-CS-01",
    skill: "playwright-dotnet",
    must: ["PageTest", "Bogus", "existing runner", "Expect"],
  },
  {
    id: "EX-IOS-01",
    skill: "xcuitest-ios",
    must: ["accessibility", "XPath", "testability", "waitForExistence"],
  },
  {
    id: "EX-ANDROID-01",
    skill: "kakao-android",
    must: ["Kakao", "XPath", "testability", "contentDescription"],
  },
  {
    id: "EX-RN-01",
    skill: "detox-react-native",
    must: ["testID", "XPath", "testability", "Detox"],
  },
  {
    id: "EX-CONTRACT-01",
    skill: "api-contract-testing",
    must: ["runtime", "OpenAPI", "invent"],
  },
  {
    id: "EX-CI-01",
    skill: "ci-fail-fast",
    must: ["preflight", "regression", "retry"],
  },
];

assert.ok(existsSync(skillsRoot), "skills/ missing");
assert.ok(existsSync(evalsRoot), "evals/ missing");

for (const item of required) {
  const skillPath = join(skillsRoot, item.skill, "SKILL.md");
  const evalPath = join(evalsRoot, `${item.id}.md`);
  assert.ok(existsSync(skillPath), `Missing skill for ${item.id}: ${skillPath}`);
  assert.ok(existsSync(evalPath), `Missing eval for ${item.id}: ${evalPath}`);

  const skill = readFileSync(skillPath, "utf8");
  const evaluation = readFileSync(evalPath, "utf8");

  assert.match(skill, /^---\nname:/, `${item.skill} needs YAML frontmatter`);
  assert.match(skill, /\ndescription: /, `${item.skill} needs description`);
  assert.ok(evaluation.includes(item.id), `Eval ${item.id} must name itself`);
  assert.ok(
    evaluation.toLowerCase().includes("red") || evaluation.includes("Must not"),
    `Eval ${item.id} needs RED / Must not pressure cases`,
  );

  for (const needle of item.must) {
    assert.ok(
      skill.toLowerCase().includes(needle.toLowerCase()),
      `${item.id} skill ${item.skill} missing required phrase: ${needle}`,
    );
  }
  for (const banned of item.mustNotEncodeAsRule ?? []) {
    assert.ok(
      !skill.includes(banned),
      `${item.id} must not encode language seam as shared rule: ${banned}`,
    );
  }
}

const skillDirs = readdirSync(skillsRoot, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);
assert.equal(skillDirs.length, 19, `Expected 19 skills, found ${skillDirs.length}`);

const requiredReferences = [
  "diagnose-code-smells/references/smell-catalog.md",
  "refactor-code-safely/references/refactoring-catalog.md",
  "select-design-pattern/references/design-principles.md",
  "select-design-pattern/references/pattern-catalog.md",
  "select-design-pattern/references/test-surfaces.md",
  "select-design-pattern/references/jvm.md",
  "select-design-pattern/references/python.md",
  "select-design-pattern/references/dotnet.md",
  "select-design-pattern/references/typescript-javascript.md",
  "select-design-pattern/references/swift.md",
];
for (const reference of requiredReferences) {
  assert.ok(existsSync(join(skillsRoot, reference)), `Missing reference: ${reference}`);
}

const smellCatalog = readFileSync(
  join(skillsRoot, "diagnose-code-smells/references/smell-catalog.md"),
  "utf8",
);
assert.equal(
  smellCatalog.match(/^### /gm)?.length,
  23,
  "Smell catalog must contain exactly 23 entries",
);

const refactoringCatalog = readFileSync(
  join(skillsRoot, "refactor-code-safely/references/refactoring-catalog.md"),
  "utf8",
);
for (const group of [
  "Composing methods (9)",
  "Moving features between objects (8)",
  "Organizing data (15)",
  "Simplifying conditionals (8)",
  "Simplifying calls (14)",
  "Generalization (12)",
]) {
  assert.ok(refactoringCatalog.includes(`## ${group}`), `Missing refactoring group: ${group}`);
}
const refactoringRows = [...refactoringCatalog.matchAll(/^\| ([^|]+) \|/gm)]
  .map((match) => match[1].trim())
  .filter((name) => name !== "Refactoring" && name !== "---");
assert.equal(refactoringRows.length, 66, "Refactoring catalog must contain exactly 66 entries");

const patternCatalog = readFileSync(
  join(skillsRoot, "select-design-pattern/references/pattern-catalog.md"),
  "utf8",
);
const patternRows = [...patternCatalog.matchAll(/^\| ([^|]+) \|/gm)]
  .map((match) => match[1].trim())
  .filter((name) => name !== "Pattern" && name !== "---");
assert.equal(patternRows.length, 22, "Pattern catalog must contain exactly 22 entries");
assert.ok(!patternRows.includes("Interpreter"), "Interpreter must remain out of the v1 catalog");

const agentFiles = readdirSync(agentsRoot)
  .filter((file) => file.endsWith(".md"))
  .sort();
assert.deepEqual(agentFiles, [
  "code-quality-reviewer.md",
  "sdet-design-reviewer.md",
  "sdet-engineer.md",
  "sdet-lead.md",
  "sdet-standards-reviewer.md",
]);
for (const file of agentFiles) {
  const content = readFileSync(join(agentsRoot, file), "utf8");
  assert.doesNotMatch(
    content,
    /skills\/[^\s`]+\/SKILL\.md/,
    `${file} must route by installed skill ID, not a repository-relative path`,
  );
}

const qualityReviewer = readFileSync(join(agentsRoot, "code-quality-reviewer.md"), "utf8");
assert.ok(qualityReviewer.includes("readonly: true"), "code-quality-reviewer must be read-only");
assert.ok(qualityReviewer.includes("diagnose-code-smells"), "quality reviewer must load smell skill");
assert.ok(qualityReviewer.includes("select-design-pattern"), "quality reviewer must route pattern changes");

const sdetEngineer = readFileSync(join(agentsRoot, "sdet-engineer.md"), "utf8");
assert.ok(sdetEngineer.includes("refactor-code-safely"), "sdet engineer must route refactors");
assert.ok(sdetEngineer.includes("select-design-pattern"), "sdet engineer must route pattern changes");

const sdetDesignReviewer = readFileSync(join(agentsRoot, "sdet-design-reviewer.md"), "utf8");
assert.ok(sdetDesignReviewer.includes("diagnose-code-smells"), "design reviewer must load smell skill");
assert.ok(sdetDesignReviewer.includes("select-design-pattern"), "design reviewer must route pattern changes");

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const publishedFiles = packageJson.files.flatMap((entry) => {
  const path = join(root, entry);
  assert.ok(existsSync(path), `Published package entry missing: ${entry}`);
  return statSync(path).isDirectory() ? filesUnder(path) : [path];
});
for (const file of publishedFiles) {
  assert.ok(!/\.(pdf|zip)$/i.test(file), `Source artifact must not be packaged: ${file}`);
}

assert.ok(
  packageJson.files.includes("evals"),
  "Published package must include evals referenced by the skills contract",
);
for (const guide of ["README.md", "INSTALL.md"]) {
  const content = readFileSync(join(root, guide), "utf8");
  assert.doesNotMatch(content, /16 skills|4 agents/, `${guide} contains stale package counts`);
}
const cursorPlugin = JSON.parse(readFileSync(join(root, ".cursor-plugin/plugin.json"), "utf8"));
const claudePlugin = JSON.parse(readFileSync(join(root, ".claude-plugin/plugin.json"), "utf8"));
assert.match(
  packageJson.version,
  /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/,
  "package version must be valid SemVer",
);
for (const [name, version] of [
  ["Cursor plugin", cursorPlugin.version],
  ["Claude plugin", claudePlugin.version],
]) {
  assert.equal(version, packageJson.version, `${name} version must match package version`);
}

console.log(`skills contract: valid (${required.length} decision IDs, ${skillDirs.length} skills)`);
