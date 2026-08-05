---
name: choose-mobile-automation-stack
description: >-
  Use when choosing mobile automation approach — iOS, Android, React Native,
  Appium vs native, API preconditions, deep links, or which repos to clone for context.
---

# Choose mobile automation stack

Decision: **EX-MOBILE-01** (strategy). Platform details: `xcuitest-ios`, `kakao-android`, `detox-react-native`.

## Selection (native-first)

1. iOS native → XCUITest  
2. Android native → Kakao (not raw Espresso as the public default)  
3. React Native → Detox  
4. **Appium** only when a shared cross-platform suite clearly beats native duplication (lowest priority)

Accessibility IDs and other native locators are OK. **Never XPath** — improve testability first.

## API-first pre/postcondition

- Maximize API/GraphQL/gateway for **precondition** and **postcondition**.
- Exception: a separate vendor/team already owns backend automation with their own tools/testers.
- UI verifies the user-visible journey; do not build long state via clicks when an API seam exists.

## Deep links + local SUT context

- Prefer deep links to open target screens quickly.
- **Architecture / structure agent** asks to **clone** related SUT repos locally next to the autotest repo: app, frontend, BFF/proxy, GraphQL/gateway, backends, DB-related services.
- Use that context to propose testability (IDs, deep links, API seams). Language skill agents do not re-run full discovery every time.

## Eval

See `evals/EX-MOBILE-01.md`.
