# Swift native design choices

Prefer value semantics, enums, closures, protocol conformance, sequences, and
explicit ownership. Match XCUITest lifecycle rather than translating Java test
hierarchies.

| Pressure | Prefer |
|---|---|
| Small Strategy/Command | closure or function value |
| Closed state | enum with exhaustive `switch` |
| Iterator | `Sequence` / `IteratorProtocol` |
| Prototype/Memento | value copy or explicit snapshot value |
| Interchangeable service | focused protocol only with real conformers/boundary |
| Lifecycle | XCTest setup/teardown or explicit helper ownership |

Original Strategy example:

```swift
typealias Price = (Decimal) -> Decimal

let vipPrice: Price = { total in total * Decimal(string: "0.90")! }
let charged = vipPrice(Decimal(100))
```

Use delegate protocols when one owner sends focused callbacks and define
retention explicitly. Avoid mutable `static let shared` state in parallel tests;
inject or construct owned collaborators instead.

Sources: [Swift](https://developer.apple.com/documentation/swift),
[sequence and collection protocols](https://developer.apple.com/documentation/swift/sequence-and-collection-protocols),
and [Result](https://developer.apple.com/documentation/swift/result).
