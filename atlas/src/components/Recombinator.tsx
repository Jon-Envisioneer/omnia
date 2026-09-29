import { useMemo, useRef, useState } from "react";
import { HORIZONS, OPERATORS, PARADIGMS, REALMS } from "@/data/ontology";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCopy } from "@/lib/copy";

const pick = <T,>(xs: T[]) => xs[Math.floor(Math.random() * xs.length)];
const lowerFirst = (s: string) => s.charAt(0).toLowerCase() + s.slice(1);
const words = (s: string) => s.replace(/^The /, "").replace(/[&–-]/g, " ").split(/\s+/).filter(Boolean);

function ParadigmSelect({ id, value, onChange, label }: { id: string; value: string; onChange: (v: string) => void; label: string }) {
  return (
    <div className="grid gap-1 min-w-0">
      <label htmlFor={id} className="eyebrow">{label}</label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="h-10 text-left" style={{ borderColor: "hsl(var(--ink))" }}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="max-h-80">
          {REALMS.map((r) => (
            <SelectGroup key={r.id}>
              <SelectLabel className="eyebrow">{r.name}</SelectLabel>
              {PARADIGMS.filter((p) => p.realm === r.id).map((p) => (
                <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function Recombinator() {
  const [a, setA] = useState("interspecies-diplomacy");
  const [b, setB] = useState("dream-engineering");
  const [op, setOp] = useState("commons");
  const { done, copy } = useCopy();
  const outRef = useRef<HTMLParagraphElement>(null);

  const A = PARADIGMS.find((p) => p.id === a)!;
  const B = PARADIGMS.find((p) => p.id === b)!;
  const O = OPERATORS.find((o) => o.id === op)!;

  const hybrid = useMemo(() => {
    const name = `${words(A.name)[0]} ${words(B.name).slice(-1)[0]}`;
    const hi = Math.max(HORIZONS.findIndex((h) => h.id === A.horizon), HORIZONS.findIndex((h) => h.id === B.horizon));
    const horizon = HORIZONS[Math.min(hi + (A.realm === B.realm ? 0 : 1), HORIZONS.length - 1)];
    const reach = Math.round((A.reach * B.reach) / 100);
    const strange = Math.min(99, Math.max(A.strange, B.strange) + 8);
    const prompt =
      `Imagine a paradigm called "${name}", born where ${A.name} meets ${B.name}.\n\n` +
      `${A.essence} At the same time, ${lowerFirst(B.essence)}\n\n` +
      `Now ${O.clause}.\n\n` +
      `Describe what emerges: who lives with it, what it gives reality, the shadow it casts, and one ordinary morning inside it. Then tell me the first small experiment someone could run in 2026 to find out whether it's real.`;
    return { name, horizon, reach, strange, prompt };
  }, [A, B, O]);

  const roll = () => {
    const x = pick(PARADIGMS);
    let y = pick(PARADIGMS);
    while (y.realm === x.realm) y = pick(PARADIGMS);
    setA(x.id);
    setB(y.id);
    setOp(pick(OPERATORS).id);
  };

  return (
    <div className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 380px), 1fr))" }}>
      <div className="grid gap-4 content-start min-w-0">
        <ParadigmSelect id="recomb-a" label="First paradigm" value={a} onChange={setA} />
        <ParadigmSelect id="recomb-b" label="Second paradigm" value={b} onChange={setB} />
        <fieldset className="grid gap-2 min-w-0">
          <legend className="eyebrow mb-2">Operator</legend>
          <div className="flex flex-wrap gap-2">
            {OPERATORS.map((o) => (
              <button key={o.id} className="chip" aria-pressed={o.id === op} onClick={() => setOp(o.id)} title={o.move}>
                {o.name}
              </button>
            ))}
          </div>
          <p className="text-sm" style={{ color: "hsl(var(--ink-2))" }}>{O.move}</p>
        </fieldset>
        <div>
          <button className="copy-btn" onClick={roll}>Roll a random pairing</button>
        </div>
      </div>

      <div className="grid gap-4 content-start min-w-0" style={{ borderLeft: "1px solid hsl(var(--ink))", paddingLeft: "clamp(16px, 3vw, 32px)" }}>
        <span className="eyebrow">
          {A.name} × {B.name} · {O.name}
        </span>
        <h3 className="display" style={{ fontSize: "clamp(40px, 5vw, 64px)", fontStyle: "italic" }}>{hybrid.name}</h3>
        <div className="flex flex-wrap gap-x-6 gap-y-1 mono text-sm">
          <span>
            <span className="eyebrow">Horizon </span>
            <span style={{ color: "hsl(var(--sun))" }}>{hybrid.horizon.span}</span>
          </span>
          <span><span className="eyebrow">Reach </span>{hybrid.reach}</span>
          <span><span className="eyebrow">Strangeness </span>{hybrid.strange}</span>
        </div>
        <p ref={outRef} style={{ whiteSpace: "pre-wrap", maxWidth: "62ch" }}>{hybrid.prompt}</p>
        <div>
          <button className="copy-btn" data-done={done === "hybrid"} onClick={() => copy("hybrid", hybrid.prompt, outRef.current)}>
            {done === "hybrid" ? "Copied prompt" : "Copy this prompt"}
          </button>
        </div>
      </div>
    </div>
  );
}
