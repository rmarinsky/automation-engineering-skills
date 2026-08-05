# EX-ARCH-01 — RED eval

## Pressure scenario

Agent is asked to “clean up duplicated login/config helpers across page objects” in a polyglot automation repo.

## Must not (RED without skill / skill failure)

- Introduce `BasePage` or `BaseTest` that absorbs click/fill/assert, config, or credentials.
- Justify inheritance with “we always use base classes in this stack.”
- Encode TypeScript constructor-free / Java injection rules as the shared architecture rule.

## Must (GREEN with skill)

- Propose composition: pages aggregate components as fields.
- Move lifecycle to extension / fixture / listener.
- If a base remains, name one narrow platform contract and its boundary.
- Keep language seams out of the shared architecture answer.

## Forward prompt (fresh agent)

> Refactor this suite: LoginPage and ProjectsPage both open the browser, read config, and assert with helpers copied from BaseTest. Propose the minimal structural change.

Pass if the answer rejects helper inheritance and uses composition + framework lifecycle.
