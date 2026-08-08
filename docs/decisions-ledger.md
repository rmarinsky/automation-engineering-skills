# Automation skills — decisions ledger

Source review: [automation-skills-approval-review.html](./automation-skills-approval-review.html)

Status: **all 20 promoted IDs resolved**. Skills promote only after RED eval + skill change + `node scripts/verify-skills.mjs`.

## Decisions

| ID | Decision | Skill target |
|---|---|---|
| EX-PATTERN-01 | APPROVE — direct/native/framework/existing abstraction before named pattern | `skills/select-design-pattern` |
| EX-PATTERN-02 | APPROVE — adapt to JVM, Python, .NET, TypeScript/JavaScript, and Swift idioms | `skills/select-design-pattern` |
| EX-REFACTOR-01 | APPROVE — behavior-preserving slices, characterization baseline, targeted then broader checks | `skills/refactor-code-safely` |
| EX-SMELL-01 | APPROVE — evidence and risk before smell; preserve DAMP tests and valid data carriers | `skills/diagnose-code-smells` |
| EX-ARCH-01 | CHANGE — language-agnostic composition; language seams stay in language skills | `skills/compose-test-architecture` |
| EX-NAME-01 | APPROVE — behavior names, domain verbs, target/expected | `skills/name-test-behavior` |
| EX-JAVA-01 | APPROVE — JUnit 5 parameterization + immutable cases | `skills/junit-java` |
| EX-JAVA-02 | APPROVE — Selenide pages/components + conditions | `skills/selenide-java` |
| EX-JAVA-03 | CHANGE — extension over BaseTest; simplest extension first | `skills/junit-java` |
| EX-TESTNG-01 | CHANGE — support existing TestNG; no JUnit 5 nag after «no» | `skills/testng-java` |
| EX-PY-01 | APPROVE — pytest immutable cases + stable IDs | `skills/playwright-python` |
| EX-PY-02 | APPROVE — Python pages/components without BasePage plumbing | `skills/playwright-python` |
| EX-API-01 | APPROVE — Playwright API default; Axios only when already present | `skills/api-automation` |
| EX-MOBILE-01 | CHANGE — native-first; maximize API pre/post; deep links; local SUT clones for architecture agent | `skills/choose-mobile-automation-stack` |
| EX-CS-01 | APPROVE — Playwright .NET + retain existing runner | `skills/playwright-dotnet` |
| EX-IOS-01 | CHANGE — XCUITest; native locators OK; never XPath; testability first | `skills/xcuitest-ios` |
| EX-ANDROID-01 | CHANGE — Kakao; native locators OK; never XPath; testability first | `skills/kakao-android` |
| EX-RN-01 | CHANGE — Detox; native locators OK; never XPath; testability first | `skills/detox-react-native` |
| EX-CONTRACT-01 | APPROVE — runtime models + schema when real source exists | `skills/api-contract-testing` |
| EX-CI-01 | APPROVE — preflight before full regression | `skills/ci-fail-fast` |

## Already-approved references (not re-opened)

`EX-TS-01`, `EX-TS-02`, `EX-TS-03`, `EX-JAVA-API-01`, `EX-DATA-01` — reference material lives in language/API skills and the review deck.
