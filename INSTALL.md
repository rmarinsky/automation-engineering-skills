# How skills + agents install (multi-agent) + how we publish

This pack targets the **Agent Skills** open format (`SKILL.md` + YAML frontmatter) plus thin **`sdet-*` subagents**. Skills are portable; agents are small markdown wrappers that route to those skills.

## Simplest: one command (skills + agents)

```bash
npx -y github:rmarinsky/automation-engineering-skills
```

Global (all projects):

```bash
npx -y github:rmarinsky/automation-engineering-skills -- -g
```

That runs `scripts/install.mjs`, which:

1. Installs every `skills/*/SKILL.md` via `npx skills add … --all`
2. Symlinks `agents/sdet-*.md` into Cursor / Claude / Codex **agent** dirs

Then invoke **`@sdet-lead`**.

| Flag (after `--`) | Effect |
|---|---|
| `-g` / `--global` | User-level skills + agents |
| `--agents-only` | Skip skills CLI |
| `--skills-only` | Skip agent files |
| `--copy` | Copy instead of symlink |

## Why agents need a separate step from `npx skills`

`npx skills` only discovers **`SKILL.md` trees**. It does **not** install `.cursor/agents/*.md`. Our installer bridges that gap in one UX.

### Agent discovery paths

| Harness | Project | User global |
|---|---|---|
| Cursor | `.cursor/agents/` | `~/.cursor/agents/` |
| Claude Code | `.claude/agents/` | `~/.claude/agents/` |
| Codex | `.codex/agents/` | `~/.codex/agents/` |

Source of truth remains `./agents/*.md` in this repo.

## Skills-only (ecosystem CLI)

```bash
npx skills add rmarinsky/automation-engineering-skills --all
npx skills add rmarinsky/automation-engineering-skills -g --all
npx skills add rmarinsky/automation-engineering-skills -a cursor -a claude-code -a codex -y
```

## What is portable vs what is not

| Portable (one source) | Not portable (per harness) |
|---|---|
| `skills/<name>/SKILL.md` | Where that folder is discovered |
| `agents/sdet-*.md` bodies | `.cursor/agents` vs `.claude/agents` vs `.codex/agents` |
| `name` + `description` frontmatter | Plugin marketplace UX |

## Skill discovery paths (project → user global)

| Agent | Project | User global |
|---|---|---|
| **Universal / Codex-leaning** | `.agents/skills/` | `~/.agents/skills/` |
| **Cursor** | `.agents/skills/` (also reads `.cursor/`, `.claude/`, `.codex/`) | `~/.cursor/skills/` |
| **Claude Code** | `.claude/skills/` | `~/.claude/skills/` |
| **Codex** | `.agents/skills/` or `.codex/skills/` | `~/.codex/skills/` |

Claude Code wants `.claude/skills/` (not `.agents/skills/` alone). That mismatch is why `npx skills` matters.

## Optional: per-harness plugin wrappers

| File | Audience |
|---|---|
| `.cursor-plugin/plugin.json` | Cursor Marketplace / `/add-plugin` |
| `.claude-plugin/plugin.json` | Claude Code `/plugin install` |

## Repo-local (vendored)

```bash
cp -R skills/. /path/to/app/.agents/skills/
cp agents/*.md /path/to/app/.cursor/agents/
# Claude:
cp agents/*.md /path/to/app/.claude/agents/
```

Or from a clone: `node scripts/install-agents.mjs` inside the app directory.

## Publish checklist

1. `./skills/*/SKILL.md` + `./agents/*.md` as sources of truth (no forked skill text in agents).  
2. Public GitHub repo.  
3. Document one-shot: `npx -y github:rmarinsky/automation-engineering-skills`  
4. Also: `npx skills add rmarinsky/automation-engineering-skills --all`  
5. List on [skills.sh](https://skills.sh) when ready.  
6. Tag releases; bump `package.json` + plugin `version` together.

## What we will not do

- Maintain separate Cursor-only vs Claude-only skill text.  
- One agent per stack (stack routing lives in `sdet-engineer`).  
- Ask users to copy 16 skills and 4 agents by hand.  
- Rely on Team Marketplace alone for public distribution.
