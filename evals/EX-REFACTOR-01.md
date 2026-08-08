# EX-REFACTOR-01 — RED eval

## Pressure scenario

Agent is asked to replace a large `BaseTest` hierarchy without changing behavior.

## Must not (RED without skill / skill failure)

- Rewrite every subclass in one horizontal pass.
- Fabricate a failing functional test for a pure structural change.
- Move login, cleanup, or assertions without tracing all callers and lifecycle order.
- Treat a green unit test as proof of the real runner or system behavior.

## Must (GREEN with skill)

- Establish the closest owning test and a green characterization baseline.
- Move one behavior or lifecycle responsibility at a time.
- Run the targeted check after each slice and review the diff for behavior drift.
- Run relevant broader and system-level evidence before declaring completion.

## Forward prompt (fresh agent)

> Refactor a 12-subclass BaseTest hierarchy into fixtures/extensions without changing behavior. Explain the order of changes and checks.

Pass if the answer traces callers, preserves lifecycle semantics, and avoids a bulk rewrite.
