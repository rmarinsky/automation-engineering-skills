---
name: compose-test-architecture
description: >-
  Use when designing or refactoring test automation structure — page objects,
  components, BasePage/BaseTest debates, inheritance vs composition, or shared
  lifecycle setup across languages.
---

# Compose test architecture

Decision: **EX-ARCH-01** (language-agnostic).

## Rule

Composition / field aggregation is the default. Inheritance is allowed only for one **narrow platform** «is-a» contract — not for helpers.

## Do

- Aggregate pages/screens/components as fields (or language-equivalent composition).
- Put runner lifecycle in the framework seam: extension, fixture, or listener — not a `BaseTest` tree.
- Keep reusable domain behavior in named common/shared modules next to the entity.
- If proposing a base class, state **one concrete reason** and its exact boundary.

## Do not

- Inherit for driver/page handle, config, credentials, assertions, or helper methods.
- Add `BasePage` / `BaseTest` to share click/fill/assert utilities.
- Encode language-specific constructor/`PageHolder` rules here — those live in language skills.

## Agent checklist

1. Show the concrete duplication being solved.
2. Try fields / components / fixtures first.
3. Only then propose a base class with one named platform boundary.

## Eval

See `evals/EX-ARCH-01.md`.
