---
name: kakao-android
description: >-
  Use when automating native Android UI with Kakao — View/Compose screens,
  resource IDs, contentDescription, API fixtures, or rejecting XPath.
---

# Kakao Android

Decision: **EX-ANDROID-01**. Follow `choose-mobile-automation-stack` for strategy.

## Contract

- Prefer Kakao DSL as the public Android skill surface (Compose vs View — do not mix in one screen object).
- Resource IDs, `contentDescription`, and other native Kakao/Espresso matchers are OK.
- **XPath is forbidden.** Missing locator → improve **testability** first.
- Rely on Espresso idling — no `Thread.sleep`.
- Create/cleanup test data through API when a seam exists.

## Eval

See `evals/EX-ANDROID-01.md`.
