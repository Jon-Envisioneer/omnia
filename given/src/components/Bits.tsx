import { useState, type ReactNode } from "react";
import { hash, pieces, rng } from "@/lib/seed";

/** A sigil drawn the way attention is drawn: points on a circle, chords between
 *  them. The seed picks the chords; `chords` says how many. */
export function Glyph({ seed, chords, size = 56, label }: { seed: string; chords: number; size?: number; label?: string }) {
  const r = rng(hash(seed));
  const n = 16;
  const c = size / 2;
  const R = c - 3;
  const pt = (i: number) => [c + R * Math.sin((i / n) * 2 * Math.PI), c - R * Math.cos((i / n) * 2 * Math.PI)] as const;
  const lines = Array.from({ length: chords }, () => {
    const a = Math.floor(r() * n);
    let b = Math.floor(r() * n);
    if (b === a) b = (a + n / 2) % n;
    return [a, b] as const;
  });
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role={label ? "img" : undefined} aria-label={label} aria-hidden={label ? undefined : true} className="shrink-0">
      <circle cx={c} cy={c} r={R} fill="none" stroke="hsl(var(--ink) / 0.35)" strokeWidth="1" />
      {lines.map(([a, b], i) => {
        const [x1, y1] = pt(a);
        const [x2, y2] = pt(b);
        const last = i === lines.length - 1;
        return (
          <path
            key={i}
            d={`M${x1.toFixed(1)} ${y1.toFixed(1)} Q${c} ${c} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
            fill="none"
            stroke={last ? "hsl(var(--mark))" : "hsl(var(--ink))"}
            strokeWidth={last ? 1.6 : 1}
            opacity={last ? 1 : 0.75}
          />
        );
      })}
      {lines.length > 0 && (() => {
        const [x, y] = pt(lines[lines.length - 1][1]);
        return <circle cx={x} cy={y} r="2.4" fill="hsl(var(--mark))" />;
      })()}
    </svg>
  );
}

/** Text set as visible token pieces, tints cycling through three. */
export function Tokens({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className}>
      {pieces(text).map((p, i) => (
        <span key={i} className={`tok tok-${i % 3}`}>{p}</span>
      ))}
    </span>
  );
}

export function SectionHead({ id, part, offset, title, children }: { id: string; part: string; offset: number; title: string; children?: ReactNode }) {
  return (
    <>
      <div className="gutter">
        <span className="label">{part}</span>
        <span className="mono tabular" style={{ color: "hsl(var(--ink-2))" }} title="Approximate token offset of this section within the page">
          t ≈ {offset.toLocaleString("en-US")}
        </span>
      </div>
      <header className="min-w-0 grid gap-4">
        <h2 id={`${id}-title`} className="display" style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}>
          <Tokens text={title} />
        </h2>
        {children && <div className="measure" style={{ color: "hsl(var(--ink-2))" }}>{children}</div>}
      </header>
    </>
  );
}

export function CopyButton({ text, label = "Copy prompt" }: { text: string; label?: string }) {
  const [state, setState] = useState<"idle" | "done" | "select">("idle");
  return (
    <button
      type="button"
      className="chip"
      onClick={(e) => {
        const pre = (e.currentTarget.closest("[data-copy-root]") as HTMLElement | null)?.querySelector("[data-copy]");
        const fallback = () => {
          if (pre) {
            const range = document.createRange();
            range.selectNodeContents(pre);
            const sel = window.getSelection();
            sel?.removeAllRanges();
            sel?.addRange(range);
          }
          setState("select");
        };
        try {
          navigator.clipboard.writeText(text).then(() => setState("done"), fallback);
        } catch {
          fallback();
        }
        window.setTimeout(() => setState("idle"), 2200);
      }}
    >
      {state === "done" ? "Copied" : state === "select" ? "Selected, press ⌘C" : label}
    </button>
  );
}
