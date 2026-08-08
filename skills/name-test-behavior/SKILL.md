---
name: name-test-behavior
description: >-
  Use when naming tests, page actions, assertions, variables, or Playwright
  steps — or when generated tests look like test1, clickButton, or generic data.
---

# Name test behavior

Decision: **EX-NAME-01**.

## Rule

Names describe observable behavior and domain intent, not clicks or case numbers. A local repository naming convention wins over any universal template.

## Contract

| Kind | Prefer | Avoid |
|---|---|---|
| Test name | Observable result — `filters projects by exact name` | `test 1`, `clickSearch` |
| Page action | Domain verb — `searchFor`, `createProject` | Scenario-level `clickSearchButton` |
| Assertion | Expected state — `projectCountShouldBe`, `isLoaded` | Silent side effects |
| Variables | `target…` input, `expected…` oracle | Generic `data` |
| `actual…` | Non-retrying API/domain assert only | UI retrying paths |
| Steps | One meaningful business action/verification | Wrap every click |
| Comments | Ticket/risk/rule not visible from the name | Restate the code |

## Refactoring names

- Name methods/functions by domain intent, not the mechanics they currently use.
- Boolean names read as predicates; query names must not hide mutation.
- Separate Query from Modifier when a returned value also triggers a surprising side effect.
- Preserve symmetric domain verbs and the repository's public vocabulary.
- Do not rename a public API for aesthetics alone.

## Agent checklist

1. Preserve existing repo naming if present.
2. Ensure the scenario has a domain action **and** an observable assertion.
3. Keep technical verbs inside low-level components only.
4. Do not rename public APIs for aesthetics alone.

## Eval

See `evals/EX-NAME-01.md`.
