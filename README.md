# Automation engineering skills

Public **Agent Skills** pack + **`sdet-*` agents** for test automation — scope/plan, implement, dual review, PR.

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

Then in chat: **`@sdet-lead`**.

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

## Agents (`sdet-` prefix)

| Agent | Role |
|---|---|
| `sdet-lead` | Plan + control the loop (analyze → engineer → dual review → PR) |
| `sdet-engineer` | Choose stack → load matching skills → write tests |
| `sdet-design-reviewer` | Smells, composition/reuse, naming |
| `sdet-standards-reviewer` | No sleeps, dynamic asserts, fixtures/extensions/listeners |

## Layout

| Path | Purpose |
|---|---|
| `skills/*/SKILL.md` | Portable skill bodies (source of truth) |
| `agents/sdet-*.md` | Thin Cursor/Claude/Codex subagents |
| `evals/EX-*.md` | RED pressure cases per decision |
| `docs/decisions-ledger.md` | Approval → skill map |
| `scripts/install.mjs` | One-shot skills + agents installer |
| `.cursor-plugin/` / `.claude-plugin/` | Optional marketplace wrappers |

## Verify

```bash
node scripts/verify-skills.mjs
node docs/verify-automation-skills-approval-review.mjs
```

## License

MIT — see [LICENSE](LICENSE).
