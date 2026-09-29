# Omnia

An atlas of the adjacent possible: a speculative ontology of 65 paradigms across
13 realms and 4 time horizons, each with what it would give reality, the signals
already pointing toward it, and the shadow it would cast.

- **[ONTOLOGY.md](ONTOLOGY.md)**: the full ontology and the invitation prompts, as text.
- **[omnia-atlas.html](omnia-atlas.html)**: the interactive atlas as one self-contained page
  (orrery, codex, recombinator, invitations).
- **[atlas/](atlas/)**: source for the page (React, TypeScript, Tailwind, shadcn/ui).
  The ontology lives in `atlas/src/data/ontology.ts`.

## Rebuilding

```bash
cd atlas
pnpm install
bash <web-artifacts-builder>/scripts/bundle-artifact.sh   # writes bundle.html
python3 scripts/finalize.py bundle.html ../omnia-atlas.html
node --experimental-strip-types scripts/export-markdown.ts  # regenerates ONTOLOGY.md
```
