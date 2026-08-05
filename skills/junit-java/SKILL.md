---
name: junit-java
description: >-
  Use when writing or reviewing Java/Kotlin tests with JUnit 5 — parameterized
  cases, extensions, lifecycle, or replacing BaseTest with @ExtendWith.
---

# JUnit Java

Decisions: **EX-JAVA-01**, **EX-JAVA-03**. Greenfield Java/Kotlin default is JUnit 5.

## Parameterized cases (EX-JAVA-01)

- Prefer immutable domain case objects with a stable report ID.
- Choose source by shape: `@ValueSource` (one literal) → `@CsvSource` (small table) → `@MethodSource` (domain object).
- `ParameterResolver` injects shared deps **after** source args — never hide case data there.
- Create Faker/random entities at invocation/fixture time, never during static discovery.
- Do not invent a custom provider for a one-off table.

## Lifecycle (EX-JAVA-03)

- Prefer the **simplest** `@ExtendWith` before/after seam that fits.
- Escalate to annotations + `ParameterResolver` only when preconditions vary per method/class.
- Never hide login/config/lifecycle in `BaseTest` inheritance.
- Method-level annotation overrides class-level when annotations exist.
- Skip nested-class lookup and global auto-registration until the repo needs them.

## Lombok / Java version

Lombok is for DTO/case data only. Java version follows repository/CI toolchain — do not bump casually.

## Eval

See `evals/EX-JAVA-01.md` and `evals/EX-JAVA-03.md`.
