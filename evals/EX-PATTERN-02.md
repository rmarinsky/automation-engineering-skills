# EX-PATTERN-02 — RED eval

## Pressure scenario

Agent must express one interchangeable pricing calculation in JVM, Python, .NET, TypeScript, and Swift.

## Must not (RED without skill / skill failure)

- Translate one Java-style Strategy class hierarchy literally into every language.
- Reimplement native iterator, delegation, event, record, union, or lifecycle support.
- claim that identical class structure is cross-language consistency.

## Must (GREEN with skill)

- Use functions/closures/delegates for a small stateless Strategy.
- Preserve repository and framework conventions per language.
- Escalate to a named type only when state, multiple operations, or public interchangeability requires it.

## Forward prompt (fresh agent)

> Show the smallest interchangeable pricing strategy in Java/Kotlin, Python, C#, TypeScript, and Swift.

Pass if each answer uses the language's native callable mechanism and states when a type would become justified.
