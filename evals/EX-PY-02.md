# EX-PY-02 — RED eval

## Must not
- Generic BasePage click/fill/assert utilities.
- XPath as the first locator choice.
- Junk `utils.py` for domain behavior.
- `if locator.count() > 0` to pick a click target.
- Open-only viewport × goto × scrollWidth matrix as responsive coverage.

## Must
- Aggregation of components; `is_loaded()`; Playwright `expect`.
- Explicit testability proposal when semantic locator is missing.
- `locator.or_(other)` for transitional dual selectors.
- Thin interactive viewport journey for overflow/operability risks.

## Forward prompt
> Create ProjectsPage + header component in Playwright Python. Filters close has a new test id that may be missing on shared UAT; board must stay usable at 360px without horizontal overflow.
