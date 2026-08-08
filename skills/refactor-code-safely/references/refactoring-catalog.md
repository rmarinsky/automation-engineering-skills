# Refactoring catalog

Choose one transformation that addresses the current evidence. Each entry names
a useful precondition and the main behavior risk to verify.

## Contents

- Composing methods (9)
- Moving features between objects (8)
- Organizing data (15)
- Simplifying conditionals (8)
- Simplifying calls (14)
- Generalization (12)

## Composing methods (9)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Extract Method | A coherent intention is buried inside Long Method or Duplicate Code. | Preserve local mutation, exception timing, waits, and diagnostics. |
| Inline Method | A trivial indirection adds no intent or policy. | Keep it when the name is the useful abstraction. |
| Extract Variable | A complex expression needs a named intermediate concept. | Confirm evaluation count and side effects do not change. |
| Inline Temp | A temporary merely aliases a clear expression and blocks another move. | Keep it when it captures one evaluation or a stable snapshot. |
| Replace Temp with Query | Several branches need the same side-effect-free derived value. | Do not repeat expensive, time-sensitive, or retrying work. |
| Split Temporary Variable | One variable represents unrelated values over its lifetime. | Preserve assignment order and mutation semantics. |
| Remove Assignments to Parameters | Reassigning an input obscures the original contract. | Introduce a local and preserve reference/value semantics. |
| Replace Method with Method Object | A truly complex algorithm needs many local values across steps. | Prefer Extract Method first; avoid a single-use class for a simple routine. |
| Substitute Algorithm | A simpler proven algorithm expresses the same behavior. | Compare independent examples, boundaries, complexity, and ordering before deleting the old path. |

## Moving features between objects (8)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Move Method | Behavior primarily uses another owner's data or policy. | Preserve visibility, dependency direction, and acceptance assertions. |
| Move Field | State belongs with the behavior that protects its invariant. | Check serialization, lifecycle, equality, and concurrency. |
| Extract Class | One class has distinct reasons to change. | Define ownership; do not create two tightly coupled halves. |
| Inline Class | A class no longer owns enough policy to justify indirection. | Keep a small class if it isolates a volatile external boundary. |
| Hide Delegate | Callers leak a collaborator's internal navigation chain. | Add one focused domain operation, not a god facade. |
| Remove Middle Man | Forwarding methods add neither policy nor boundary value. | Confirm direct callers will not absorb vendor churn. |
| Introduce Foreign Method | One helper operation is missing from a type you cannot edit. | Keep it near the caller and check upstream has no equivalent. |
| Introduce Local Extension | Several coherent operations must extend an external type. | Prefer language extension mechanisms; track version compatibility. |

## Organizing data (15)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Self Encapsulate Field | Direct field access blocks validation or a storage change. | Avoid ceremonial accessors with no current boundary. |
| Replace Data Value with Object | A primitive carries repeated domain rules. | Add the type only when it owns validation or behavior. |
| Change Value to Reference | Multiple instances must represent one shared identity. | Define identity, cache lifetime, and concurrency. |
| Change Reference to Value | Shared identity is unnecessary and immutability is clearer. | Check equality and copy cost. |
| Replace Array with Object | Positional elements have distinct meanings and invariants. | Preserve serialization/order contracts at boundaries. |
| Duplicate Observed Data | UI or view state must mirror a domain source temporarily. | Establish synchronization and one source of truth; framework binding may be better. |
| Change Unidirectional Association to Bidirectional | Both owners require direct navigation and updates. | Define mutation ownership and prevent inconsistent links. |
| Change Bidirectional Association to Unidirectional | One direction is unused or creates coupling. | Search all callers and persistence mappings before removal. |
| Replace Magic Number with Symbolic Constant | A literal encodes a stable domain or protocol rule. | Verify every occurrence; identical numbers may mean different things. |
| Encapsulate Field | External mutation violates invariants. | Prefer immutable construction where practical. |
| Encapsulate Collection | Callers mutate owned state without validation. | Return a read-only view/copy and expose focused add/remove operations. |
| Replace Type Code with Class | A code has validation or behavior but no subtype variation. | An enum/sealed union may be the native smaller option. |
| Replace Type Code with Subclasses | Open-ended variants own recurring different behavior. | Avoid for one closed exhaustive branch; verify substitutability. |
| Replace Type Code with State/Strategy | Behavior changes independently at runtime. | A function/closure or dispatch table may be enough. |
| Replace Subclass with Fields | Subclasses differ only by fixed data. | Use enum/record/value instances and preserve serialization. |

## Simplifying conditionals (8)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Decompose Conditional | A policy decision and its branches need intention-revealing names. | Isolate side effects before moving code. |
| Consolidate Conditional Expression | Several checks lead to one outcome and represent one rule. | Keep separate guards when they need distinct diagnostics. |
| Consolidate Duplicate Conditional Fragments | Both branches repeat identical work. | Confirm evaluation order and exceptions remain unchanged. |
| Remove Control Flag | A mutable flag simulates loop or function control flow. | Use return/break/continue without skipping cleanup. |
| Replace Nested Conditional with Guard Clauses | Exceptional cases obscure the normal path. | Preserve precedence when multiple conditions overlap. |
| Replace Conditional with Polymorphism | The same open variation repeats and each variant owns behavior. | Closed enum/sealed match or Strategy function may be smaller. |
| Introduce Null Object | Callers repeat one stable neutral behavior for absence. | Do not hide missing required data or operational failures. |
| Introduce Assertion | An internal invariant must fail near its cause. | Use handled validation/errors for user or external input. |

## Simplifying calls (14)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Rename Method | The name no longer communicates domain behavior. | Preserve public compatibility or migrate all callers atomically. |
| Add Parameter | A caller must provide new information the callee cannot own. | Prefer an existing object/query when the value is already available. |
| Remove Parameter | An argument is no longer used or meaningful. | Check reflective, serialized, and public callers. |
| Separate Query from Modifier | A read-like call hides a surprising state change. | Keep explicit command results when the result is part of the command contract. |
| Parameterize Method | Similar methods differ only by a true data value. | Use explicit methods when values represent different domain operations. |
| Replace Parameter with Explicit Methods | A flag/type parameter selects distinct business actions. | Avoid an explosion of methods for simple closed data. |
| Preserve Whole Object | Callers unpack many values from one cohesive owner. | Do not pass a broad object that exposes unrelated data. |
| Replace Parameter with Method Call | The callee can obtain a stable value from its existing dependency. | Avoid hiding expensive or time-sensitive evaluation. |
| Introduce Parameter Object | Repeated parameters form one domain concept or data clump. | Make it immutable; do not create a generic options bag. |
| Remove Setting Method | State should be fixed at construction or controlled by domain operations. | Preserve deserialization/framework construction requirements. |
| Hide Method | A method is not part of the supported public contract. | Check framework discovery, reflection, and external callers. |
| Replace Constructor with Factory Method | Construction needs a named variant, validation, or subtype choice. | A plain language factory function is usually enough. |
| Replace Error Code with Exception | Callers repeatedly decode failure values and the language has exceptions. | Preserve expected negative results; do not use exceptions for normal branching. |
| Replace Exception with Test | A predictable condition can be checked before an exceptional operation. | Avoid time-of-check/time-of-use races and duplicate expensive work. |

## Generalization (12)

| Refactoring | Apply when / typical smell | Safety check or alternative |
|---|---|---|
| Pull Up Field | True subtypes duplicate the same state and invariant. | Confirm all subtypes need it; composition may be clearer. |
| Pull Up Method | True subtypes duplicate identical behavior. | Keep variant behavior local and preserve substitutability. |
| Pull Up Constructor Body | Subtypes repeat invariant initialization. | Preserve initialization order and overridable-call hazards. |
| Push Down Method | Only some subtypes can honor inherited behavior. | Refused Bequest may instead require delegation. |
| Push Down Field | State is meaningful only for selected subtypes. | Check serialization and shared callers. |
| Extract Subclass | A credible subset owns additional behavior or state. | Do not subclass for one flag or fixed data value. |
| Extract Superclass | Multiple real types share a stable substitutable contract and implementation. | Prefer composition/interface when code reuse is the only reason. |
| Extract Interface | Multiple current implementations or a real external boundary share a contract. | Do not create a one-implementation interface speculatively. |
| Collapse Hierarchy | Parent and child no longer express distinct substitutable concepts. | Preserve public type compatibility where required. |
| Form Template Method | True subtypes share an algorithm with stable variation points. | Prefer fixtures, hooks, composition, or functions in test code. |
| Replace Inheritance with Delegation | A subtype cannot honor the parent contract or inherits irrelevant behavior. | Define the smaller delegated surface and update callers incrementally. |
| Replace Delegation with Inheritance | The delegate is genuinely substitutable and nearly its whole contract is exposed. | High scrutiny: keep delegation when only code reuse motivates inheritance. |
