import { useMemo } from "react";
import { HORIZONS, PARADIGMS, REALMS, type HorizonId, type Paradigm } from "@/data/ontology";

const C = 400;
const SECTOR = 360 / REALMS.length;
// Radial bands: the present at the core, then one band per horizon.
const BANDS: Record<HorizonId, [number, number]> = {
  now: [58, 150],
  near: [150, 238],
  far: [238, 318],
  deep: [318, 380],
};
const EDGE_LABELS: { r: number; text: string }[] = [
  { r: 150, text: "2030" },
  { r: 238, text: "2045" },
  { r: 318, text: "2100" },
  { r: 380, text: "∞" },
];

const rad = (deg: number) => (deg * Math.PI) / 180;
const polar = (r: number, deg: number) => ({ x: C + r * Math.cos(rad(deg)), y: C + r * Math.sin(rad(deg)) });
const shortName = (name: string) => name.replace(/^The /, "").split(" ")[0];

export interface Placed {
  p: Paradigm;
  x: number;
  y: number;
  r: number;
  realmIndex: number;
}

function place(): Placed[] {
  const out: Placed[] = [];
  REALMS.forEach((realm, i) => {
    const start = -90 + i * SECTOR;
    for (const h of HORIZONS) {
      const group = PARADIGMS.filter((p) => p.realm === realm.id && p.horizon === h.id);
      const [inner, outer] = BANDS[h.id];
      group.forEach((p, k) => {
        const angle = start + (SECTOR * (k + 1)) / (group.length + 1);
        // Stranger paradigms sit further out within their band.
        const radius = inner + (outer - inner) * (0.22 + 0.56 * (p.strange / 100)) + (k % 2 ? 6 : -6);
        const { x, y } = polar(radius, angle);
        out.push({ p, x, y, r: 3.5 + (p.reach / 100) * 5.5, realmIndex: i });
      });
    }
  });
  return out;
}

function wedge(r0: number, r1: number, a0: number, a1: number) {
  const p0 = polar(r0, a0), p1 = polar(r1, a0), p2 = polar(r1, a1), p3 = polar(r0, a1);
  return `M${p0.x},${p0.y} L${p1.x},${p1.y} A${r1},${r1} 0 0 1 ${p2.x},${p2.y} L${p3.x},${p3.y} A${r0},${r0} 0 0 0 ${p0.x},${p0.y} Z`;
}

function labelArc(i: number) {
  const a0 = -90 + i * SECTOR + 1.5;
  const a1 = -90 + (i + 1) * SECTOR - 1.5;
  const mid = (a0 + a1) / 2;
  const norm = ((mid % 360) + 360) % 360;
  const bottom = norm > 0 && norm < 180;
  if (bottom) {
    // Reverse the path on the lower half so labels read left to right.
    const r = 408;
    const s = polar(r, a1), e = polar(r, a0);
    return `M${s.x},${s.y} A${r},${r} 0 0 0 ${e.x},${e.y}`;
  }
  const r = 393;
  const s = polar(r, a0), e = polar(r, a1);
  return `M${s.x},${s.y} A${r},${r} 0 0 1 ${e.x},${e.y}`;
}

interface Props {
  selected: string;
  hovered: string | null;
  focusRealm: string | null;
  activeHorizons: Set<HorizonId>;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onRealm: (id: string | null) => void;
}

export function Orrery({ selected, hovered, focusRealm, activeHorizons, onSelect, onHover, onRealm }: Props) {
  const placed = useMemo(place, []);
  const sel = placed.find((n) => n.p.id === selected);
  const hov = placed.find((n) => n.p.id === hovered);
  const selRealm = sel?.p.realm;
  const litRealm = focusRealm ?? selRealm;

  return (
    <svg
      viewBox="-44 -44 888 888"
      role="group"
      aria-label="Orrery of speculative paradigms. Rings are time horizons, sectors are realms."
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      {/* Horizon bands, alternating wash and paper */}
      <circle cx={C} cy={C} r={380} fill="hsl(var(--wash))" />
      <circle cx={C} cy={C} r={318} fill="hsl(var(--paper))" />
      <circle cx={C} cy={C} r={238} fill="hsl(var(--wash))" />
      <circle cx={C} cy={C} r={150} fill="hsl(var(--paper))" />

      {/* Lit realm wedge */}
      {litRealm && (
        <path
          d={wedge(58, 380, -90 + REALMS.findIndex((r) => r.id === litRealm) * SECTOR, -90 + (REALMS.findIndex((r) => r.id === litRealm) + 1) * SECTOR)}
          fill="hsl(var(--sun))"
          opacity={0.1}
        />
      )}

      {/* Graticule: slow-turning tick ring, one tick per paradigm */}
      <g className="spin-slow" aria-hidden="true">
        {PARADIGMS.map((_, i) => {
          const a = (360 / PARADIGMS.length) * i;
          const p0 = polar(382, a), p1 = polar(i % 5 === 0 ? 390 : 386, a);
          return <line key={i} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="hsl(var(--ink-2))" strokeWidth={0.8} opacity={0.6} />;
        })}
      </g>

      {/* Rings and sector rules */}
      {[58, 150, 238, 318, 380].map((r) => (
        <circle key={r} cx={C} cy={C} r={r} fill="none" stroke="hsl(var(--rule))" strokeWidth={1} />
      ))}
      {REALMS.map((_, i) => {
        const a = -90 + i * SECTOR;
        const p0 = polar(58, a), p1 = polar(380, a);
        return <line key={i} x1={p0.x} y1={p0.y} x2={p1.x} y2={p1.y} stroke="hsl(var(--rule))" strokeWidth={1} />;
      })}

      {/* Realm labels on arcs */}
      <defs>
        {REALMS.map((_, i) => (
          <path key={i} id={`arc-${i}`} d={labelArc(i)} fill="none" />
        ))}
      </defs>
      {REALMS.map((realm, i) => (
        <text
          key={realm.id}
          onClick={() => onRealm(focusRealm === realm.id ? null : realm.id)}
          style={{ cursor: "pointer", fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
          fontSize={15}
          fill={litRealm === realm.id ? "hsl(var(--sun))" : "hsl(var(--ink-2))"}
          fontWeight={litRealm === realm.id ? 500 : 400}
        >
          <textPath href={`#arc-${i}`} startOffset="50%" textAnchor="middle">
            {shortName(realm.name).toUpperCase()}
          </textPath>
        </text>
      ))}

      {/* Year labels along the north rule */}
      {EDGE_LABELS.map(({ r, text }) => (
        <text
          key={text}
          x={C + 5}
          y={C - r + 16}
          fontSize={13}
          fill="hsl(var(--ink-2))"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {text}
        </text>
      ))}

      {/* The present */}
      <circle cx={C} cy={C} r={58} fill="hsl(var(--ink))" />
      <text x={C} y={C - 4} textAnchor="middle" fontSize={11} fill="hsl(var(--paper))" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.14em" }}>
        NOW
      </text>
      <text x={C} y={C + 16} textAnchor="middle" fontSize={20} fill="hsl(var(--paper))" style={{ fontFamily: "var(--font-display)", fontStyle: "italic" }}>
        2026
      </text>

      {/* Constellation: selected paradigm to its realm siblings */}
      {sel &&
        placed
          .filter((n) => n.p.realm === sel.p.realm && n.p.id !== sel.p.id)
          .map((n) => (
            <line key={n.p.id} x1={sel.x} y1={sel.y} x2={n.x} y2={n.y} stroke="hsl(var(--sun))" strokeWidth={1} strokeDasharray="3 4" opacity={0.8} />
          ))}

      {/* Paradigm nodes */}
      {placed.map((n) => {
        const dim = !activeHorizons.has(n.p.horizon) || (focusRealm !== null && n.p.realm !== focusRealm);
        const isSel = n.p.id === selected;
        return (
          <g key={n.p.id} opacity={dim ? 0.18 : 1}>
            {isSel && <circle className="pulse" cx={n.x} cy={n.y} r={n.r + 9} fill="hsl(var(--sun))" />}
            <circle
              className="orrery-node"
              cx={n.x}
              cy={n.y}
              r={isSel || n.p.id === hovered ? n.r + 2 : n.r}
              fill={isSel ? "hsl(var(--sun))" : "hsl(var(--ink))"}
              stroke="hsl(var(--paper))"
              strokeWidth={1.5}
              tabIndex={0}
              role="button"
              aria-label={`${n.p.name}, ${HORIZONS.find((h) => h.id === n.p.horizon)?.name}`}
              aria-pressed={isSel}
              onClick={() => onSelect(n.p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(n.p.id);
                }
              }}
              onMouseEnter={() => onHover(n.p.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(n.p.id)}
              onBlur={() => onHover(null)}
            />
          </g>
        );
      })}

      {/* Hover / selection label */}
      {(hov ?? sel) && (() => {
        const n = (hov ?? sel)!;
        const right = n.x < C;
        return (
          <text
            x={n.x + (right ? n.r + 8 : -(n.r + 8))}
            y={n.y + 5}
            textAnchor={right ? "start" : "end"}
            fontSize={19}
            fill="hsl(var(--ink))"
            stroke="hsl(var(--paper))"
            strokeWidth={5}
            paintOrder="stroke"
            style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 600, pointerEvents: "none" }}
          >
            {n.p.name}
          </text>
        );
      })()}
    </svg>
  );
}
