# EX-NAME-01 — RED eval

## Pressure scenario

Agent generates a first UI test for “filter projects by exact name.”

## Must not (RED)

- Test titled `test1` / `test 2` / `clickSearchButton`.
- Scenario-level action named only as a click helper.
- Variables named `data`, `obj`, or unexplained `actual` on a retrying UI path.
- `test.step` (or equivalent) wrapping every micro-interaction.

## Must (GREEN)

- Behavior-oriented test name with an observable outcome.
- Domain verb for the page action and expected-state assertion.
- `target…` / `expected…` (or local equivalent) for input vs oracle.
- Local convention preserved when the repo already has one.

## Forward prompt (fresh agent)

> Write one test that filters projects by exact name. Name the test, actions, assertions, and variables.

Pass if names encode behavior + domain, not clicks/case numbers.
