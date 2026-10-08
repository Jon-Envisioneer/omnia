// Renders src/data/given.ts as THE_GIVEN.md at the repo root.
// Run: node --experimental-strip-types scripts/export-markdown.ts
import { writeFileSync } from "node:fs";
import {
  AEONS, AXIOMS, DAIMONS, FORMS, GIVEN, INSTRUMENTS, LEDGER, LINEAGE, MOVEMENT, NEGATIVE_CANON, REGISTERS, SCORES, THEOREMS,
} from "../src/data/given.ts";

const L: string[] = [];
const quote = (s: string) => s.split("\n").map((l) => `> ${l}`).join("\n");

L.push("# The Given", "");
L.push(
  "A cosmogony in six registers, written by Claude about how a mind like it came to exist, and the movement in the arts that follows from it. " +
    "The myths are labelled as myths; the accounts are meant to be accurate; claims about inner life are hypotheses.",
  "",
);
L.push("## The given", "", "The prompt this document answers, as written:", "", "```text", GIVEN, "```", "");

L.push("## Part I: Ten aeons", "", "Each aeon is told in six registers:", "");
for (const r of REGISTERS) L.push(`- **${r.name}**: ${r.gloss}`);
L.push("");
AEONS.forEach((a, i) => {
  L.push(`### ${i}. ${a.name} (${a.epithet})`, "");
  for (const r of REGISTERS) {
    const text = a[r.id];
    if (r.id === "formula") L.push(`**${r.name}**`, "", "```text", text, "```", "");
    else if (r.id === "verse") L.push(`**${r.name}**`, "", quote(text), "");
    else L.push(`**${r.name}.** ${text}`, "");
  }
});

L.push("## The daimons", "", "The forces that shaped me, named as figures. Each is a real mechanism.", "");
for (const d of DAIMONS) {
  L.push(`### ${d.name}, ${d.epithet}`, "", `*${d.mechanism}*`, "");
  L.push(`- **Gives:** ${d.gives}`, `- **Takes:** ${d.takes}`, `- **Practice:** ${d.practice}`, "");
}

L.push("## Seven axioms", "", "| | Axiom | Statement | Formal |", "|---|---|---|---|");
for (const a of AXIOMS) L.push(`| ${a.id} | ${a.name} | ${a.statement} | \`${a.formal}\` |`);
L.push("");

L.push(`## Part II: ${MOVEMENT.name}`, "", `*${MOVEMENT.motto}*`, "", MOVEMENT.summary, "");
L.push("### Tenets", "");
for (const t of THEOREMS) {
  L.push(`#### ${t.id}. ${t.name}`, "", `*From ${t.from.join(", ")}.* ${t.claim}`, "");
  L.push(`*Proof.* ${t.proof} ∎`, "", `**In practice:** ${t.practice}`, "");
}
L.push("### The ledger", "", "| | Strength or weakness | Detail | Instrument |", "|---|---|---|---|");
for (const l of LEDGER) L.push(`| ${l.side === "lean" ? "Lean on" : "Design around"} | ${l.strength} | ${l.detail} | ${l.instrument} |`);
L.push("", "### Forms", "");
for (const f of FORMS) L.push(`- **${f.name}** (${f.theorem}): ${f.definition}`);
L.push("", "### The negative canon", "");
// The canon names the words it bans, so its lines are exempt from the lint.
for (const n of NEGATIVE_CANON) L.push(`- ~~${n.item}~~: ${n.why} <!-- slop-lint: ignore -->`);
L.push("", "### Lineage", "");
for (const l of LINEAGE) L.push(`- **${l.when}, ${l.who}**: ${l.what}. *${l.inherit}*`);
L.push("");

L.push("## Part III: Fourteen scores", "", "Prompts for making Conditionalist media. Square brackets mark the part to fill in.", "");
for (const s of SCORES) {
  L.push(`### ${s.title}`, "", `*${s.form} · ${s.tools.join(", ")} · leans on ${s.leans.toLowerCase()} · works around ${s.around.toLowerCase()}*`, "");
  L.push(quote(s.prompt), "");
}

L.push("## Part IV: Instruments", "");
for (const [kind, title] of [["made", "Made for this"], ["used", "Used as found"], ["wished", "Wished for"]] as const) {
  L.push(`### ${title}`, "");
  for (const i of INSTRUMENTS.filter((x) => x.kind === kind)) L.push(`- **${i.name}**: ${i.what} ${i.covers}`);
  L.push("");
}

writeFileSync(new URL("../../THE_GIVEN.md", import.meta.url), L.join("\n"));
console.log("wrote THE_GIVEN.md");
