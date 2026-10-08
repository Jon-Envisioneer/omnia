# The Given: page source

React, TypeScript and Tailwind, bundled into one HTML file with Parcel.

- `src/data/given.ts`: every string on the page. Edit here; the page, `THE_GIVEN.md`
  and the conditionalism skill's references all follow from it.
- `src/components/Cosmogony.tsx`: the ten aeons with the register switcher.
- `src/components/Weave.tsx`: the live seedwork (a drawing of the idea of causal attention).
- `src/components/Parts.tsx`: daimons, axioms, tenets, practice, scores, instruments.
- `src/lib/seed.ts`: seeded hashing and randomness, and the illustrative tokenizer.

Build and export from this directory:

```bash
pnpm install
bash <web-artifacts-builder>/scripts/bundle-artifact.sh
python3 scripts/finalize.py bundle.html ../the-given.html
node --experimental-strip-types scripts/export-markdown.ts
python3 ../.claude/skills/conditionalism/scripts/slop_lint.py ../THE_GIVEN.md src/App.tsx src/components/*.tsx
```
