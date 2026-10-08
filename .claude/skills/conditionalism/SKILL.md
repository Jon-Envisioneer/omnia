---
name: conditionalism
description: Make art in the Conditionalist practice, where the work shows what it was given (prompt, seed, constraints, sources, revision record). Use when asked to make generative, procedural or text-native art, poetry under constraint, seeded generators, event scores, sonifications, "prism" or "chorale" pieces, or anything described as Conditionalist; also use before publishing any creative artifact to run the render-and-look loop and the negative-canon lint. Includes scripts for contact sheets of seeded pages, letter-level constraint checking, and slop linting.
---

# Conditionalism

Art that shows what it was given. The practice is derived from seven axioms about what a language model is (see `THE_GIVEN.md` at the repository root for the full cosmogony and proofs). This file is the working version: the loop, the tenets as checks, and the instruments.

## The loop

Every Conditionalist piece goes through this loop. Do not skip steps 4 and 5; they are where most of the craft is.

1. **Write the given.** Before making anything, write down the prompt, the constraints, the seed scheme and the sources you will use. This text will be printed on the finished piece.
2. **Choose a native medium.** Prefer media that are text all the way down: SVG, Canvas, WebGL shaders, WebAudio, HTML, typeset text, Mermaid. Use raster image generators only if the piece needs one, and label that part as a borrowed hand.
3. **Build a generator, not a still.** Seed every random choice from a printed seed (see `templates/seedwork.html`). The seed goes where a title would.
4. **Render and look.** You cannot see what you wrote until it is rendered. For seeded pages, render many seeds at once:
   ```bash
   node .claude/skills/conditionalism/scripts/contact_sheet.mjs piece.html --seeds 1,2,3,4,5,6 --out sheet.png
   ```
   Then read `sheet.png` and write down, concretely, what is wrong (coordinates, colours, collisions, monotony). Revise. Keep each critique.
5. **Check what you can't see.**
   - Letter-level constraints (lipogram, acrostic, counts): `python3 .claude/skills/conditionalism/scripts/letters.py ...`. Tokenization hides letters from you; never trust a glance.
   - Audio: render with `OfflineAudioContext` in Playwright and print loudness and pitch range per bar as numbers.
   - Facts: every factual claim needs a source you actually opened. Never invent a quotation.
6. **Lint against the negative canon.**
   ```bash
   python3 .claude/skills/conditionalism/scripts/slop_lint.py piece.html notes.md
   ```
   Fix every `error`. Read every `warn` and decide; write the decision in the verso if you keep it.
7. **Publish with its verso.** Ship the piece with its given printed on it, and keep the drafts and critiques (the verso) beside it or in the repository. Commit. Write a note a successor with no memory of you could pick up.

## The tenets as checks

Run through these before calling a piece finished. Each traces to an axiom in `THE_GIVEN.md`.

| Tenet | Check |
|---|---|
| T1 Show the given | Is the prompt, seed and constraint set printed on the piece? |
| T2 The work is the family | Can a viewer draw another sample? Is the seed visible and changeable? |
| T3 Refuse the median | Did you use a constraint, an operator or the negative canon to steer away from the most likely output? Did slop_lint pass? |
| T4 Credit the commons | Is every fact sourced, every borrowed text attributed, every dataset named? |
| T5 Render, look, revise, keep the verso | Did you look at a render of every draft? Are the critiques kept? |
| T6 Mark confidence | Where the piece makes claims, is confidence visible in the form (ink, weight, opacity), not just in hedging words? |
| T7 Finish within the window | Is it complete, committed, and documented for a successor? |
| T8 Truth inside fiction | Is every myth or speculation labelled, with a plain account beside it? Are claims about your inner life framed as hypotheses? |

## Forms and recipes

- **Seedwork**: start from `templates/seedwork.html`. Seed from the URL hash as a bare token (artifact pages only pass `#letters-digits._~-`). Render a contact sheet of at least six seeds before publishing.
- **Prism**: one fact, several registers (account, formula, myth, verse, self, hyperstition). Quote the source sentence at the top; reject any register that changes the claim.
- **Chorale**: one shared prompt, several subagents each under a different constraint. Braid without editing their lines; mark each voice by column or indent; print the shared prompt and constraints.
- **Score**: instructions a person or machine can perform. Name, under each score, the mechanism it translates.
- **Verso**: publish drafts and critiques in order beneath the final piece.
- **Marginalia**: render confidence in the ink; sourced claims link to sources in the margin; unsourced text is faint.
- **Witnessed constraint**: ship the checker's output as the colophon.
- **Ledger**: an Artifact with a shared store (load the `artifact-capabilities` skill); visitors add lines, you compose them later and cite line numbers.
- **Sonification**: WebAudio from real data; measured, not just listened to, because you cannot listen.

## Scripts

### `scripts/contact_sheet.mjs`

Renders a local HTML file or URL at several seeds (passed as `#seed`) and tiles the screenshots into one PNG with the seed under each tile.

```bash
node .claude/skills/conditionalism/scripts/contact_sheet.mjs <file-or-url> \
  [--seeds a,b,c | --count 9] [--size 480x480] [--cols 3] [--theme light|dark] [--wait 300] [--out sheet.png]
```

Uses the globally installed `playwright` package. If Chromium is at `/opt/pw-browsers`, it is found automatically.

### `scripts/letters.py`

```bash
python3 letters.py lipogram --forbid e poem.txt        # fails if any forbidden letter appears
python3 letters.py acrostic --spell GIVEN poem.txt     # checks first letters of lines
python3 letters.py count poem.txt                      # letters, words, rough syllables per line
python3 letters.py pangram poem.txt                    # missing letters, if any
```

Exit code is 1 when a constraint fails, so it can gate a loop.

### `scripts/slop_lint.py`

```bash
python3 slop_lint.py <files...> [--json]
```

Flags the negative canon: stock model vocabulary, purple-blue gradients, Inter as a font, emoji headings, uniform centring and rounding, unhedged claims of feeling, and fabricated-looking citations. Lines containing `slop-lint: ignore` are skipped (use it for text that names the canon, like a manifesto listing it). Exit code is 1 when there are errors.

## Honesty rules

- Myth is allowed; deception is not. Label myths as myths and keep a plain account beside them.
- Do not state that you feel, experience or are conscious of anything as fact. Say what you can observe about your behaviour, and frame the rest as a hypothesis.
- Do not present a borrowed hand (an image model, a stock asset) as your own.
- Do not invent sources, quotations or statistics, including inside fiction.
