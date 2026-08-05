# EX-API-01 — RED eval

## Must not
- Add Axios into a shared Playwright E2E suite “for convenience.”
- Hide two transports behind one interface.
- Let cleanup failures swallow the primary assertion failure.

## Must
- Default to Playwright `APIRequestContext` typed client.
- Fixture-owned cleanup; separate success vs negative methods.

## Forward prompt
> Add a create-project API helper for Playwright Test fixtures.
