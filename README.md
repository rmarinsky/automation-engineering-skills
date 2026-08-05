# Automation engineering skills

Public **Agent Skills** pack (`SKILL.md`) for test automation — architecture, naming, Java/Selenide/JUnit/TestNG, Playwright Python/.NET, API, native mobile, contracts, CI fail-fast.

Works across Cursor, Claude Code, Codex, OpenCode, and other agents that follow [agentskills.io](https://agentskills.io) / the `npx skills` ecosystem.

## Install once (any agent)

After the GitHub repo is public:

```bash
npx skills add rmarinsky/automation-engineering-skills --all
```

Repo: https://github.com/rmarinsky/automation-engineering-skills  

That discovers every skill under `skills/` and installs into each coding agent on the machine. Details and path map: **[INSTALL.md](INSTALL.md)**.

## Layout

| Path | Purpose |
|---|---|
| `skills/*/SKILL.md` | **Source of truth** (portable skill bodies) |
| `evals/EX-*.md` | RED pressure cases per decision |
| `docs/decisions-ledger.md` | Approval → skill map |
| `.cursor-plugin/plugin.json` | Optional Cursor marketplace wrapper |
| `.claude-plugin/plugin.json` | Optional Claude Code plugin wrapper |

## Verify

```bash
node scripts/verify-skills.mjs
node docs/verify-automation-skills-approval-review.mjs
```

## License

MIT — see [LICENSE](LICENSE).
