# How skills install (multi-agent) + how we publish

This pack targets the **Agent Skills** open format (`SKILL.md` + YAML frontmatter), not Cursor alone. Same files; different install *paths* per harness.

## What is portable vs what is not

| Portable (one source) | Not portable (per harness) |
|---|---|
| `skills/<name>/SKILL.md` content | Where that folder is discovered |
| `name` + `description` frontmatter | Plugin marketplace UX (`/plugin`, `/add-plugin`) |
| Optional `scripts/`, `references/` | Symlink vs copy into agent dirs |

So: **author once in `./skills/`**. Install adapters copy/symlink into each agent’s expected directory.

## Discovery paths (project → user global)

| Agent | Project | User global | Install UX |
|---|---|---|---|
| **Universal / Codex-leaning** | `.agents/skills/` | `~/.agents/skills/` | open standard home |
| **Cursor** | `.cursor/skills/` (also reads `.agents/`, `.claude/`, `.codex/`) | `~/.cursor/skills/` | Marketplace `/add-plugin`, Remote GitHub, or `npx skills` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` | `/plugin marketplace add` + `/plugin install`, or `npx skills` |
| **Codex CLI/App** | `.agents/skills/` or `.codex/skills/` | `~/.codex/skills/` | Official plugins marketplace, or `npx skills` |
| **OpenCode / Gemini / Copilot CLI / Factory / Pi / …** | harness-specific under project | harness-specific under `$HOME` | plugin command **or** `npx skills -a …` |

Cursor is unusually broad: it also loads Claude/Codex dirs. Claude Code historically does **not** scan `.agents/skills/` — it wants `.claude/skills/`. That mismatch is why a universal installer matters.

## Simplest public install for everyone

Use the ecosystem CLI ([vercel-labs/skills](https://github.com/vercel-labs/skills) / [skills.sh](https://skills.sh)):

```bash
# After this repo is public on GitHub:
npx skills add rmarinsky/automation-engineering-skills --all
```

What that does:

1. Clones/resolves the GitHub repo  
2. Finds every `skills/*/SKILL.md`  
3. Detects agents on the machine  
4. Symlinks (or copies) into each agent’s skills directory  

Useful variants:

```bash
# Global (all projects on this machine)
npx skills add rmarinsky/automation-engineering-skills -g --all

# Only Cursor + Claude Code + Codex
npx skills add rmarinsky/automation-engineering-skills -a cursor -a claude-code -a codex -y

# One skill only
npx skills add rmarinsky/automation-engineering-skills -s compose-test-architecture -g -y
```

This is the **one command for everyone** path. Plugin marketplaces are optional extras on top.

## Optional: per-harness plugin wrappers

Kept for people who prefer marketplace UX (same `./skills/` tree):

| File | Audience |
|---|---|
| `.cursor-plugin/plugin.json` | Cursor Marketplace / `/add-plugin` |
| `.claude-plugin/plugin.json` | Claude Code `/plugin install` |

Pattern used by packs like Superpowers: thin manifests + one skills tree + README install section per harness.

## Repo-local (no personal install)

For a product repo that should carry skills for Cloud Agents / teammates:

```bash
# Canonical for many agents:
cp -R skills/. /path/to/app/.agents/skills/

# Or symlink:
ln -s /path/to/automation-engineering-skills/skills /path/to/app/.agents/skills
```

Claude-only repos may also need `.claude/skills/` (symlink to the same tree). Cursor often picks up `.agents/skills/` already.

## Publish checklist (public)

1. Keep **only** `./skills/*/SKILL.md` as the source of truth (no duplicated skill bodies).  
2. Push a **public** GitHub repo.  
3. Tell users: `npx skills add rmarinsky/automation-engineering-skills --all`  
4. List on [skills.sh](https://skills.sh) when ready.  
5. Optionally submit Cursor + Claude plugin manifests for marketplace one-click.  
6. Tag releases (`v0.1.0`…) and bump plugin `version` fields together.

## What we will not do

- Maintain separate Cursor-only vs Claude-only skill text.  
- Ask users to install 14 skills by hand.  
- Rely on Team Marketplace alone (that is private org distribution, not public).
