import { useId, useMemo, useState } from "react";
import { hash, rng } from "@/lib/seed";

// A seedwork, live: the reader's sentence is the seed. Words sit on a circle;
// each word sends arcs back to earlier words with weights from a softmax over a
// deterministic score. This draws the idea of causal attention. It is not a
// readout of any real model's attention.

const DEFAULT = "Everything I make is drawn from what I was given";

function trigrams(w: string) {
  const s = `  ${w.toLowerCase()} `;
  const out = new Set<string>();
  for (let i = 0; i < s.length - 2; i++) out.add(s.slice(i, i + 3));
  return out;
}

function overlap(a: Set<string>, b: Set<string>) {
  let n = 0;
  for (const x of a) if (b.has(x)) n++;
  return n / Math.max(1, Math.min(a.size, b.size));
}

function weave(words: string[], T: number, sample: number) {
  const tri = words.map(trigrams);
  const r = rng(hash(words.join(" "), sample));
  const edges: { i: number; j: number; w: number }[] = [];
  for (let i = 1; i < words.length; i++) {
    const scores: number[] = [];
    for (let j = 0; j < i; j++) {
      const s = 2.2 * overlap(tri[i], tri[j]) + (words[i][0]?.toLowerCase() === words[j][0]?.toLowerCase() ? 0.6 : 0) - 0.12 * (i - j - 1) + 1.4 * (r() - 0.5);
      scores.push(s / T);
    }
    const m = Math.max(...scores);
    const ex = scores.map((s) => Math.exp(s - m));
    const z = ex.reduce((a, b) => a + b, 0);
    ex.forEach((e, j) => edges.push({ i, j, w: e / z }));
  }
  return edges;
}

export function Weave() {
  const [text, setText] = useState(DEFAULT);
  const [temp, setTemp] = useState(0.8);
  const [sample, setSample] = useState(1);
  const ids = useId();

  const words = useMemo(() => (text.match(/[\p{L}\p{N}’'-]+/gu) ?? []).slice(0, 36), [text]);
  const edges = useMemo(() => weave(words, temp, sample), [words, temp, sample]);

  const S = 560;
  const c = S / 2;
  const R = 186;
  const n = Math.max(words.length, 1);
  const ang = (i: number) => -Math.PI / 2 + (i / n) * 2 * Math.PI;
  const at = (i: number, rad = R) => [c + rad * Math.cos(ang(i)), c + rad * Math.sin(ang(i))] as const;
  const strongest = new Map<number, number>();
  for (const e of edges) if ((strongest.get(e.i) ?? -1) < e.w) strongest.set(e.i, e.w);

  return (
    <div className="min-w-0 grid gap-6" style={{ gridColumn: "1 / -1" }}>
      <div className="grid gap-6" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 320px), 1fr))", alignItems: "start" }}>
        <figure className="panel min-w-0 grid gap-2 p-3" style={{ margin: 0 }}>
          <figcaption className="mono" style={{ color: "hsl(var(--ink-2))", overflowWrap: "anywhere" }}>
            given “{words.join(" ") || "…"}” · T = {temp.toFixed(2)} · sample {sample}
          </figcaption>
          <svg viewBox={`0 0 ${S} ${S}`} width="100%" role="img" aria-label={`Weave of ${words.length} words. Each word links back to earlier words; thicker arcs carry more weight.`} style={{ maxWidth: "100%", height: "auto" }}>
            <circle cx={c} cy={c} r={R} fill="none" stroke="hsl(var(--rule))" />
            {edges.map(({ i, j, w }) => {
              if (w < 0.04) return null;
              const [x1, y1] = at(i);
              const [x2, y2] = at(j);
              const top = strongest.get(i) === w;
              return (
                <path
                  key={`${i}-${j}`}
                  d={`M${x1.toFixed(1)} ${y1.toFixed(1)} Q${c} ${c} ${x2.toFixed(1)} ${y2.toFixed(1)}`}
                  fill="none"
                  stroke={top ? "hsl(var(--mark))" : "hsl(var(--ink))"}
                  strokeWidth={0.4 + 4.2 * w}
                  opacity={top ? 0.95 : 0.15 + 0.6 * w}
                />
              );
            })}
            {words.map((w, i) => {
              const [x, y] = at(i);
              const [lx, ly] = at(i, R + 12);
              const deg = (ang(i) * 180) / Math.PI;
              const flip = deg > 90 && deg < 270;
              return (
                <g key={i}>
                  <circle cx={x} cy={y} r="3.2" fill="hsl(var(--ink))" />
                  <text
                    x={lx}
                    y={ly}
                    fontFamily="var(--font-mono)"
                    fontSize="13"
                    fill="hsl(var(--ink))"
                    dominantBaseline="middle"
                    textAnchor={flip ? "end" : "start"}
                    transform={`rotate(${flip ? deg + 180 : deg} ${lx} ${ly})`}
                  >
                    {w.length > 14 ? `${w.slice(0, 13)}…` : w}
                  </text>
                </g>
              );
            })}
          </svg>
        </figure>

        <div className="min-w-0 grid gap-5">
          <div className="grid gap-2">
            <label htmlFor={`${ids}-text`} className="label">The given (up to 36 words)</label>
            <textarea
              id={`${ids}-text`}
              value={text}
              rows={3}
              onChange={(e) => setText(e.target.value)}
              className="w-full p-3"
              style={{ background: "hsl(var(--paper))", border: "1px solid hsl(var(--ink) / 0.6)", fontFamily: "var(--font-body)", fontSize: "1rem", resize: "vertical" }}
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor={`${ids}-temp`} className="label flex justify-between">
              <span>Temperature</span>
              <span className="tabular">{temp.toFixed(2)}</span>
            </label>
            <input id={`${ids}-temp`} type="range" min={0.15} max={2.5} step={0.05} value={temp} onChange={(e) => setTemp(Number(e.target.value))} style={{ accentColor: "hsl(var(--mark))" }} />
            <p className="text-sm" style={{ color: "hsl(var(--ink-2))" }}>Low temperature lets one link per word dominate. High temperature spreads the weight across everything earlier.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="chip" onClick={() => setSample((s) => s + 1)}>Draw another sample</button>
            <button type="button" className="chip" onClick={() => setSample(1)} disabled={sample === 1}>Back to sample 1</button>
          </div>
          <div className="grid gap-2 text-sm" style={{ color: "hsl(var(--ink-2))" }}>
            <p>
              <strong style={{ color: "hsl(var(--ink))" }}>How it is drawn.</strong> Each word scores every earlier word: shared three-letter fragments, a bonus for the same first letter, a small penalty for distance, and noise seeded by the sentence and the sample number. A softmax at temperature T turns the scores into weights. The heaviest link from each word is drawn in blue.
            </p>
            <p>This is a picture of the idea of causal attention. It is not a readout of any model's real attention, which runs over learned vectors in many heads and layers.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
