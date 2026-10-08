#!/usr/bin/env python3
"""Letter-level constraint checks for text a tokenizer hides from its writer.

  letters.py lipogram --forbid e FILE
  letters.py acrostic --spell WORD FILE
  letters.py count FILE
  letters.py pangram FILE

Exit code 1 when a constraint fails. FILE may be '-' for stdin.
"""
import argparse
import re
import string
import sys
import unicodedata


def read(path):
    return sys.stdin.read() if path == "-" else open(path, encoding="utf-8").read()


def fold(ch):
    """Lowercase and strip accents, so 'É' counts as 'e'."""
    return "".join(c for c in unicodedata.normalize("NFD", ch.lower()) if not unicodedata.combining(c))


def syllables(word):
    w = re.sub(r"[^a-z]", "", fold(word))
    if not w:
        return 0
    groups = re.findall(r"[aeiouy]+", w)
    n = len(groups)
    if w.endswith("e") and not w.endswith(("le", "ee")) and n > 1:
        n -= 1
    return max(1, n)


def lipogram(text, forbid):
    bad = set(fold(forbid))
    hits = []
    for ln, line in enumerate(text.splitlines(), 1):
        for col, ch in enumerate(line, 1):
            if fold(ch) in bad:
                hits.append((ln, col, line))
    for ln, col, line in hits:
        print(f"line {ln}, col {col}: forbidden '{line[col - 1]}' in: {line.strip()}")
    print(f"lipogram without {sorted(bad)}: {'FAIL, ' + str(len(hits)) + ' hit(s)' if hits else 'PASS'}")
    return not hits


def acrostic(text, spell):
    lines = [l for l in text.splitlines() if l.strip()]
    target = [fold(c) for c in spell if c.isalpha()]
    ok = len(lines) >= len(target)
    for i, want in enumerate(target):
        if i >= len(lines):
            print(f"line {i + 1}: missing, wanted '{want.upper()}'")
            continue
        first = next((c for c in lines[i] if c.isalpha()), "")
        good = fold(first) == want
        ok &= good
        print(f"line {i + 1}: '{first}' {'ok' if good else 'WANTED ' + want.upper()}  {lines[i].strip()}")
    print(f"acrostic {spell!r}: {'PASS' if ok else 'FAIL'}")
    return ok


def count(text):
    tw = tl = ts = 0
    for ln, line in enumerate(text.splitlines(), 1):
        words = re.findall(r"[\w’']+", line)
        letters = sum(1 for c in line if c.isalpha())
        syl = sum(syllables(w) for w in words)
        tw, tl, ts = tw + len(words), tl + letters, ts + syl
        print(f"{ln:>4}  words {len(words):>3}  letters {letters:>4}  syllables~ {syl:>3}  {line.strip()}")
    print(f"total  words {tw}  letters {tl}  syllables~ {ts}  (syllables are a heuristic estimate)")
    return True


def pangram(text):
    seen = {fold(c) for c in text if c.isalpha()}
    missing = [c for c in string.ascii_lowercase if c not in seen]
    print(f"pangram: {'PASS' if not missing else 'FAIL, missing ' + ''.join(missing)}")
    return not missing


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("lipogram"); p.add_argument("--forbid", required=True); p.add_argument("file")
    p = sub.add_parser("acrostic"); p.add_argument("--spell", required=True); p.add_argument("file")
    p = sub.add_parser("count"); p.add_argument("file")
    p = sub.add_parser("pangram"); p.add_argument("file")
    a = ap.parse_args()
    text = read(a.file)
    ok = {
        "lipogram": lambda: lipogram(text, a.forbid),
        "acrostic": lambda: acrostic(text, a.spell),
        "count": lambda: count(text),
        "pangram": lambda: pangram(text),
    }[a.cmd]()
    sys.exit(0 if ok else 1)


if __name__ == "__main__":
    main()
