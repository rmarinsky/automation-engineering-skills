# Python native design choices

Prefer functions, protocols, generators, context managers, and data classes
before translating nominal class patterns.

| Pressure | Prefer |
|---|---|
| Small Strategy/Command | function, closure, callable |
| Structural contract | `typing.Protocol`; use ABC only when runtime/nominal semantics matter |
| Builder | keyword arguments, factory function, immutable dataclass, `replace` |
| Iterator | generator or iterator protocol |
| Decorator/lifecycle | function decorator, `contextlib.contextmanager`, fixture |
| Type-based dispatch | `functools.singledispatch` when dispatch truly follows runtime type |

Original Strategy example:

```python
from collections.abc import Callable
from decimal import Decimal

Price = Callable[[Decimal], Decimal]

def checkout(total: Decimal, price: Price) -> Decimal:
    return price(total)

charged = checkout(Decimal("100.00"), lambda value: value * Decimal("0.90"))
```

Do not introduce a Strategy class until the variant owns state, multiple
operations, or a stable public contract. Use a fixture/context manager for
resource ownership instead of mutable Singleton state.

Sources: [functools](https://docs.python.org/3/library/functools.html),
[contextlib](https://docs.python.org/3/library/contextlib.html), and
[typing.Protocol](https://docs.python.org/3/library/typing.html#typing.Protocol).
