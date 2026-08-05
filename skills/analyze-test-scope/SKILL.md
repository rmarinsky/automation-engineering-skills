---
name: analyze-test-scope
description: >-
  Use when deciding what to automate, at which layer, or before writing a test
  plan — force architecture clarity, map surfaces, and pick unit/API/UI/e2e/contract
  levels instead of defaulting everything to UI.
---

# Analyze test scope

## Rule

Do not propose automation until the **product behavior** and **system architecture** are clear enough to justify a layer. Prefer the **lowest reliable level** that proves the risk.

## Force architecture first

Before scenarios or stack choice, capture:

1. **Capability** — what the user/system does (domain language).
2. **Surfaces** — API, web, mobile, jobs, messages, files, admin.
3. **Trust boundaries** — auth, tenancy, money, PII, irreversible actions.
4. **Seams** — where the SUT can be driven cheaper than through the UI (API, deep link, message, DB seed **only** if already an approved test seam).

If architecture is unknown, **ask or discover** — do not invent layers or “UI for everything”.

## Level chooser

| Prefer | When |
|---|---|
| Unit / component | Pure logic, rules, mappers, validators — no I/O theater |
| API / contract | Business rules, persistence, authz, integrations with stable HTTP/events |
| UI (web/native) | Rendering, wiring, critical user journeys that only exist in the client |
| E2E thin | Few cross-surface paths that prove release risk; not a substitute for API coverage |
| Contract | Consumer/provider shapes when a real schema or runtime model exists |

## Do

- State **risk → level → why** for each proposed slice.
- Maximize API (or lower) for pre/postconditions; keep UI for what only UI can prove.
- Call out what **not** to automate (one-offs, pure visuals without risk, unstable third parties without a seam).

## Do not

- Default to full UI e2e for CRUD that an API already expresses.
- Skip architecture questions because “we always use Playwright/Selenide”.
- Confuse coverage count with risk reduction.

## Agent checklist

1. Summarize capability + architecture (or list blocking unknowns).
2. List candidate risks and the lowest sufficient level per risk.
3. Hand off scenario decomposition to `plan-test-scenarios`.
