---
name: diagnose-code-smells
description: >-
  Use for read-only review of production or test code when looking for code
  smells, maintainability risks, unsafe coupling, change amplification, or an
  evidence-backed refactoring backlog without changing code.
---

# Diagnose code smells

Decision: **EX-SMELL-01**.

## Rule

Name a smell only after showing concrete evidence and the behavior, change,
concurrency, or data risk it creates. A smell is an investigation prompt, not
a verdict from line counts or class shape.

## Review workflow

1. Trace the behavior and relevant callers before judging a local fragment.
2. State the evidence and risk before naming the smell.
3. Check the catalog's false positives and the repository's conventions.
4. Distinguish duplicated **knowledge** from intentionally explicit DAMP tests.
5. Suggest the smallest safe refactoring and its verification seam.
6. Rank findings by risk; omit style-only observations with no practical cost.

## Guardrails

- A long readable DAMP scenario is not automatically Long Method.
- Similar syntax is not Duplicate Code when it expresses different rules.
- DTOs, records, events, and immutable test cases are valid data carriers.
- Exhaustive `switch` / `when` over a closed state can be the native design.
- Framework-owned fixture state is acceptable unless ownership, lifecycle, or
  parallel execution is unsafe.
- Comments may preserve a ticket, external contract, non-obvious risk, or timing
  reason that the code cannot express.
- Do not prescribe a named pattern merely to remove a smell.

## Reference

Read [references/smell-catalog.md](references/smell-catalog.md) when classifying
a finding or preparing a whole-codebase backlog.

## Report

| Severity | Evidence | Smell / risk | Smallest safe change | Verification |
|---|---|---|---|---|

Use Blocker only for credible correctness, security, privacy, data-loss, or
concurrency risk. Use Major for costly change amplification or likely defects.
Do not report a Nit unless the user requested style feedback.

## Eval

See `evals/EX-SMELL-01.md`.
