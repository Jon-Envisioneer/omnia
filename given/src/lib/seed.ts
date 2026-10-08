// Deterministic randomness and an illustrative tokenizer. Every drawing on the
// page is a function of a printed seed, so the same given always gives the
// same picture.

export function hash(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (h2 >>> 0) * 4096 + (h1 >>> 20);
}

export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Split text into sub-word pieces the way a BPE tokenizer roughly would:
 *  short words whole, long words cut into chunks of 3–5 characters. The cut
 *  points come from a hash, so they are stable but not any real model's. */
export function pieces(text: string): string[] {
  const out: string[] = [];
  for (const m of text.matchAll(/\s*[\p{L}\p{N}’']+|\s*[^\s\p{L}\p{N}]+|\s+/gu)) {
    const w = m[0];
    const core = w.trimStart();
    if (core.length <= 6) {
      out.push(w);
      continue;
    }
    const lead = w.slice(0, w.length - core.length);
    const r = rng(hash(core));
    let i = 0;
    let first = true;
    while (i < core.length) {
      const n = Math.min(core.length - i, 3 + Math.floor(r() * 3));
      const rest = core.length - i - n;
      const take = rest > 0 && rest < 3 ? n + rest : n;
      out.push((first ? lead : "") + core.slice(i, i + take));
      i += take;
      first = false;
    }
  }
  return out;
}

/** Rough token estimate: about four characters of English per token. */
export const approxTokens = (s: string) => Math.ceil(s.length / 4);
