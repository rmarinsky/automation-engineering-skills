---
name: playwright-dotnet
description: >-
  Use when writing C# / .NET UI automation with Playwright — PageTest,
  NUnit/MSTest/xUnit choice, Bogus data, or page object composition.
---

# Playwright .NET

Decision: **EX-CS-01**.

## Setup

- Prefer the repository’s **existing runner** (NUnit / MSTest / xUnit) over a new standard.
- `Microsoft.Playwright.NUnit` `PageTest` is an allowed stable platform base — do not invent custom `BaseTest`/`BasePage` trees.
- `Bogus` creates fresh non-semantic entity data; expected status/role/boundary stay explicit.

## Page API

- Composition root (`Application`) wires pages; constructor injection of `IPage` is fine there.
- Use Playwright async `Expect` — no sleep / static text assert as the primary UI oracle.
- Data factory runs per test invocation.
- Transitional dual selectors: `Locator.Or(...)` as one chain — never `if (await locator.CountAsync() > 0)` to pick a click target.
- Responsive coverage: thin interactive viewport journey; not an open-only SetViewportSize + Goto + ScrollWidth matrix.

For a new abstraction, apply `select-design-pattern` with its .NET reference.
Prefer delegates, records, iterators, and runner lifecycle before pattern classes.

## Eval

See `evals/EX-CS-01.md`.
