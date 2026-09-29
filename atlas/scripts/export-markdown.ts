// Renders src/data/ontology.ts as ONTOLOGY.md at the repo root.
// Run: node --experimental-strip-types scripts/export-markdown.ts
import { writeFileSync } from "node:fs";
import { HORIZONS, INVITATIONS, OPERATORS, PARADIGMS, REALMS } from "../src/data/ontology.ts";

const L: string[] = [];
L.push("# Omnia: an atlas of the adjacent possible", "");
L.push(
  `A speculative ontology of ${PARADIGMS.length} paradigms across ${REALMS.length} realms and ${HORIZONS.length} time horizons. ` +
    "Each paradigm names what it would give reality, the signals already pointing toward it, and the shadow it would cast. " +
    "Reach and strangeness are rough judgments, not forecasts. The listed signals are real as of 2026; everything else is speculation.",
  "",
);
L.push("## Horizons", "", "| Horizon | Span | Meaning |", "|---|---|---|");
for (const h of HORIZONS) L.push(`| ${h.name} | ${h.span} | ${h.gloss} |`);
L.push("", "## Operators", "", "Moves that generate new paradigms from existing ones.", "");
for (const o of OPERATORS) L.push(`- **${o.name}**: ${o.move}`);
L.push("", "## Realms", "");
for (const r of REALMS) {
  L.push(`### ${r.name}`, "", `*Transforms ${r.transforms}.* ${r.blurb}`, "");
  for (const p of PARADIGMS.filter((x) => x.realm === r.id)) {
    const h = HORIZONS.find((x) => x.id === p.horizon)!;
    L.push(`#### ${p.name}`, "");
    L.push(`${h.name} (${h.span}) · reach ${p.reach} · strangeness ${p.strange}`, "");
    L.push(p.essence, "");
    L.push(`- **Gives reality:** ${p.gift}`);
    L.push(`- **Signals already here:** ${p.seeds.join("; ")}`);
    L.push(`- **Shadow:** ${p.shadow}`);
    L.push(`- **Open question:** ${p.question}`, "");
  }
}
L.push("## Invitations", "", "Prompts to explore further, through any medium.", "");
for (const i of INVITATIONS) {
  L.push(`### ${i.title}`, "", `*${i.mode}.* ${i.why}`, "", `> ${i.prompt}`, "");
}
writeFileSync(new URL("../../ONTOLOGY.md", import.meta.url), L.join("\n"));
console.log("wrote ONTOLOGY.md");
