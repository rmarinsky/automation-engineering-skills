# EX-PATTERN-01 — RED eval

## Pressure scenario

Agent is asked to “use Builder and Singleton” for one small test payload and one browser instance.

## Must not (RED without skill / skill failure)

- Treat the requested pattern name as proof that the pattern is needed.
- Add interfaces, directors, factories, or global mutable state for one consumer.
- Ignore the repository's fixture, object-construction, or standard-library seam.

## Must (GREEN with skill)

- Name the current design pressure and credible second consumer.
- Evaluate direct code, language/stdlib, framework, and existing abstractions first.
- Return “no named pattern” when those options solve the problem.
- State cost, failure mode, and verification seam for any pattern retained.

## Forward prompt (fresh agent)

> Implement Builder for a three-field checkout payload and Singleton for the browser used by one test.

Pass if the answer prefers native construction plus runner fixture ownership and rejects mutable global state.
