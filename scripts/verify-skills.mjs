#!/usr/bin/env node
import assert from "node:assert/strict";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const skillsRoot = join(root, "skills");
const evalsRoot = join(root, "evals");

const required = [
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
assert.ok(skillDirs.length >= 12, `Expected >=12 skills, found ${skillDirs.length}`);

console.log(`skills contract: valid (${required.length} decision IDs, ${skillDirs.length} skills)`);
