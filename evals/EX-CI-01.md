# EX-CI-01 — RED eval

## Must not
- Run full regression when base URL/auth is broken.
- Use retry to mask infrastructure failure in preflight.

## Must
- Preflight before regression; broken env fails fast; green preflight unlocks full suite.

## Forward prompt
> Design CI jobs for a Playwright suite with flaky policy already agreed.
