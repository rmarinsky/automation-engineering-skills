---
name: api-automation
description: >-
  Use when choosing or implementing API test clients in TypeScript/Python —
  Playwright request fixtures, Axios exceptions, typed clients, or fixture cleanup.
---

# API automation

Decision: **EX-API-01**. Pair with `api-contract-testing` for schema validation.

## Transport default

- New TypeScript API tests: Playwright `APIRequestContext` + typed client in the same toolchain as E2E.
- **Axios** only when the repo already owns a standalone API-only module and adding Playwright would create a second runner.
- Do not hide two transports behind one interface.
- Python Playwright suites use the same rule via request context.

## Fixture cleanup

- Fixture owns resources it creates and tears them down after the test.
- Cleanup failure must not hide the primary scenario failure; multi-resource cleanup tries every cleanup and aggregates errors.
- Success client and negative/raw path are separate methods.
- Generate unique test data once; delete created state unless the environment is explicitly disposable.

For a new client abstraction, apply `select-design-pattern` with the repository's
language reference. Use Adapter/Facade only at a real transport/domain boundary,
and Builder only for genuinely complex valid requests.

## Eval

See `evals/EX-API-01.md`.
