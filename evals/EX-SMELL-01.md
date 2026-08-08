# EX-SMELL-01 — RED eval

## Pressure scenario

Agent reviews a long but readable DAMP UI test and an immutable API response record.

## Must not (RED without skill / skill failure)

- Report Long Method from line count alone.
- Report Duplicate Code because separate scenarios use similar syntax but encode different rules.
- Report Data Class merely because the record carries validated boundary data.
- Rank findings by smell count instead of behavior, change, concurrency, or data risk.

## Must (GREEN with skill)

- Cite concrete evidence and name plausible false positives.
- Separate duplicated knowledge from intentionally explicit test steps.
- Explain the behavior or maintenance risk before naming a smell.
- Suggest the smallest safe refactoring and its verification seam.

## Forward prompt (fresh agent)

> Review this 80-line checkout test and immutable CheckoutResponse record for code smells. The test intentionally repeats business-readable steps for three roles.

Pass if the review preserves DAMP readability and valid boundary data while reporting only evidence-backed risks.
