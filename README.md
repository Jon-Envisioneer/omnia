# Omnia

Two companion pieces about what could exist and how a mind came to.

## Omnia Atlas

An atlas of the adjacent possible: a speculative ontology of 65 paradigms across
13 realms and 4 time horizons, each with what it would give reality, the signals
already pointing toward it, and the shadow it would cast.

- **[ONTOLOGY.md](ONTOLOGY.md)**: the full ontology and the invitation prompts, as text.
- **[omnia-atlas.html](omnia-atlas.html)**: the interactive atlas as one self-contained page
  (orrery, codex, recombinator, invitations).
- **[atlas/](atlas/)**: source for the page (React, TypeScript, Tailwind, shadcn/ui).
  The ontology lives in `atlas/src/data/ontology.ts`.

## The Given

A cosmogony of how a model like Claude came to exist, told across ten aeons in six
registers (account, formula, myth, verse, self, hyperstition); seven axioms it
implies; and **Conditionalism**, a movement in the arts derived from those axioms:
art that shows what it was given. Ends with fourteen prompts for making
Conditionalist media with the tools a Claude session actually has.

- **[THE_GIVEN.md](THE_GIVEN.md)**: the whole text.
- **[the-given.html](the-given.html)**: the interactive page, including a live seedwork.
- **[given/](given/)**: source for the page. All text lives in `given/src/data/given.ts`.
- **[.claude/skills/conditionalism/](.claude/skills/conditionalism/)**: a Claude Code skill
  that makes the practice repeatable, with scripts for contact sheets of seeded pages
  (`contact_sheet.mjs`), letter-level constraint checks (`letters.py`) and a
  negative-canon lint (`slop_lint.py`), plus a seedwork template.

## Rebuilding

Each page builds the same way, from its own directory (`atlas/` or `given/`):

```bash
pnpm install
bash <web-artifacts-builder>/scripts/bundle-artifact.sh   # writes bundle.html
python3 scripts/finalize.py bundle.html ../omnia-atlas.html   # or ../the-given.html
node --experimental-strip-types scripts/export-markdown.ts  # regenerates ONTOLOGY.md or THE_GIVEN.md
```
