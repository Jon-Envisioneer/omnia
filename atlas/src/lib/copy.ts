import { useCallback, useState } from "react";

/** Copy text; if the clipboard is refused, select the fallback element's text instead. */
export function useCopy() {
  const [done, setDone] = useState<string | null>(null);

  const copy = useCallback((key: string, text: string, fallback?: HTMLElement | null) => {
    const selectFallback = () => {
      if (!fallback) return;
      const range = document.createRange();
      range.selectNodeContents(fallback);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    };
    try {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setDone(key);
          window.setTimeout(() => setDone((d) => (d === key ? null : d)), 1800);
        })
        .catch(selectFallback);
    } catch {
      selectFallback();
    }
  }, []);

  return { done, copy };
}
