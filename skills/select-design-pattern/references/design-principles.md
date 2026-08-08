# Design principles

Use these principles to explain a current trade-off. Do not grade code by the
number of principles or patterns it visibly contains.

## OOP vocabulary

- **Abstraction:** expose the capability callers need while hiding replaceable detail.
- **Encapsulation:** keep invariants and mutation under one explicit owner.
- **Inheritance:** model a substitutable is-a contract, not a convenient helper bucket.
- **Polymorphism:** let current variants fulfill one contract when interchangeability is real.
- **Composition:** assemble smaller owners and behaviors without inheriting unrelated contracts.

## Object relations

- **Dependency:** one operation temporarily uses another capability.
- **Association:** objects know each other across a meaningful lifetime.
- **Aggregation:** an owner groups independently living parts.
- **Composition:** an owner controls a part's lifecycle or invariant.

Use the weakest relation that communicates the real ownership. Test fixtures,
pages, screens, API clients, and components usually need dependency or
composition rather than inheritance.

## Change principles

- Encapsulate only variation that exists now or has a credible approved second consumer.
- Program to a contract at external or interchangeable boundaries; a one-implementation
  interface with no boundary is usually speculative.
- Prefer composition until a complete substitutable is-a contract is demonstrated.
- Keep behavior with the data and invariant it protects.

## SOLID as diagnostic prompts

- **SRP:** Which concrete actors or rules make this module change? Split only distinct ownership.
- **OCP:** Is repeated variation forcing edits to stable code? Fix defects directly; do not subclass around them.
- **LSP:** Can every subtype preserve accepted inputs, promised outputs, errors, invariants, and side effects?
- **ISP:** Do callers depend only on operations they use? Do not fragment an interface into ceremony.
- **DIP:** Is this a real volatile/external boundary? Express it in domain terms and keep details behind it.

Apply KISS, DRY, DAMP, and YAGNI alongside SOLID. Remove duplicated knowledge,
but keep tests explicit when abstraction would hide the scenario.
