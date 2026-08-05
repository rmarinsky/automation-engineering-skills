---
name: api-contract-testing
description: >-
  Use when validating API responses with runtime models or OpenAPI/JSON Schema —
  Pydantic, Jackson, zod, or debates about contract-first testing.
---

# API contract testing

Decision: **EX-CONTRACT-01**.

## Rule

Use **runtime** models for what this client consumes. Add OpenAPI/JSON Schema validation when a real schema source exists. This is not “contract-first or nothing.”

## Do

- Assert expected HTTP status explicitly before deserialize/parse.
- Validate with the repo’s existing schema/model library (Pydantic, Jackson/Moshi, zod, etc.).
- Use published `openapi.yaml` / JSON Schema when it is an actual source of truth.

## Do not

- Invent a consumer/provider contract the service does not publish.
- Claim a DTO alone validates a public API contract.
- Add a schema library only for a single literal assertion.

## Eval

See `evals/EX-CONTRACT-01.md`.
