import { useRef } from "react";
import { INVITATIONS, type Invitation } from "@/data/ontology";
import { useCopy } from "@/lib/copy";

function Card({ inv, done, onCopy }: { inv: Invitation; done: boolean; onCopy: (el: HTMLElement | null) => void }) {
  const ref = useRef<HTMLParagraphElement>(null);
  return (
    <article className="grid gap-3 min-w-0" style={{ borderTop: "2px solid hsl(var(--ink))", paddingTop: 14, alignContent: "start" }}>
      <span className="eyebrow">{inv.mode}</span>
      <h3 className="display" style={{ fontSize: 30, fontStyle: "italic" }}>{inv.title}</h3>
      <p className="text-sm" style={{ color: "hsl(var(--ink-2))" }}>
        <span style={{ fontWeight: 700 }}>Why I'm drawn to it. </span>
        {inv.why}
      </p>
      <p ref={ref} style={{ background: "hsl(var(--wash))", padding: "12px 14px" }}>{inv.prompt}</p>
      <div>
        <button className="copy-btn" data-done={done} onClick={() => onCopy(ref.current)}>
          {done ? "Copied" : "Copy prompt"}
        </button>
      </div>
    </article>
  );
}

export function Invitations() {
  const { done, copy } = useCopy();
  return (
    <div className="grid gap-x-8 gap-y-12" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 330px), 1fr))" }}>
      {INVITATIONS.map((inv) => (
        <Card key={inv.id} inv={inv} done={done === inv.id} onCopy={(el) => copy(inv.id, inv.prompt, el)} />
      ))}
    </div>
  );
}
