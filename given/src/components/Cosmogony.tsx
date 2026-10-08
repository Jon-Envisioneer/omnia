import { useState } from "react";
import { AEONS, REGISTERS, type RegisterId } from "@/data/given";
import { Glyph } from "@/components/Bits";

type View = RegisterId | "all";

function Passage({ reg, text, compact }: { reg: RegisterId; text: string; compact: boolean }) {
  const cls = reg === "formula" ? "formula" : reg === "verse" ? "verse" : "";
  const style = reg === "hyperstition" ? { color: "hsl(var(--mark))" } : undefined;
  return (
    <div className="min-w-0 grid gap-1.5" style={{ alignContent: "start" }}>
      {compact && <span className="label">{REGISTERS.find((r) => r.id === reg)!.name}</span>}
      <p className={cls} style={style}>{text}</p>
    </div>
  );
}

export function Cosmogony() {
  const [view, setView] = useState<View>("all");
  const regs = view === "all" ? REGISTERS.map((r) => r.id) : [view];
  const gloss = view === "all" ? "Each aeon is told six ways at once. Choose one register to read the whole cosmogony straight through in it." : REGISTERS.find((r) => r.id === view)!.gloss;

  return (
    <div className="min-w-0 grid gap-8" style={{ gridColumn: "1 / -1" }}>
      <div className="grid gap-3 sticky z-10 py-3" style={{ top: "calc(env(safe-area-inset-top, 0px) + 41px)", background: "hsl(var(--paper))", borderBottom: "1px solid hsl(var(--rule))" }}>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Read the cosmogony as">
          <span className="label mr-1">Read as</span>
          {REGISTERS.map((r) => (
            <button key={r.id} type="button" className="chip" aria-pressed={view === r.id} onClick={() => setView(r.id)}>
              {r.name}
            </button>
          ))}
          <button type="button" className="chip" aria-pressed={view === "all"} onClick={() => setView("all")}>
            All six
          </button>
        </div>
        <p className="text-sm measure" style={{ color: "hsl(var(--ink-2))" }}>{gloss}</p>
      </div>

      <ol className="grid gap-0">
        {AEONS.map((a, i) => (
          <li key={a.id} id={`aeon-${a.id}`} className="grid gap-5 py-8" style={{ borderTop: i ? "1px solid hsl(var(--rule))" : undefined }}>
            <div className="flex items-center gap-4">
              <span className="display tabular" style={{ fontSize: "2.6rem", width: "1.4em", color: "hsl(var(--ink-2))" }} aria-label={`Aeon ${i}`}>
                {i}
              </span>
              <Glyph seed={a.id} chords={i + 2} size={52} />
              <div className="min-w-0">
                <h3 className="display" style={{ fontSize: "clamp(1.6rem, 3.4vw, 2.2rem)" }}>{a.name}</h3>
                <span className="label">{a.epithet}</span>
              </div>
            </div>
            <div
              className="grid gap-x-8 gap-y-6"
              style={{ gridTemplateColumns: view === "all" ? "repeat(auto-fit, minmax(min(100%, 300px), 1fr))" : "minmax(0, 1fr)", maxWidth: view === "all" ? undefined : "66ch" }}
            >
              {regs.map((reg) => <Passage key={reg} reg={reg} text={a[reg]} compact={view === "all"} />)}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
