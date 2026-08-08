---
name: testng-java
description: >-
  Use when a Java/Kotlin repository already uses TestNG — listeners, data
  providers, build config, or when someone proposes migrating to JUnit 5.
---

# TestNG Java

Decision: **EX-TESTNG-01**.

## Stay vs migrate

- Greenfield default remains JUnit 5.
- If the repo **already uses TestNG**, improve TestNG in place (listener, build config, providers).
- One migration offer to JUnit 5 is allowed. After the user **said no**, do not re-raise migration in later sessions/PRs until they ask.
- Never mix JUnit 5 and TestNG annotations in one new test.

## Listener / runner

- Listener may capture failure artifacts and prepare reusable annotated preconditions (role/session).
- Listener must not contain business acceptance assertions or mask the primary exception.
- Configure the runner via Gradle/Maven — do **not** create `testng.xml`.

## Parallel data providers

`@DataProvider(parallel = true)` only after proof of independent data, driver/context, cleanup, and no order dependence.

When introducing a new abstraction, apply `select-design-pattern` with its JVM
reference. Existing TestNG listener/runner seams win over a custom pattern layer.

## Eval

See `evals/EX-TESTNG-01.md`.
