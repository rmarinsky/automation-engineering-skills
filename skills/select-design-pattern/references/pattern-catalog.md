# Design pattern catalog

This catalog covers 22 patterns. `Interpreter` is intentionally out of scope.
Use the selection ladder before this file; pattern names are shared vocabulary,
not implementation requirements.

## Contents

- Creational patterns
- Structural patterns
- Behavioral patterns

## Creational patterns

| Pattern | Current forces and automation example | Prefer first | Cost, failure mode, and verification |
|---|---|---|---|
| Factory Method | Construction varies by a real subtype/extension point; e.g. a runner creates platform-specific sessions. | Plain factory function or framework fixture. | Indirection and hidden lifecycle; verify every product path and cleanup. |
| Abstract Factory | Several related product families must stay compatible; e.g. truly parallel web/mobile component families. | Explicit composition roots per platform. | Many paired types and lockstep hierarchies; verify supported family combinations. |
| Builder | Valid construction is staged, conditional, or has many cohesive optional values; e.g. a complex signed API request. | Named arguments, object literal, record/data-class copy, fixture. | Invalid intermediate states and fluent ceremony; verify defaults, invariants, and final payload. |
| Prototype | Expensive/configured objects need controlled copies. | Native copy/clone/spread/value semantics. | Shallow-copy leaks and shared mutation; verify nested identity and isolation. |
| Singleton | One process-wide identity is an unavoidable platform constraint. | Fixture/container/module value with explicit ownership. | Global coupling, order dependence, and parallel-test races; verify reset/lifecycle. Avoid mutable Singleton by default. |

## Structural patterns

| Pattern | Current forces and automation example | Prefer first | Cost, failure mode, and verification |
|---|---|---|---|
| Adapter | A volatile external/framework contract must expose stable domain operations; e.g. vendor API response to test-domain model. | Direct typed wrapper if only a few operations exist. | Leaky translation and swallowed errors; contract-test both sides. |
| Bridge | Two dimensions vary independently; e.g. device platform and reusable domain control both have multiple implementations. | Separate composition per current platform. | Complex cross-product and lowest-common-denominator APIs; verify each supported pairing. |
| Composite | Callers must treat leaves and real object trees uniformly; e.g. page contains nested reusable components. | Plain aggregation when traversal/uniform operations are unnecessary. | Hidden tree traversal and broad interfaces; verify leaf and nested behavior. |
| Decorator | Responsibilities stack independently; e.g. diagnostics around an API transport. | Function wrapper, middleware, framework hook, or language decorator. | Ordering, duplicate effects, and hidden primary failure; verify every ordering used. |
| Facade | Several collaborators form one cohesive domain operation; e.g. create project through a typed API client. | Direct calls while the flow is small and used once. | God object and hidden assertions/waits; verify domain outcome and exposed errors. |
| Flyweight | Measured memory pressure comes from many identical immutable values. | Interning/cache provided by platform or no optimization. | Shared mutable state and premature complexity; benchmark and verify identity assumptions. |
| Proxy | Access needs lazy, remote, security, or virtualization control; e.g. framework-owned network interception. | Existing framework mock/proxy/remote client. | Behavior drift from the real target; run contract/system evidence. |

## Behavioral patterns

| Pattern | Current forces and automation example | Prefer first | Cost, failure mode, and verification |
|---|---|---|---|
| Chain of Responsibility | Independent handlers form an ordered request/lifecycle pipeline. | Framework middleware, fixture composition, extension/listener chain. | Order-dependent behavior and swallowed errors; verify order, short-circuit, and cleanup. |
| Command | An operation must be queued, logged, retried, or undone; e.g. controlled environment setup/cleanup. | Function/closure and explicit cleanup block. | Command-class explosion and hidden state; verify execution, idempotency, and rollback. |
| Iterator | Consumers need sequential access without collection internals. | Language iterator/generator/sequence protocol. | Reinvented traversal and invalid concurrent mutation; verify order and exhaustion. |
| Mediator | Several peers need one explicit coordination policy. | Small orchestration function/fixture. | God coordinator and invisible coupling; verify peer isolation and event order. |
| Memento | State needs opaque snapshot/rollback; e.g. transaction or storage-state restoration. | Database transaction, value copy, framework snapshot. | Large/stale snapshots and secret leakage; verify restore fidelity and data handling. |
| Observer | Consumers react to events independently; e.g. await an emitted domain outcome. | Native event/stream/callback facility. | Leaks, nondeterminism, and missed events; verify subscription lifecycle and ordering. |
| State | Behavior changes with explicit current state and transitions repeat. | Enum/sealed/discriminated union with exhaustive match. | Class proliferation and invalid transitions; verify transition table and terminal states. |
| Strategy | A current algorithm varies independently; e.g. pricing or environment selection. | Function, closure, delegate, or callable object. | One-class-per-function ceremony; verify every strategy against the same contract cases. |
| Template Method | True subtypes share a stable algorithm with constrained variation points. | Runner fixture/extension/listener, hooks, or composition. | Rigid BaseTest hierarchy and hidden flow; verify lifecycle order and substitutability. |
| Visitor | Many stable operations traverse a closed, stable element model; e.g. multiple exports of a fixed result tree. | Exhaustive pattern match, serializer, or operation functions. | Adding element types touches every visitor; verify every element-operation pair. |
