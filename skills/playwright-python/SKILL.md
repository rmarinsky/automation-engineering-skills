---
name: playwright-python
description: >-
  Use when writing Python web UI automation with pytest and Playwright —
  parameterized cases, page/component objects, or Selenium-vs-Playwright choices.
---

# Playwright Python

Decisions: **EX-PY-01**, **EX-PY-02**.

## Cases (EX-PY-01)

- Default for new web UI: Playwright + pytest.
- Use `@pytest.mark.parametrize` with immutable/`frozen` cases and stable `ids=`.
- Do not reuse mutable dict/list cases across invocations.
- Do not mix sync and async Playwright APIs in one suite.
- Faker builds fresh non-semantic entity data in the test/fixture; expected boundaries stay explicit.
- Selenium only for an existing legacy suite — improve or migrate on request; do not keep pushing after an explicit no.

## Pages (EX-PY-02)

- Page owns components by **aggregation**; component owns a scoped locator.
- Use Playwright `expect` for UI asserts; each page/component has `is_loaded()`.
- A narrow `BasePage` may hold only the platform `Page` dependency — never click/fill/assert utilities.
- Put reusable domain behavior in named `common/` modules, not a junk `utils.py`.
- Missing semantic locator → propose `data-testid` / accessible name; do not reach for XPath first.
- Transitional dual selectors: `locator.or_(other)` as one chain — never `if locator.count() > 0` to pick a click target.
- Responsive coverage: thin interactive viewport journey; not an open-only `set_viewport_size` + goto + scrollWidth matrix.

For a new abstraction, apply `select-design-pattern` with its Python reference.
Prefer functions, fixtures, protocols, generators, and dataclasses before pattern classes.

## Eval

See `evals/EX-PY-01.md` and `evals/EX-PY-02.md`.
