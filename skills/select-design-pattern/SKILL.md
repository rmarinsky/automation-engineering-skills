---
name: select-design-pattern
description: >-
  Use when choosing, introducing, or reviewing a design pattern or abstraction
  in production or test code, especially for factories, builders, strategies,
  adapters, observers, state, lifecycle hooks, cross-platform structure, or
  requests to apply a named GoF pattern.
---

# Select a design pattern

Decisions: **EX-PATTERN-01**, **EX-PATTERN-02**.

## Selection ladder

Stop at the first option that fully solves the verified pressure:

1. Direct code with no new abstraction.
2. Standard library (`stdlib`) or native language feature.
3. Native platform or framework seam.
4. Existing repository abstraction.
5. A named pattern with current forces that justify its cost.

## Pattern gate

Before choosing a pattern:

1. Name the current variation, lifecycle, boundary, object tree, or change pressure.
2. Show at least one current consumer and the credible reason direct code fails.
3. Check the matching language reference and framework instructions.
4. State the pattern's indirection, ownership, concurrency, and debugging cost.
5. Name the verification seam and the failure mode the checks must cover.

Return **no named pattern** when the ladder already holds. A requested pattern
name is not evidence that it belongs in the code.

## References

- Read [references/design-principles.md](references/design-principles.md) for OOP,
  object relations, composition, contracts, and SOLID diagnostic prompts.
- Read [references/pattern-catalog.md](references/pattern-catalog.md) when comparing
  the 22 supported patterns.
- Read [references/test-surfaces.md](references/test-surfaces.md) for UI,
  component, API, integration, E2E/system, mobile, and lifecycle guidance.
- Read exactly one language reference matching the repository: [JVM](references/jvm.md),
  [Python](references/python.md), [.NET](references/dotnet.md),
  [TypeScript/JavaScript](references/typescript-javascript.md), or [Swift](references/swift.md).

Do not load all language references for one task.

## Decision record

| Pressure / forces | Direct or native option | Pattern or none | Cost / failure mode | Verification |
|---|---|---|---|---|

## Evals

See `evals/EX-PATTERN-01.md` and `evals/EX-PATTERN-02.md`.
