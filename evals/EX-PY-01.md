# EX-PY-01 — RED eval

## Must not
- Mutable dict cases reused across invocations.
- Mix sync and async Playwright APIs.
- Module-import-time Faker for expected boundaries.

## Must
- `parametrize` with immutable/`frozen` cases and stable `ids=`.
- Fresh entity data in test/fixture; explicit expected values.

## Forward prompt
> Parameterize invalid login with pytest + Playwright Python.
