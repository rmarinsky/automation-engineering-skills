# Automation engineering skills

Public **Agent Skills** pack for evidence-based code quality and test automation,
with a generic read-only reviewer plus **`sdet-*` agents**.

Works across Cursor, Claude Code, Codex, and other agents that follow [agentskills.io](https://agentskills.io).

## Install (simplest)

Skills **and** SDET agents in one command:

```bash
npx -y github:rmarinsky/automation-engineering-skills
```

Global (all projects on this machine):

```bash
npx -y github:rmarinsky/automation-engineering-skills -- -g
```

Then in chat: **`@sdet-lead`** for test automation or
**`@code-quality-reviewer`** for read-only production/test code review.

### Skills only (existing path)

```bash
npx skills add rmarinsky/automation-engineering-skills --all
```

### Agents only

```bash
npx -y github:rmarinsky/automation-engineering-skills -- --agents-only
# or from a clone:
node scripts/install-agents.mjs        # project
node scripts/install-agents.mjs -g     # user global
```

Details: **[INSTALL.md](INSTALL.md)**.

## Agents

| Agent | Role |
|---|---|
| `code-quality-reviewer` | Read-only smells, pattern pressure, smallest safe refactoring |
| `sdet-lead` | Plan + control the loop (analyze → engineer → dual review → PR) |
| `sdet-engineer` | Choose stack → load matching skills → write tests |
| `sdet-design-reviewer` | Smells, composition/reuse, naming |
| `sdet-standards-reviewer` | No sleeps, dynamic asserts, fixtures/extensions/listeners |

## General code-quality skills

| Skill | Role |
|---|---|
| `diagnose-code-smells` | Evidence and risk before smell; preserve DAMP tests and valid data carriers |
| `refactor-code-safely` | Behavior-preserving slices with targeted and broader checks |
| `select-design-pattern` | Direct/native/framework/existing abstraction before named pattern |

Pattern selection includes JVM, Python, .NET, TypeScript/JavaScript, and Swift
references. Framework-specific skills remain authoritative for runner and UI behavior.

## Layout

| Path | Purpose |
|---|---|
| `skills/*/SKILL.md` | Portable skill bodies (source of truth) |
| `agents/*.md` | Thin Cursor/Claude/Codex agents |
| `evals/EX-*.md` | RED pressure cases per decision |
| `docs/decisions-ledger.md` | Approval → skill map |
| `scripts/install.mjs` | One-shot skills + agents installer |
| `.cursor-plugin/` / `.claude-plugin/` | Optional marketplace wrappers |

## Verify

```bash
node scripts/verify-skills.mjs
node docs/verify-automation-skills-approval-review.mjs
```

## Source-material boundary

The pack contains original instructions and examples only. Purchased books,
PDFs, ZIP archives, diagrams, watermarks, and third-party example code are not
packaged or indexed as repository content.

## License

MIT — see [LICENSE](LICENSE).
