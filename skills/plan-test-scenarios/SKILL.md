---
name: plan-test-scenarios
description: >-
  Use when decomposing a capability into automated cases — apply reusable
  scenario templates (upload, auth, lists, forms, permissions) and turn them into
  an ordered backlog with levels and data needs.
---

# Plan test scenarios

## Rule

Decompose with **templates**, not blank-page brainstorming. Each case names: intent, level (from `analyze-test-scope`), data, and oracle. Grow templates in this skill when a new pattern repeats.

## Output shape

For each case:

| Field | Content |
|---|---|
| Name | Observable behavior (see `name-test-behavior`) |
| Level | unit / API / UI / e2e / contract |
| Setup | Fixture / API / seed — not manual UI clicks for preconditions |
| Act | One meaningful behavior |
| Oracle | Assertible outcome (prefer retrying/auto-waiting asserts in UI) |
| Priority | P0 release risk → P2 depth |

## Templates (extend over time)

### File upload / download

- Empty / missing file
- Minimum allowed size; maximum allowed size; over max (reject)
- Supported MIME/extension; unsupported type (reject)
- Corrupt / truncated / zero-byte disguised as valid type
- Filename edge: spaces, unicode, very long, path-like segments
- Permissions: unauthenticated, wrong role, other-tenant object
- Replace / version overwrite if product supports it
- Download: correct bytes/content-type; unauthorized download denied

### Auth / session

- Valid login; wrong password; locked / rate-limited
- Session expiry mid-flow; refresh if product has it
- Logout invalidates next protected call
- Role cannot reach admin-only surface

### Forms / validation

- Required empty; each field invalid format
- Boundary lengths (min/max)
- Idempotent resubmit / double-submit
- Server error surfaced without silent success

### Lists / search / filter

- Empty state; single hit; many hits
- Exact match; no match; special characters
- Pagination / sort stable across refresh when promised
- Permission-filtered visibility

### Permissions / multi-tenant

- Same action as owner vs stranger vs admin
- Cross-tenant ID in URL/body rejected
- UI affordance hidden **and** API denied (do not trust UI alone)

### Payments / irreversible (when in scope)

- Happy path with test doubles only
- Decline / insufficient funds
- Replay / double charge protection
- Receipt / ledger visible at API level when UI is thin

### Responsive / viewport

- One **mobile journey**: drive user actions at a narrow viewport; assert overflow or operability after each state
- Optional one **resize journey** (e.g. tablet → desktop) on the same shell
- Keep mocked breakpoint chrome (stacked layout, segmented toggles) at unit/component
- Do **not** plan an open-only matrix of `setViewport` + `goto` + `scrollWidth` (or similar) with no interaction

## Do

- Prefer **matrices** (type × size × role) over duplicated prose cases — except responsive overflow, where a thin interactive journey beats an open-only viewport matrix.
- Mark cases that share setup so the engineer uses fixtures/extensions/listeners.
- Keep P0 thin; push combinatorial depth to API when UI already proved wiring.

## Do not

- Duplicate the same oracle at UI and API without a reason.
- Encode sleeps or “get text then assert equality” as the plan’s success criteria.
- Invent product rules not evidenced by specs, code, or stakeholders.
- Ship open-only viewport × route layout-metric grids as the responsive coverage plan.

## Agent checklist

1. Pick templates that match the capability (add a new template section if none fit and the pattern will recur).
2. Emit an ordered backlog (P0 → P2) with level per case.
3. Hand off implementation to the engineer with stack still open if unknown.
