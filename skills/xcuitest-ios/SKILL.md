---
name: xcuitest-ios
description: >-
  Use when automating native iOS UI with XCUITest — accessibility identifiers,
  deep links, API fixtures, or rejecting XPath workarounds.
---

# XCUITest iOS

Decision: **EX-IOS-01**. Follow `choose-mobile-automation-stack` for strategy.

## Contract

- Add/use an Xcode UI Test Target; run via existing `xcodebuild test` scheme.
- Prefer stable `accessibilityIdentifier`; other native XCUITest queries (label, type, non-XPath predicates) are OK.
- **XPath is forbidden.** Unstable locator → improve **testability** (ID/deep link) first.
- Use `waitForExistence` for readiness — never `sleep`.
- API fixture owns create/cleanup; UI keeps journey + visible outcome.

## Eval

See `evals/EX-IOS-01.md`.
