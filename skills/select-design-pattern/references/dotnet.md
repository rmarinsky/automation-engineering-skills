# .NET native design choices

Keep the repository's existing runner and Playwright integration. Use C#
delegates, records, iterators, pattern matching, and deterministic disposal
before adding pattern classes.

| Pressure | Prefer |
|---|---|
| Small Strategy/Command | `Func<>`, `Action<>`, delegate, lambda |
| Observer | events or the existing stream/event facility |
| Immutable payload/case | `record` / `record struct` |
| Iterator | `IEnumerable<T>` and `yield` |
| Closed branch/state | enum/records plus exhaustive-enough switch expression |
| Lifecycle | `using` / `IAsyncDisposable`, runner fixtures, allowed Playwright `PageTest` |

Original Strategy example:

```csharp
using System;

Func<decimal, decimal> vipPrice = total => total * 0.90m;
decimal charged = vipPrice(100m);
```

Introduce an interface only for several cohesive operations, stateful variants,
or a real external boundary. Do not wrap `PageTest` in another BaseTest tree.

Sources: [delegates](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-specification/delegates),
[records](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/types/records), and
[pattern matching](https://learn.microsoft.com/en-us/dotnet/csharp/fundamentals/functional/pattern-matching).
