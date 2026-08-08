---
name: refactor-code-safely
description: >-
  Use when implementing a behavior-preserving refactor in production or test
  code, addressing code-smell findings, replacing unsafe inheritance, moving
  responsibilities, or restructuring code through small verified slices.
---

# Refactor code safely

Decision: **EX-REFACTOR-01**.

## Contract

Preserve observable behavior while improving structure. Trace the shared seam
and all relevant callers before moving code; a small edit at the wrong boundary
is not a safe refactor.

## Workflow

1. State the behavior that must remain unchanged and trace its callers.
2. Find the closest owning test and the real runner/system seam.
3. For a defect or behavior change, reproduce RED before the fix. For a pure
   structural refactor, establish a green characterization baseline; never
   invent a functional failure merely to satisfy ceremony.
4. Apply one mechanical transformation from the catalog.
5. Run the targeted check and review the diff for behavior drift.
6. Keep the slice green, then repeat only if another change is required.
7. Run relevant broader checks and system evidence before completion.

## Guardrails

- Do not rewrite every caller or subclass in one horizontal pass.
- Preserve lifecycle order, cleanup ownership, errors, retries, and concurrency.
- Prefer IDE/compiler-supported rename, move, and extract operations when present.
- Do not combine refactoring with unrelated feature changes.
- Do not rename a public API for aesthetics unless compatibility is in scope.
- A passing unit test proves only its exercised behavior; verify the real seam.

## Naming while refactoring

- Name methods/functions by domain intent, not implementation mechanics.
- Use predicate names for booleans and query names only for side-effect-free reads.
- Separate a query from a modifier when hidden mutation surprises callers.
- Preserve repository vocabulary and symmetric domain verbs.

## Reference

Read [references/refactoring-catalog.md](references/refactoring-catalog.md) to
select one current transformation. Use it as a menu, not a checklist.

## Return

- Behavior baseline and owning test
- Slice applied and callers affected
- Targeted and broader checks
- Unverified system behavior or remaining risk

## Eval

See `evals/EX-REFACTOR-01.md`.
