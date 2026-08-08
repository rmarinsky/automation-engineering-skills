# Patterns by test surface

Patterns belong mainly in reusable infrastructure and boundaries. Keep each
scenario linear, behavior-readable, and explicit about its oracle.

| Surface | Useful candidates | Guardrail |
|---|---|---|
| UI / component | Composite for a real component tree; Facade for a cohesive user action; Adapter at a vendor/framework boundary. | Do not make every page a subtype or hide acceptance assertions inside a facade. |
| API | Adapter for transport-to-domain translation; Facade for cohesive operations; Builder for genuinely complex valid requests. | Do not hide two transports behind one interface or add a builder for a small payload. |
| Integration | Adapter, Strategy, and native Observer/event seams. | Preserve the real service contract and failure modes. |
| E2E / system | Facade for business setup, Observer for eventual outcomes, Command/Memento for controlled setup and rollback. | UI owns the visible journey; helpers must not silently assert acceptance. |
| Mobile | Native screen composition; Bridge only when platform and product variation both have current implementations. | Do not create a cross-platform lowest-common-denominator hierarchy. |
| Test lifecycle | Framework fixture, extension, listener, rule, or middleware chain. | A named Template Method does not justify `BaseTest` inheritance. |

## Pattern pressure by responsibility

- **Construction:** start with fixtures, functions, records, and object literals;
  use Builder/Factory only when construction itself owns current policy.
- **Variation:** start with functions, delegates, unions, and framework options;
  use Strategy/State when behavior and lifecycle justify a named owner.
- **Boundaries:** Adapter and Facade are useful only when they stabilize a real
  external contract or cohesive domain operation.
- **Diagnostics:** use framework hooks or decorators while preserving the primary
  exception and cleanup failures.
- **Reuse:** prefer components and DAMP scenarios over broad inheritance or
  speculative common layers.
