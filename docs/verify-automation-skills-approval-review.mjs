import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const path = new URL("./automation-skills-approval-review.html", import.meta.url);
const html = readFileSync(path, "utf8");
const slideIds = [...html.matchAll(/<section class="slide(?: is-active)?" id="(slide-\d+)"/g)]
  .map((match) => match[1]);

assert.equal(slideIds.length, 26, "The deck must retain all 26 review slides");
assert.equal(new Set(slideIds).size, slideIds.length, "Slide IDs must be unique");
for (const target of html.matchAll(/data-go="(\d+)"/g)) {
  assert.ok(slideIds.includes(`slide-${target[1]}`), `Missing target slide-${target[1]}`);
}
for (const id of [
  "EX-ARCH-01", "EX-NAME-01", "EX-JAVA-01", "EX-JAVA-02", "EX-JAVA-03",
  "EX-TESTNG-01", "EX-PY-01", "EX-PY-02", "EX-API-01", "EX-MOBILE-01",
  "EX-CS-01", "EX-IOS-01", "EX-ANDROID-01", "EX-RN-01", "EX-CONTRACT-01", "EX-CI-01",
]) {
  assert.ok(html.includes(id), `Missing approval candidate ${id}`);
}
for (const detail of [
  "Що саме погоджується",
  "Як агент застосує правило",
  "Що має довести eval",
  "До → після",
  "Умова безпечної паралельності",
  "Сценарій для trace review",
  "Fixture cleanup contract",
  "Python Selenium boundary",
  "Mobile decision tree",
  "Constructor-free TypeScript rule",
  "TestNG setup/precondition boundary",
  "Response decorator contract",
  "Mobile API precondition contract",
  "OpenAPI/schema validation boundary",
  "Fail-fast CI gate",
  "Відповідь, яку чекаємо",
]) {
  assert.ok(html.includes(detail), `Missing expanded review detail: ${detail}`);
}

const scriptStart = html.indexOf("<script>") + "<script>".length;
const scriptEnd = html.indexOf("</script>", scriptStart);
assert.ok(scriptStart > "<script>".length && scriptEnd > scriptStart, "Missing navigation script");
new Function(html.slice(scriptStart, scriptEnd));

console.log("approval deck contract: valid");
