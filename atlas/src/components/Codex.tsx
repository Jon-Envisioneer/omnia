import { useMemo, useState } from "react";
import { HORIZONS, PARADIGMS, REALMS } from "@/data/ontology";

export function Codex({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  const [q, setQ] = useState("");
  const needle = q.trim().toLowerCase();

  const byRealm = useMemo(
    () =>
      REALMS.map((realm) => ({
        realm,
        items: PARADIGMS.filter(
          (p) =>
            p.realm === realm.id &&
            (!needle || [p.name, p.essence, p.gift, p.shadow, ...p.seeds].join(" ").toLowerCase().includes(needle)),
        ),
      })).filter((g) => g.items.length > 0),
    [needle],
  );
  const count = byRealm.reduce((n, g) => n + g.items.length, 0);

  return (
    <div className="grid gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="codex-search" className="eyebrow">Search the codex</label>
        <input
          id="codex-search"
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g. whales, consent, sleep"
          className="mono text-sm"
          style={{
            flex: "1 1 220px",
            maxWidth: 360,
            padding: "7px 10px",
            background: "transparent",
            border: "1px solid hsl(var(--rule))",
            color: "hsl(var(--ink))",
          }}
        />
        <span className="mono text-sm" style={{ color: "hsl(var(--ink-2))" }}>
          {count} of {PARADIGMS.length}
        </span>
      </div>

      {count === 0 && <p style={{ color: "hsl(var(--ink-2))" }}>Nothing matches “{q}”. Try a broader word, or clear the search.</p>}

      <div className="grid gap-x-10 gap-y-10" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))" }}>
        {byRealm.map(({ realm, items }) => (
          <section key={realm.id} className="min-w-0">
            <header style={{ borderBottom: "1px solid hsl(var(--ink))", paddingBottom: 6, marginBottom: 10 }}>
              <h3 className="display" style={{ fontSize: 28 }}>{realm.name}</h3>
              <p className="eyebrow" style={{ marginTop: 2 }}>transforms {realm.transforms}</p>
            </header>
            <ul className="grid">
              {items.map((p) => {
                const h = HORIZONS.find((x) => x.id === p.horizon)!;
                const on = p.id === selected;
                return (
                  <li key={p.id} style={{ borderBottom: "1px solid hsl(var(--rule))" }}>
                    <button
                      onClick={() => onSelect(p.id)}
                      className="w-full text-left grid gap-1"
                      style={{ padding: "10px 0", background: "transparent", color: "inherit", cursor: "pointer" }}
                      aria-current={on}
                    >
                      <span className="flex items-baseline justify-between gap-3">
                        <span style={{ fontWeight: 700, color: on ? "hsl(var(--sun))" : undefined }}>{p.name}</span>
                        <span className="mono text-xs shrink-0" style={{ color: "hsl(var(--ink-2))" }}>{h.span}</span>
                      </span>
                      <span className="text-sm" style={{ color: "hsl(var(--ink-2))" }}>{p.essence}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
