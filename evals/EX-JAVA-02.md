# EX-JAVA-02 — RED eval

## Must not
- `Thread.sleep` or `getText()` + static assert as the primary UI check.
- Unscoped XPath as the default locator.
- Blind preloader waits without trace evidence.

## Must
- Scoped component root, `isLoaded()`, Selenide `shouldBe`/`shouldHave`.
- Overlap names do not first-match.
- Missing semantic locator → testability proposal.

## Forward prompt
> Implement a Selenide ProjectsPage that filters by exact project name.
