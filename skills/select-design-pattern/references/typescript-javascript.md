# TypeScript and JavaScript native design choices

Prefer functions, object literals, unions, iterables, modules, and framework
fixtures before nominal pattern hierarchies.

| Pressure | Prefer |
|---|---|
| Small Strategy/Command | function, closure, typed callback |
| Builder | object literal, defaults, spread, focused factory function |
| Closed state | discriminated union with exhaustive narrowing |
| Iterator | array/collection iteration, generator, `Symbol.iterator` |
| Decorator/chain | higher-order function, middleware, Playwright fixture |
| Observer | platform `EventTarget` or existing framework/event facility |

Original Strategy example:

```typescript
type Price = (total: number) => number;

const checkout = (total: number, price: Price): number => price(total);
const charged = checkout(100, total => total * 0.9);
```

Original closed-state example:

```typescript
type CheckoutState =
  | { kind: "ready" }
  | { kind: "failed"; reason: string };
```

Add a class/interface only when state, several operations, runtime identity, or
a published boundary earns it. Use Playwright fixtures for test resources; do
not create mutable browser Singletons.

Sources: [TypeScript unions](https://www.typescriptlang.org/docs/handbook/unions-and-intersections.html),
[iterators](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html),
and [Playwright fixtures](https://playwright.dev/docs/test-fixtures).
