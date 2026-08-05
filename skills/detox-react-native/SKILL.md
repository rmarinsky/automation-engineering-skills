---
name: detox-react-native
description: >-
  Use when automating React Native E2E with Detox — testID, native matchers,
  API pre/postconditions, or rejecting XPath and arbitrary waits.
---

# Detox React Native

Decision: **EX-RN-01**. Follow `choose-mobile-automation-stack` for strategy.

## Contract

- Forward unique `testID` to native views; other native Detox matchers (id, label, traits) are OK.
- **XPath is forbidden.** Text-only/XPath workarounds → improve **testability** (`testID`/deep link) first.
- Let Detox synchronize; no arbitrary timeout waits.
- Keep runner/build in the existing RN repo — no parallel mobile test project.
- API owns pre/postconditions when available.

## Eval

See `evals/EX-RN-01.md`.
