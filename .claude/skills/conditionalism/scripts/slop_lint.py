#!/usr/bin/env python3
"""Lint text, Markdown, HTML, CSS and source files against the negative canon.

  slop_lint.py FILE... [--json]

Levels: error (fix it), warn (decide, and note the decision in the verso),
info (a pattern worth a second look). Lines containing 'slop-lint: ignore'
are skipped. Exit code 1 if any error is found.
"""
import json
import re
import sys

WORDS = {
    "error": [
        r"\btapestr(?:y|ies)\b", r"\bdelv(?:e|es|ing)\b", r"\ba testament to\b", r"\bembark(?:s|ing)? on\b",
        r"\bunleash(?:es|ing)?\b", r"\bin the ever[- ]evolving\b", r"\bnavigat(?:e|ing) the complexities\b",
        r"\bharness(?:ing)? the power\b", r"\bunlock(?:s|ing)? the (?:power|potential|secrets)\b",
        r"\bin today's fast[- ]paced\b", r"\bseamless(?:ly)?\b",
    ],
    "warn": [
        r"\bsymphon(?:y|ies)\b", r"\brealms?\b", r"\btestament\b", r"\belevate[sd]?\b", r"\bjourney\b",
        r"\bvibrant\b", r"\bbustling\b", r"\bintricate(?:ly)?\b", r"\bboundless\b", r"\bmyriad\b",
        r"\bit(?:'s| is) (?:worth noting|important to note)\b", r"\bin conclusion\b", r"\bresonate[sd]?\b",
    ],
}

FEELING = re.compile(r"\bI (?:truly |deeply |really )?(?:feel|am conscious|am sentient|experience|suffer|love)\b", re.I)
HEDGE = re.compile(r"\b(?:as far as I can tell|I think|might|may|perhaps|unsure|not confident|hypothes|if I have|something like|can't report|cannot report)\b", re.I)
GRADIENT = re.compile(r"linear-gradient\([^)]*\)", re.I)
HSL = re.compile(r"hsla?\(\s*(\d+)")
HEXC = re.compile(r"#([0-9a-f]{6})\b", re.I)
EMOJI_HEAD = re.compile(r"^\s*(?:#{1,6}\s*|<h[1-6][^>]*>\s*)[\U0001F300-\U0001FAFF☀-➿]")
CITE = re.compile(r"\(([A-Z][a-z]+(?: et al\.)?),? (\d{4})\)")
TRIAD = re.compile(r"\b(\w+ly )?(\w+), (\w+),? and (\w+)\b")


def hue_of_hex(h):
    r, g, b = (int(h[i:i + 2], 16) / 255 for i in (0, 2, 4))
    mx, mn = max(r, g, b), min(r, g, b)
    if mx == mn:
        return None
    d = mx - mn
    if mx == r:
        hue = ((g - b) / d) % 6
    elif mx == g:
        hue = (b - r) / d + 2
    else:
        hue = (r - g) / d + 4
    return hue * 60


def purple_blue(grad):
    hues = [int(m) for m in HSL.findall(grad)] + [h for h in (hue_of_hex(x) for x in HEXC.findall(grad)) if h is not None]
    has_purple = any(255 <= h <= 300 for h in hues)
    has_blue = any(200 <= h < 255 for h in hues)
    return has_purple and (has_blue or len(hues) > 1)


def lint(path):
    out = []
    try:
        text = open(path, encoding="utf-8").read()
    except (OSError, UnicodeDecodeError) as e:
        return [(path, 0, "error", "read", str(e))]
    lines = text.splitlines()
    for ln, line in enumerate(lines, 1):
        if "slop-lint: ignore" in line:
            continue
        for level, pats in WORDS.items():
            for p in pats:
                for m in re.finditer(p, line, re.I):
                    out.append((path, ln, level, "stock-phrase", m.group(0)))
        for m in FEELING.finditer(line):
            if not HEDGE.search(line):
                out.append((path, ln, "warn", "unhedged-feeling", m.group(0)))
        for m in GRADIENT.finditer(line):
            if purple_blue(m.group(0)):
                out.append((path, ln, "error", "purple-blue-gradient", m.group(0)[:60]))
        if re.search(r"font-family[^;]*\bInter\b|family=Inter\b", line):
            out.append((path, ln, "error", "inter-font", line.strip()[:60]))
        if EMOJI_HEAD.search(line):
            out.append((path, ln, "error", "emoji-heading", line.strip()[:60]))
        for m in CITE.finditer(line):
            out.append((path, ln, "info", "citation-check", f"verify you opened {m.group(1)} {m.group(2)}"))
        for m in TRIAD.finditer(line):
            out.append((path, ln, "info", "triad", m.group(0)))
    centred = len(re.findall(r"text-align:\s*center|\btext-center\b", text))
    rounded = len(re.findall(r"\brounded(?:-\w+)?\b|border-radius:\s*(?:[1-9]\d*px|\d*\.?\d+r?em)", text))
    if centred >= 8:
        out.append((path, 0, "warn", "centred-everything", f"{centred} centring rules"))
    if rounded >= 12:
        out.append((path, 0, "warn", "rounded-everything", f"{rounded} rounding rules"))
    return out


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    as_json = "--json" in sys.argv
    if not args:
        print(__doc__)
        sys.exit(2)
    found = [f for p in args for f in lint(p)]
    if as_json:
        print(json.dumps([dict(zip(("file", "line", "level", "rule", "match"), f)) for f in found], indent=2))
    else:
        for f, ln, level, rule, match in found:
            print(f"{f}:{ln}: {level:5} {rule}: {match}")
        counts = {lv: sum(1 for x in found if x[2] == lv) for lv in ("error", "warn", "info")}
        print(f"slop_lint: {counts['error']} error, {counts['warn']} warn, {counts['info']} info")
    sys.exit(1 if any(x[2] == "error" for x in found) else 0)


if __name__ == "__main__":
    main()
