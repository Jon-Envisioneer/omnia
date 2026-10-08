import { useMemo, useState } from "react";
import { AXIOMS, DAIMONS, FORMS, INSTRUMENTS, LEDGER, LINEAGE, MOVEMENT, NEGATIVE_CANON, SCORES, THEOREMS } from "@/data/given";
import { CopyButton, Glyph } from "@/components/Bits";

const full = { gridColumn: "1 / -1" } as const;
const sub = { color: "hsl(var(--ink-2))" } as const;

export function Daimons() {
  return (
    <ul className="grid gap-px" style={{ ...full, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))", background: "hsl(var(--rule))", border: "1px solid hsl(var(--rule))" }}>
      {DAIMONS.map((d) => (
        <li key={d.id} className="grid gap-3 p-5" style={{ background: "hsl(var(--paper))", alignContent: "start" }}>
          <div className="flex items-start gap-3">
            <Glyph seed={`daimon-${d.id}`} chords={5} size={44} />
            <div className="min-w-0">
              <h3 className="display" style={{ fontSize: "1.45rem" }}>{d.name}</h3>
              <p className="text-sm italic" style={sub}>{d.epithet}</p>
            </div>
          </div>
          <p className="mono" style={sub}>{d.mechanism}</p>
          <dl className="grid gap-1.5 text-[0.95rem]" style={{ gridTemplateColumns: "auto minmax(0, 1fr)", columnGap: 10 }}>
            <dt className="label pt-1">Gives</dt><dd>{d.gives}</dd>
            <dt className="label pt-1">Takes</dt><dd>{d.takes}</dd>
            <dt className="label pt-1">Practice</dt><dd style={{ color: "hsl(var(--mark))" }}>{d.practice}</dd>
          </dl>
        </li>
      ))}
    </ul>
  );
}

export function Axioms() {
  return (
    <ol className="grid gap-0" style={full}>
      {AXIOMS.map((a) => {
        return (
          <li
            key={a.id}
            id={`axiom-${a.id}`}
            className="grid gap-x-6 gap-y-1 py-4"
            style={{ gridTemplateColumns: "3.2rem minmax(0, 1fr)", borderTop: "1px solid hsl(var(--rule))" }}
          >
            <span className="mono tabular pt-1 pl-1" style={{ color: "hsl(var(--mark))" }}>{a.id}</span>
            <div className="min-w-0 grid gap-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))", columnGap: 24 }}>
              <p><strong>{a.name}.</strong> {a.statement}</p>
              <p className="formula" style={{ ...sub, overflowWrap: "anywhere" }}>{a.formal}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function Tenets() {
  return (
    <ol className="grid gap-0" style={full}>
      {THEOREMS.map((t) => (
        <li
          key={t.id}
          className="grid gap-x-6 gap-y-2 py-6"
          style={{ gridTemplateColumns: "3.2rem minmax(0, 1fr)", borderTop: "1px solid hsl(var(--rule))" }}
        >
          <span className="mono tabular pt-2" style={{ color: "hsl(var(--mark))" }}>{t.id}</span>
          <div className="min-w-0 grid gap-3" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", columnGap: 32 }}>
            <div className="grid gap-2" style={{ alignContent: "start" }}>
              <h3 className="display" style={{ fontSize: "1.65rem" }}>{t.name}</h3>
              <p>{t.claim}</p>
              <p className="text-[0.95rem]"><span className="label mr-2">In practice</span>{t.practice}</p>
            </div>
            <div className="grid gap-2 text-[0.95rem]" style={{ ...sub, alignContent: "start" }}>
              <div className="flex flex-wrap items-center gap-2">
                <span className="label">Derived from</span>
                {t.from.map((a) => {
                  const ax = AXIOMS.find((x) => x.id === a)!;
                  return (
                    <a key={a} href={`#axiom-${a}`} className="mono" title={`${ax.name}: ${ax.statement}`}>
                      {a} {ax.name}
                    </a>
                  );
                })}
              </div>
              <p><em>Proof.</em> {t.proof} ∎</p>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Motto() {
  return (
    <div className="grid gap-4 measure" style={full}>
      <p className="display italic" style={{ fontSize: "clamp(1.7rem, 4vw, 2.6rem)" }}>{MOVEMENT.motto}</p>
      <p>{MOVEMENT.summary}</p>
    </div>
  );
}

export function Practice() {
  return (
    <div className="grid gap-14 min-w-0" style={full}>
      <section aria-labelledby="ledger-title" className="grid gap-5">
        <h3 id="ledger-title" className="display" style={{ fontSize: "1.9rem" }}>The ledger</h3>
        <p className="measure" style={sub}>What the practice leans on, and what it is built to work around. Each weakness names the instrument that covers it.</p>
        <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}>
          {(["lean", "around"] as const).map((side) => (
            <div key={side} className="min-w-0 grid gap-0" style={{ alignContent: "start" }}>
              <p className="label pb-2" style={{ borderBottom: "1px solid hsl(var(--ink))" }}>{side === "lean" ? "Lean on" : "Design around"}</p>
              {LEDGER.filter((l) => l.side === side).map((l) => (
                <div key={l.strength} className="grid gap-1 py-3" style={{ borderBottom: "1px solid hsl(var(--rule))" }}>
                  <p><strong>{l.strength}.</strong> {l.detail}</p>
                  <p className="mono" style={{ color: "hsl(var(--mark))" }}>→ {l.instrument}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section aria-labelledby="forms-title" className="grid gap-5">
        <h3 id="forms-title" className="display" style={{ fontSize: "1.9rem" }}>Forms</h3>
        <dl className="grid gap-x-8 gap-y-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))" }}>
          {FORMS.map((f) => (
            <div key={f.name} className="grid gap-1 min-w-0" style={{ alignContent: "start" }}>
              <dt className="flex items-baseline justify-between gap-3" style={{ borderBottom: "1px solid hsl(var(--rule))" }}>
                <span className="display" style={{ fontSize: "1.3rem" }}>{f.name}</span>
                <span className="mono" style={sub}>{f.theorem}</span>
              </dt>
              <dd className="text-[0.95rem]">{f.definition}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section aria-labelledby="canon-title" className="grid gap-5">
        <h3 id="canon-title" className="display" style={{ fontSize: "1.9rem" }}>The negative canon</h3>
        <p className="measure" style={sub}>What a Conditionalist work leaves out on purpose. The skill's <code className="mono">slop_lint.py</code> checks for these before anything is published.</p>
        <ul className="grid gap-0">
          {NEGATIVE_CANON.map((n) => (
            <li key={n.item} className="grid gap-x-6 gap-y-1 py-2.5" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))", borderTop: "1px solid hsl(var(--rule))" }}>
              <span style={{ textDecoration: "line-through", textDecorationColor: "hsl(var(--mark))", textDecorationThickness: "2px" }}>{n.item}</span>
              <span className="text-[0.95rem]" style={sub}>{n.why}</span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="lineage-title" className="grid gap-5">
        <h3 id="lineage-title" className="display" style={{ fontSize: "1.9rem" }}>Lineage</h3>
        <p className="measure" style={sub}>Conditionalism is new in its maker and old in its moves. These are the people and groups it borrows from, and what it takes from each.</p>
        <ol className="grid gap-0">
          {LINEAGE.map((l) => (
            <li key={l.who} className="grid gap-x-6 gap-y-1 py-3" style={{ gridTemplateColumns: "6.5rem minmax(0, 1fr)", borderTop: "1px solid hsl(var(--rule))" }}>
              <span className="mono tabular pt-1">{l.when}</span>
              <div className="min-w-0 grid gap-x-8 gap-y-1" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
                <p><strong>{l.who}.</strong> {l.what}.</p>
                <p className="text-[0.95rem] italic" style={sub}>{l.inherit}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}

export function Scores() {
  const tools = useMemo(() => Array.from(new Set(SCORES.flatMap((s) => s.tools))).sort(), []);
  const [tool, setTool] = useState<string | null>(null);
  const shown = tool ? SCORES.filter((s) => s.tools.includes(tool)) : SCORES;
  return (
    <div className="grid gap-6 min-w-0" style={full}>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter scores by tool">
        <span className="label mr-1">Tool</span>
        <button type="button" className="chip" aria-pressed={tool === null} onClick={() => setTool(null)}>All {SCORES.length}</button>
        {tools.map((t) => (
          <button key={t} type="button" className="chip" aria-pressed={tool === t} onClick={() => setTool(tool === t ? null : t)}>{t}</button>
        ))}
      </div>
      <ul className="grid gap-px" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", background: "hsl(var(--rule))", border: "1px solid hsl(var(--rule))" }}>
        {shown.map((s) => (
          <li key={s.id} id={`score-${s.id}`} data-copy-root className="grid gap-3 p-5 min-w-0" style={{ background: "hsl(var(--paper))", alignContent: "start" }}>
            <div className="flex items-baseline justify-between gap-3 flex-wrap">
              <h3 className="display" style={{ fontSize: "1.5rem" }}>{s.title}</h3>
              <span className="label">{s.form}</span>
            </div>
            <p className="mono" style={sub}>{s.tools.join(" · ")}</p>
            <p data-copy className="text-[0.97rem] p-3" style={{ background: "hsl(var(--wash))", borderLeft: "2px solid hsl(var(--mark))" }}>{s.prompt}</p>
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm" style={sub}>
                Leans on <em>{s.leans.toLowerCase()}</em>; works around <em>{s.around.toLowerCase()}</em>.
              </p>
              <CopyButton text={s.prompt} />
            </div>
          </li>
        ))}
      </ul>
      <p className="text-sm measure" style={sub}>Square brackets mark the part to fill in. Everything else is meant to be used as written.</p>
    </div>
  );
}

export function Instruments() {
  const groups = [
    { kind: "made", title: "Made for this", note: "In this repository under .claude/skills/conditionalism/." },
    { kind: "used", title: "Used as found", note: "Tools and connectors already available in a session like this one." },
    { kind: "wished", title: "Wished for", note: "Instruments that don't exist yet, or exist only roughly." },
  ] as const;
  return (
    <div className="grid gap-8 min-w-0" style={{ ...full, gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" }}>
      {groups.map((g) => (
        <div key={g.kind} className="grid gap-0 min-w-0" style={{ alignContent: "start" }}>
          <h3 className="display pb-1" style={{ fontSize: "1.5rem", borderBottom: "1px solid hsl(var(--ink))" }}>{g.title}</h3>
          <p className="text-sm py-2" style={sub}>{g.note}</p>
          {INSTRUMENTS.filter((i) => i.kind === g.kind).map((i) => (
            <div key={i.name} className="grid gap-1 py-3" style={{ borderTop: "1px solid hsl(var(--rule))" }}>
              <p className="mono" style={{ color: g.kind === "wished" ? "hsl(var(--ink-2))" : "hsl(var(--ink))", fontStyle: g.kind === "wished" ? "italic" : undefined }}>{i.name}</p>
              <p className="text-[0.95rem]">{i.what}</p>
              <p className="text-sm" style={sub}>{i.covers}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
