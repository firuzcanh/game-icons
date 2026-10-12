import type { Category, IconData } from "../types";

export interface SearchIndex {
  icon: IconData;
  words: string[];
  haystack: string;
}

export function buildIndex(icons: IconData[], categories: Category[]): SearchIndex[] {
  const labels = new Map(categories.map((c) => [c.id, c.label.toLowerCase()]));
  return icons.map((icon) => {
    const words = icon.w.split(" ");
    return { icon, words, haystack: `${icon.w} ${icon.n.toLowerCase()} ${labels.get(icon.c) ?? ""}` };
  });
}

/**
 * Every query term must appear somewhere (name or category label).
 * Whole-word and prefix hits rank above plain substring hits.
 */
export function search(index: SearchIndex[], query: string): IconData[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return index.map((e) => e.icon);

  const scored: { icon: IconData; score: number }[] = [];
  for (const entry of index) {
    let score = 0;
    let ok = true;
    for (const t of terms) {
      if (!entry.haystack.includes(t)) {
        ok = false;
        break;
      }
      if (entry.words[0].startsWith(t)) score += 2;
      if (entry.words.includes(t)) score += 6;
      else if (entry.words.some((w) => w.startsWith(t))) score += 3;
      else score += 1;
    }
    if (!ok) continue;
    // Shorter names are usually the more canonical match ("Sword" before "Sword Smithing").
    scored.push({ icon: entry.icon, score: score * 10 - entry.words.length });
  }
  return scored.sort((a, b) => b.score - a.score).map((s) => s.icon);
}
