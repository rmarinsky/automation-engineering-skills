# Code smell catalog

Use these entries as hypotheses. Confirm behavior and local constraints before
reporting a smell.

## Contents

- Bloaters
- Object-orientation abusers
- Change preventers
- Dispensables
- Couplers
- Library gap

## Bloaters

### Long Method

- **Signal:** one routine mixes several named intentions or hides important branches.
- **Automation:** a scenario performs setup, UI flow, parsing, and cleanup inline.
- **False positive:** a linear DAMP scenario whose business steps read better together.
- **Candidates:** Extract Method, Replace Temp with Query, Decompose Conditional.
- **Verify:** step order, failure location, cleanup, and retry behavior.

### Large Class

- **Signal:** unrelated reasons to change collect behind one stateful object.
- **Automation:** a page object owns navigation, API setup, assertions, and reporting.
- **False positive:** a cohesive protocol adapter with many required operations.
- **Candidates:** Extract Class, Move Method, Move Field.
- **Verify:** public contract, ownership, and lifecycle.

### Primitive Obsession

- **Signal:** repeated raw values carry invariants the type system cannot express.
- **Automation:** roles, money, status, or environment IDs are loose strings.
- **False positive:** one obvious literal with no invariant or reuse.
- **Candidates:** Replace Data Value with Object, Replace Type Code with Class.
- **Verify:** boundary serialization and invalid-value handling.

### Long Parameter List

- **Signal:** callers repeatedly pass cohesive values or cannot explain arguments.
- **Automation:** a fixture takes browser, user, role, locale, project, and cleanup flags.
- **False positive:** a stable public boundary where a wrapper only renames arguments.
- **Candidates:** Introduce Parameter Object, Preserve Whole Object, Replace Parameter with Method Call.
- **Verify:** defaults, call-site readability, and parameter ownership.

### Data Clumps

- **Signal:** the same subset of values travels together across several APIs.
- **Automation:** credentials plus tenant and role recur across setup helpers.
- **False positive:** protocol fields that coincide in one request only.
- **Candidates:** Introduce Parameter Object, Extract Class.
- **Verify:** the new object represents one concept rather than a generic bag.

## Object-orientation abusers

### Switch Statements

- **Signal:** the same open-ended variant switch repeats across behavior owners.
- **Automation:** browser, platform, or user-role branches recur in pages and fixtures.
- **False positive:** one exhaustive match over a closed enum or sealed union.
- **Candidates:** Replace Conditional with Polymorphism, Strategy, explicit dispatch table.
- **Verify:** exhaustive variants, defaults, and unknown input.

### Temporary Field

- **Signal:** object state is meaningful only during one hidden phase.
- **Automation:** a shared fixture stores transient test data across callbacks.
- **False positive:** runner-managed state with clear ownership and isolation.
- **Candidates:** Extract Class, Move Method, local value or fixture return value.
- **Verify:** parallel isolation and cleanup after failures.

### Refused Bequest

- **Signal:** a subtype disables, ignores, or cannot honor inherited behavior.
- **Automation:** a mobile screen inherits web helpers it must override or reject.
- **False positive:** a narrow platform base whose full contract stays substitutable.
- **Candidates:** Replace Inheritance with Delegation, Extract Interface.
- **Verify:** callers do not rely on discarded parent behavior.

### Alternative Classes with Different Interfaces

- **Signal:** interchangeable implementations expose inconsistent domain operations.
- **Automation:** web and mobile clients model one capability with unrelated verbs.
- **False positive:** platforms genuinely expose different user contracts.
- **Candidates:** Rename Method, Move Method, Adapter.
- **Verify:** platform-specific failures and capabilities.

## Change preventers

### Divergent Change

- **Signal:** one module changes for unrelated product or infrastructure reasons.
- **Automation:** one helper changes for auth, reporting, selectors, and API schemas.
- **False positive:** a small stable boundary module with cohesive operations.
- **Candidates:** Extract Class, Move Method.
- **Verify:** dependency direction and public API clarity.

### Shotgun Surgery

- **Signal:** one rule change requires coordinated edits across many owners.
- **Automation:** a login or locator change touches every scenario.
- **False positive:** generated or intentionally explicit conformance cases.
- **Candidates:** Move Method, Extract Class, centralize duplicated knowledge.
- **Verify:** search every caller and preserve scenario-specific differences.

### Parallel Inheritance Hierarchies

- **Signal:** adding one subtype forces a matching subtype elsewhere.
- **Automation:** every browser creates matching page, test, and factory subclasses.
- **False positive:** independently versioned protocol families with compatibility rules.
- **Candidates:** Move Method, Move Field, composition, Strategy.
- **Verify:** supported combinations and construction paths.

## Dispensables

### Comments

- **Signal:** prose restates code or compensates for unclear names and structure.
- **Automation:** comments narrate every click or assertion.
- **False positive:** ticket, risk, external rule, timing reason, or workaround expiry.
- **Candidates:** Rename Method, Extract Method, Introduce Assertion.
- **Verify:** do not delete provenance or operational constraints.

### Duplicate Code

- **Signal:** one business rule or transformation has multiple editable sources.
- **Automation:** the same login contract or response mapping is copied across suites.
- **False positive:** similar DAMP steps represent distinct journeys or outcomes.
- **Candidates:** Extract Method, Move Method, Form Template Method only at a real platform seam.
- **Verify:** variants remain explicit and failures stay local.

### Lazy Class

- **Signal:** a type adds naming and indirection without owning behavior or policy.
- **Automation:** a one-method wrapper forwards to Playwright or Selenide unchanged.
- **False positive:** a small stable adapter isolates a volatile external boundary.
- **Candidates:** Inline Class, Remove Middle Man.
- **Verify:** removal does not expose vendor churn to many callers.

### Data Class

- **Signal:** mutable state leaks while behavior that protects it lives elsewhere.
- **Automation:** a mutable scenario object is modified by several fixtures.
- **False positive:** immutable DTO, record, event, schema model, or parameterized case.
- **Candidates:** Encapsulate Collection, Move Method, Remove Setting Method.
- **Verify:** serialization, equality, fixtures, and schema boundaries.

### Dead Code

- **Signal:** unreachable or unused behavior has no current consumer.
- **Automation:** old runner hooks or page methods survive after migration.
- **False positive:** reflective/plugin entrypoints and externally invoked scripts.
- **Candidates:** delete after usage and runtime checks.
- **Verify:** dynamic registration, build config, docs, and CI entrypoints.

### Speculative Generality

- **Signal:** extension points support imagined variants rather than current consumers.
- **Automation:** interfaces, factories, and base classes have one trivial implementation.
- **False positive:** an external boundary or approved near-term second implementation.
- **Candidates:** Collapse Hierarchy, Inline Class, Remove Parameter.
- **Verify:** no published compatibility contract depends on the abstraction.

## Couplers

### Feature Envy

- **Signal:** behavior reads another object's data more than its own.
- **Automation:** tests assemble API rules that belong to a typed client or fixture.
- **False positive:** orchestration that intentionally coordinates public interfaces.
- **Candidates:** Move Method, Extract Method.
- **Verify:** do not move acceptance assertions into low-level helpers.

### Inappropriate Intimacy

- **Signal:** modules depend on each other's internals or mutation order.
- **Automation:** a page object reaches into another page's private locators.
- **False positive:** scoped components sharing one explicit composition root.
- **Candidates:** Move Method, Hide Delegate, Extract Interface.
- **Verify:** public behavior and diagnostics remain visible.

### Message Chains

- **Signal:** callers navigate a long object graph for one domain action.
- **Automation:** `app.pages().admin().users().row(id).menu().delete()` leaks structure.
- **False positive:** a fluent query/build API whose chain is the documented interface.
- **Candidates:** Hide Delegate, Extract Method, Facade.
- **Verify:** avoid a god facade or hidden waits/assertions.

### Middle Man

- **Signal:** most methods only forward without policy or boundary value.
- **Automation:** a helper mirrors every Playwright page method one-for-one.
- **False positive:** an Adapter that normalizes a volatile vendor contract.
- **Candidates:** Remove Middle Man, Inline Method.
- **Verify:** dependency churn and call-site clarity after removal.

## Library gap

### Incomplete Library Class

- **Signal:** a third-party type lacks one operation needed by several callers.
- **Automation:** locators need one stable domain-specific query.
- **False positive:** a one-off helper or an operation upstream already supports.
- **Candidates:** Introduce Foreign Method, Introduce Local Extension, contribute upstream.
- **Verify:** version compatibility and no shadowing of a new upstream API.
