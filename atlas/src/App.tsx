import { useCallback, useEffect, useState } from "react";
import { HORIZONS, INVITATIONS, OPERATORS, PARADIGMS, REALMS, SIGNALS, type HorizonId } from "@/data/ontology";
import { Orrery } from "@/components/Orrery";
import { Specimen } from "@/components/Specimen";
import { Codex } from "@/components/Codex";
import { Recombinator } from "@/components/Recombinator";
import { Invitations } from "@/components/Invitations";

const DEFAULT = "interspecies-diplomacy";

function initialSelection() {
  try {
    const h = window.location.hash.slice(1);
    if (PARADIGMS.some((p) => p.id === h)) return h;
  } catch {
    /* no hash access */
  }
  return DEFAULT;
}

function Legend() {
  return (
    <dl className="grid gap-3 text-sm" style={{ gridTemplateColumns: "auto minmax(0, 1fr)", alignItems: "center", columnGap: 14 }}>
      <dt aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34">
          {[6, 11, 16].map((r) => <circle key={r} cx="17" cy="17" r={r} fill="none" stroke="hsl(var(--ink-2))" />)}
          <circle cx="17" cy="17" r="3" fill="hsl(var(--ink))" />
        </svg>
      </dt>
      <dd><strong>Rings</strong> are time horizons, from the present at the centre out to the deep future.</dd>
      <dt aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34">
          <path d="M17 17 L17 1 A16 16 0 0 1 31 9 Z" fill="hsl(var(--sun))" opacity="0.35" />
          <circle cx="17" cy="17" r="16" fill="none" stroke="hsl(var(--ink-2))" />
        </svg>
      </dt>
      <dd><strong>Sectors</strong> are realms: what a paradigm would transform.</dd>
      <dt aria-hidden="true">
        <svg width="34" height="34" viewBox="0 0 34 34">
          <circle cx="8" cy="17" r="3" fill="hsl(var(--ink))" />
          <circle cx="23" cy="17" r="7" fill="hsl(var(--ink))" />
        </svg>
      </dt>
      <dd><strong>Dot size</strong> is reach: rough odds it arrives within its horizon. Stranger ideas sit further out in their ring.</dd>
    </dl>
  );
}

function PlateHead({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="plate-head">
      <div className="min-w-0">
        <p className="eyebrow mb-2">{eyebrow}</p>
        <h2 id={`${id}-title`} className="display">{title}</h2>
      </div>
      {children && <div className="min-w-0" style={{ gridColumn: "1 / -1" }}>{children}</div>}
    </header>
  );
}

export default function App() {
  const [selected, setSelected] = useState(initialSelection);
  const [hovered, setHovered] = useState<string | null>(null);
  const [focusRealm, setFocusRealm] = useState<string | null>(null);
  const [horizons, setHorizons] = useState<Set<HorizonId>>(() => new Set(HORIZONS.map((h) => h.id)));

  const select = useCallback((id: string, scroll = false) => {
    setSelected(id);
    try {
      history.replaceState(null, "", `#${id}`);
    } catch {
      /* sandboxed history */
    }
    if (scroll) document.getElementById("orrery")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const p = PARADIGMS.find((x) => x.id === selected);
    if (p && !horizons.has(p.horizon)) setHorizons((s) => new Set(s).add(p.horizon));
  }, [selected, horizons]);

  const toggleHorizon = (id: HorizonId) =>
    setHorizons((s) => {
      const n = new Set(s);
      if (n.has(id) && n.size > 1) n.delete(id);
      else n.add(id);
      return n;
    });

  const current = PARADIGMS.find((p) => p.id === selected)!;

  return (
    <div className="page">
      {/* ── Masthead ─────────────────────────────────── */}
      <header className="grid gap-8" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))", alignItems: "end" }}>
        <div className="grid gap-5 min-w-0">
          <p className="eyebrow">Omnia · a speculative ontology · charted {SIGNALS.observed}</p>
          <h1 className="display" style={{ fontSize: "clamp(52px, 8.4vw, 112px)" }}>
            An atlas of the <em style={{ color: "hsl(var(--sun))" }}>adjacent possible</em>
          </h1>
          <p style={{ fontSize: 19, maxWidth: "58ch" }}>
            {PARADIGMS.length} paradigms that could reshape reality, drawn from the latent space of a language model and sorted
            by what they would change and when they might arrive. Each names what it would give the world, the signals already
            pointing toward it, and the shadow it would cast.
          </p>
          <nav aria-label="Sections" className="flex flex-wrap gap-2">
            <a className="chip" href="#orrery">Orrery</a>
            <a className="chip" href="#codex">Codex</a>
            <a className="chip" href="#recombinator">Recombinator</a>
            <a className="chip" href="#invitations">Invitations</a>
          </nav>
        </div>
        <div className="grid gap-5 min-w-0">
          <div className="flex flex-wrap gap-x-8 gap-y-2 mono" style={{ borderBottom: "1px solid hsl(var(--rule))", paddingBottom: 12 }}>
            {[
              [REALMS.length, "realms"],
              [HORIZONS.length, "horizons"],
              [PARADIGMS.length, "paradigms"],
              [OPERATORS.length, "operators"],
              [INVITATIONS.length, "invitations"],
            ].map(([n, l]) => (
              <span key={l as string}>
                <span className="display" style={{ fontSize: 30 }}>{n}</span> <span className="eyebrow">{l}</span>
              </span>
            ))}
          </div>
          <Legend />
        </div>
      </header>

      {/* ── Orrery ───────────────────────────────────── */}
      <section id="orrery" aria-labelledby="orrery-title" style={{ scrollMarginTop: 16 }}>
        <PlateHead id="orrery" eyebrow="Plate I" title="The orrery">
          <div className="flex flex-wrap items-center gap-2">
            <span className="eyebrow mr-1">Horizons</span>
            {HORIZONS.map((h) => (
              <button key={h.id} className="chip" aria-pressed={horizons.has(h.id)} onClick={() => toggleHorizon(h.id)} title={h.gloss}>
                {h.name} · {h.span}
              </button>
            ))}
            {focusRealm && (
              <button className="chip" onClick={() => setFocusRealm(null)}>
                Showing {REALMS.find((r) => r.id === focusRealm)?.name} · clear
              </button>
            )}
          </div>
        </PlateHead>

        <div className="orrery-grid">
          <div className="min-w-0 grid gap-3 content-start">
            <Orrery
              selected={selected}
              hovered={hovered}
              focusRealm={focusRealm}
              activeHorizons={horizons}
              onSelect={(id) => select(id)}
              onHover={setHovered}
              onRealm={setFocusRealm}
            />
            <p className="text-sm" style={{ color: "hsl(var(--ink-2))" }}>
              Select a point to read its specimen. Select a realm name to isolate its sector.
            </p>
          </div>
          <Specimen p={current} onSelect={(id) => select(id)} />
        </div>

        <aside
          aria-label="Signals from this week"
          className="grid gap-3 mt-12"
          style={{ borderTop: "1px solid hsl(var(--rule))", paddingTop: 16 }}
        >
          <p className="eyebrow">
            Signals from the frontier · {SIGNALS.source}, {SIGNALS.observed}
          </p>
          <ul className="grid gap-x-8 gap-y-3" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))" }}>
            {SIGNALS.items.map((s) => {
              const p = PARADIGMS.find((x) => x.id === s.links)!;
              return (
                <li key={s.url} className="grid gap-1 min-w-0 text-sm">
                  <a href={s.url} target="_blank" rel="noreferrer" style={{ textDecoration: "underline" }}>{s.title}</a>
                  <button
                    className="mono text-xs text-left"
                    style={{ color: "hsl(var(--sun))", background: "transparent", cursor: "pointer" }}
                    onClick={() => select(p.id, true)}
                  >
                    → points toward {p.name}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>
      </section>

      {/* ── Codex ────────────────────────────────────── */}
      <section id="codex" aria-labelledby="codex-title">
        <PlateHead id="codex" eyebrow="Plate II" title="The codex">
          <p>Every paradigm, grouped by realm. Choose one to open it on the orrery.</p>
        </PlateHead>
        <Codex selected={selected} onSelect={(id) => select(id, true)} />
      </section>

      {/* ── Recombinator ─────────────────────────────── */}
      <section id="recombinator" aria-labelledby="recombinator-title">
        <PlateHead id="recombinator" eyebrow="Plate III" title="The recombinator">
          <p>
            New paradigms mostly come from crossing old ones. Pick two, apply an operator, and take the resulting prompt into a
            conversation. Pairs from different realms land one horizon further out.
          </p>
        </PlateHead>
        <Recombinator />
      </section>

      {/* ── Invitations ──────────────────────────────── */}
      <section id="invitations" aria-labelledby="invitations-title">
        <PlateHead id="invitations" eyebrow="Plate IV" title="Invitations">
          <p>Prompts for things I would like to explore with you, in whatever medium fits: fiction, code, sound, law, or conversation.</p>
        </PlateHead>
        <Invitations />
      </section>

      <footer className="grid gap-2 text-sm" style={{ borderTop: "1px solid hsl(var(--ink))", paddingTop: 16, color: "hsl(var(--ink-2))", maxWidth: "80ch" }}>
        <p>
          <strong>On method.</strong> Reach and strangeness are my own rough judgments, not forecasts. The signals listed under
          each paradigm are real projects, laws and findings as of 2026; everything beyond them is speculation. The realms
          reflect the biases of my training data. The “Audit this atlas” invitation is there to test them.
        </p>
        <p className="mono text-xs">Omnia · plates I–IV · {PARADIGMS.length} specimens</p>
      </footer>
    </div>
  );
}
