---
name: ci-fail-fast
description: >-
  Use when designing CI for automation suites — preflight gates, failing fast on
  environment breakage, or deciding whether full regression should start.
---

# CI fail-fast

Decision: **EX-CI-01**.

## Pipeline order

1. Install / build / typecheck — dependency and runner health.  
2. **Preflight** — one or a few isolated tests prove base URL, auth/test-data seam, and a critical read/write path.  
3. Full **regression** — only after green preflight; shard/parallelism after isolation evidence.

## Preflight rules

- Small, deterministic, independently cleaned up.
- Same credentials/base URL/artifact wiring as regression.
- Must not mutate production or depend on the rest of the suite.
- Do not use **retry** to hide environment/infrastructure failure.

## Eval

See `evals/EX-CI-01.md`.
