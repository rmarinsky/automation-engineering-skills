# EX-JAVA-03 — RED eval

## Must not
- `BaseTest` inheritance for login/config/lifecycle.
- Jump straight to annotation + ParameterResolver + nested lookup for a single shared before/after.

## Must
- Prefer the simplest `@ExtendWith` before/after first.
- Scenario remains visible; escalate complexity only when needed.

## Forward prompt
> Remove BaseTest login setup from ArchiveProjectTests with the smallest JUnit 5 change.
