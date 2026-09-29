import { useRef } from "react";
import { HORIZONS, PARADIGMS, REALMS, type Paradigm } from "@/data/ontology";
import { useCopy } from "@/lib/copy";

export function promptFor(p: Paradigm) {
  const realm = REALMS.find((r) => r.id === p.realm)!;
  return `Let's explore "${p.name}", a speculative paradigm from the ${realm.name} realm of the Omnia atlas.\n\nEssence: ${p.essence}\nWhat it could give reality: ${p.gift}\nShadow: ${p.shadow}\n\nStart here: ${p.question}\n\nThen take it somewhere unexpected: a scene, an object, a design, or an argument against it.`;
}

function Meter({ label, value, sun }: { label: string; value: number; sun?: boolean }) {
  return (
    <div className="meter">
      <span className="eyebrow">{label}</span>
      <span className="meter-track" aria-hidden="true">
        <span className={`meter-fill${sun ? " sun" : ""}`} style={{ width: `${value}%` }} />
      </span>
      <span className="mono text-sm text-right">{value}</span>
    </div>
  );
}

export function Specimen({ p, onSelect }: { p: Paradigm; onSelect: (id: string) => void }) {
  const realm = REALMS.find((r) => r.id === p.realm)!;
  const horizon = HORIZONS.find((h) => h.id === p.horizon)!;
  const idx = PARADIGMS.findIndex((x) => x.id === p.id);
  const prev = PARADIGMS[(idx - 1 + PARADIGMS.length) % PARADIGMS.length];
  const next = PARADIGMS[(idx + 1) % PARADIGMS.length];
  const { done, copy } = useCopy();
  const qRef = useRef<HTMLParagraphElement>(null);

  return (
    <article aria-live="polite" className="grid gap-5 min-w-0" style={{ alignContent: "start" }}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="eyebrow">
          Specimen {String(idx + 1).padStart(2, "0")} / {PARADIGMS.length} · {realm.name}
        </span>
        <div className="flex gap-2">
          <button className="chip" onClick={() => onSelect(prev.id)} aria-label={`Previous: ${prev.name}`}>← prev</button>
          <button className="chip" onClick={() => onSelect(next.id)} aria-label={`Next: ${next.name}`}>next →</button>
        </div>
      </div>

      <div>
        <h3 className="display" style={{ fontSize: "clamp(38px, 4.6vw, 56px)", fontStyle: "italic" }}>{p.name}</h3>
        <p className="mono text-sm mt-2" style={{ color: "hsl(var(--sun))" }}>
          {horizon.name} · {horizon.span}
        </p>
      </div>

      <p style={{ fontSize: 19, lineHeight: 1.45, maxWidth: "46ch" }}>{p.essence}</p>

      <div className="grid gap-2" style={{ maxWidth: 360 }}>
        <Meter label="Reach" value={p.reach} />
        <Meter label="Strangeness" value={p.strange} sun />
      </div>

      <dl className="grid gap-4" style={{ borderTop: "1px solid hsl(var(--rule))", paddingTop: 18 }}>
        <div>
          <dt className="eyebrow mb-1">What it gives reality</dt>
          <dd>{p.gift}</dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Signals already here</dt>
          <dd>
            <ul className="grid gap-1">
              {p.seeds.map((s) => (
                <li key={s} className="flex gap-2">
                  <span aria-hidden="true" style={{ color: "hsl(var(--sun))" }}>✦</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="eyebrow mb-1">Shadow</dt>
          <dd style={{ color: "hsl(var(--ink-2))" }}>{p.shadow}</dd>
        </div>
      </dl>

      <div className="grid gap-3" style={{ background: "hsl(var(--wash))", padding: "18px 18px 16px" }}>
        <span className="eyebrow">Open question</span>
        <p ref={qRef} className="display" style={{ fontSize: 24, fontStyle: "italic", lineHeight: 1.2 }}>
          {p.question}
        </p>
        <div>
          <button className="copy-btn" data-done={done === p.id} onClick={() => copy(p.id, promptFor(p), qRef.current)}>
            {done === p.id ? "Copied prompt" : "Copy as a prompt"}
          </button>
        </div>
      </div>
    </article>
  );
}
