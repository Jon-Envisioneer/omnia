"""Turn Parcel's bundle.html into an artifact page: title first, Google Fonts
link added back (html-inline can't inline remote stylesheets), and the
document wrapper tags removed since the host supplies its own skeleton."""
import re, sys, pathlib

src = pathlib.Path(sys.argv[1]).read_text()
out = pathlib.Path(sys.argv[2])

title = re.search(r"<title>.*?</title>", src, re.S).group(0)
body = src.replace(title, "")
body = re.sub(r"<!DOCTYPE html>|</?html[^>]*>|</?head[^>]*>|</?body[^>]*>", "", body, flags=re.I)
body = re.sub(r"<meta[^>]*>", "", body)

fonts = (
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?'
    "family=Atkinson+Hyperlegible:ital,wght@0,400;0,700;1,400"
    "&family=Cormorant:ital,wght@0,500;0,600;1,500;1,600"
    '&family=IBM+Plex+Mono:wght@400;500&display=swap">'
)
out.write_text(f"{title}\n{fonts}\n{body.strip()}\n")
print(f"wrote {out} ({out.stat().st_size // 1024} KB)")
