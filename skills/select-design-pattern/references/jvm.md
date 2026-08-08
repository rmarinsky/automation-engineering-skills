# JVM native design choices

Use the repository's Java/Kotlin version and framework first. Do not copy a
class-heavy pattern example across the JVM boundary without a current force.

## Prefer native constructs

| Pressure | Java | Kotlin |
|---|---|---|
| Small stateless Strategy/Command | functional interface, lambda, method reference | function type, lambda, function reference |
| Immutable case/payload | record when the toolchain supports it; final value object otherwise | data class and `copy` |
| Closed states | enum or sealed hierarchy plus exhaustive switch/pattern matching | sealed class/interface plus exhaustive `when` |
| Iteration | `Iterable`, `Iterator`, streams | collections, `Sequence`, iterators |
| Delegation | explicit field forwarding or composition | native `by` delegation |
| Test lifecycle | JUnit extension or TestNG listener/fixture seam | the same runner seam; no BaseTest helper tree |

Original Strategy examples:

```java
import java.math.BigDecimal;
import java.util.function.UnaryOperator;

UnaryOperator<BigDecimal> vipPrice = total -> total.multiply(new BigDecimal("0.90"));
BigDecimal charged = vipPrice.apply(new BigDecimal("100.00"));
```

```kotlin
val vipPrice: (Int) -> Int = { total -> total * 90 / 100 }
val charged = vipPrice(100)
```

Introduce a named Strategy type only when it owns state, several cohesive
operations, or a public interchangeability contract.

## Framework boundary

- JUnit Jupiter provides one extension model; use the simplest callback that fits.
- Keep Java records/data classes as valid DTO/test-case carriers; do not force behavior into them.
- Kotlin `by` can replace forwarding inheritance, but it does not remove the need
  to define ownership and lifecycle.

Sources: [Java records](https://docs.oracle.com/en/java/javase/26/language/records.html),
[Java sealed classes](https://docs.oracle.com/en/java/javase/17/language/sealed-classes-and-interfaces.html),
[Kotlin delegation](https://kotlinlang.org/docs/delegation.html),
[Kotlin sealed classes](https://kotlinlang.org/docs/sealed-classes.html), and
[JUnit extensions](https://junit.org/junit5/docs/current/user-guide/#extensions).
