# EX-CS-01 — RED eval

## Must not
- Replace an existing runner with a new one for aesthetics.
- Invent BasePage helper trees; sleep/static text as primary UI assert.
- `if (await locator.CountAsync() > 0)` to pick a click target.
- Open-only SetViewportSize + Goto + ScrollWidth matrix as responsive coverage.

## Must
- Retain existing runner; PageTest allowed; Bogus per invocation; Playwright `Expect`.
- `Locator.Or(...)` for transitional dual selectors.
- Thin interactive viewport journey for overflow/operability risks.

## Forward prompt
> Repo already uses xUnit. Add a Playwright filter-projects test. Filters close has a new test id that may be missing on shared UAT; board must stay usable at 360px without horizontal overflow.
