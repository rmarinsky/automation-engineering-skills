---
name: selenide-java
description: >-
  Use when writing Java UI automation with Selenide — page/component objects,
  conditions, selectors, isLoaded, or replacing sleeps and raw getText asserts.
---

# Selenide Java

Decision: **EX-JAVA-02**. Apply `compose-test-architecture` and `name-test-behavior` first.

## Page / component contract

- Component owns a **scoped** root; page aggregates components as fields.
- Every page/component has `isLoaded()` with its key elements.
- `open()` only navigates; the scenario calls `isLoaded()` when readiness is evidence.
- Assert with `shouldBe` / `shouldHave` (retrying conditions), not `getText()` + static assert.
- Never commit `Thread.sleep`.

## Selectors

1. Semantic / testability attributes first.
2. If missing — propose `data-testid`, ARIA, or accessibility attribute.
3. XPath only as a documented last-resort web fallback with evidence — prefer testability change.

## Trace-driven waits

Add narrow preloader/`shouldBe(hidden)` waits only when a screenshot/trace proves the control is gated.

## Eval

See `evals/EX-JAVA-02.md`.
