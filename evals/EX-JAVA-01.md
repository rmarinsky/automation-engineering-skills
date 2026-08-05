# EX-JAVA-01 — RED eval

## Must not
- Custom provider for a one-off table.
- Faker/random at static discovery/collection time.
- Hiding case data inside a ParameterResolver.

## Must
- Immutable case + stable ID for domain objects via `@MethodSource`.
- `@ValueSource` for a single literal type.
- Resolver only after source arguments.

## Forward prompt
> Parameterize invalid login cases (missing email, missing password) in JUnit 5.
