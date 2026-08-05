# EX-TESTNG-01 — RED eval

## Must not
- Create `testng.xml`.
- Keep proposing JUnit 5 migration after the user said no.
- Put business acceptance asserts inside a Listener.
- Enable parallel providers without isolation proof.

## Must
- Improve existing TestNG via Listener + build config.
- Capture failure artifacts without masking the primary exception.

## Forward prompt
> Repo is TestNG. User already refused JUnit 5. Add failure artifacts and a role precondition safely.
