import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useWindowVirtualizer } from "@tanstack/react-virtual";
import type { Category, IconData } from "../types";
import { IconCard } from "./IconCard";

export interface Section {
  category?: Category;
  /** 1-based position of the category, shown as "01". */
  index?: number;
  title: string;
  icons: IconData[];
}

type Row =
  | { kind: "header"; section: Section }
  | { kind: "icons"; icons: IconData[]; first: boolean };

interface Props {
  sections: Section[];
  size: number;
  color: string;
  selected: string | null;
  favorites: Set<string>;
  resetKey: string;
  /** Height of the sticky chrome above the grid, so scrolling never hides rows under it. */
  stickyOffset: number;
  onOpen: (icon: IconData) => void;
  onCopy: (icon: IconData, format: "svg" | "tsx") => void;
}

const HEADER_H = 92;
const MIN_CELL = 128;

export function IconGrid({
  sections,
  size,
  color,
  selected,
  favorites,
  resetKey,
  stickyOffset,
  onOpen,
  onCopy,
}: Props) {
  const listRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [scrollMargin, setScrollMargin] = useState(0);

  useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const measure = () => {
      setWidth(el.clientWidth);
      setScrollMargin(el.getBoundingClientRect().top + window.scrollY);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(document.body);
    return () => ro.disconnect();
  }, []);

  const minCell = Math.max(width && width < 560 ? 96 : MIN_CELL, size * 2.6);
  const columns = Math.max(2, Math.floor(width / minCell));
  // Cells share 1px hairlines: n columns need n + 1 lines.
  const cell = width ? (width - (columns + 1)) / columns : minCell;

  const rows = useMemo(() => {
    const out: Row[] = [];
    for (const section of sections) {
      if (section.category || sections.length > 1) out.push({ kind: "header", section });
      for (let i = 0; i < section.icons.length; i += columns) {
        out.push({ kind: "icons", icons: section.icons.slice(i, i + columns), first: i === 0 });
      }
    }
    return out;
  }, [sections, columns]);

  const virtualizer = useWindowVirtualizer({
    count: rows.length,
    estimateSize: (i) => {
      const row = rows[i];
      if (row.kind === "header") return HEADER_H;
      return cell + 1 + (row.first ? 1 : 0);
    },
    overscan: 4,
    scrollMargin,
    scrollPaddingStart: stickyOffset + 8,
  });

  useEffect(() => virtualizer.measure(), [virtualizer, cell, columns, rows]);

  // Jump back to the top of the list when the filter changes — but only if we are past it.
  useEffect(() => {
    const top = scrollMargin - stickyOffset - 24;
    if (window.scrollY > top) window.scrollTo({ top: Math.max(0, top) });
  }, [resetKey]);

  // Keep the selected icon visible when stepping through with the keyboard.
  useEffect(() => {
    if (!selected) return;
    const rowIndex = rows.findIndex((r) => r.kind === "icons" && r.icons.some((i) => i.n === selected));
    if (rowIndex >= 0) virtualizer.scrollToIndex(rowIndex, { align: "auto" });
  }, [selected]);

  return (
    <div ref={listRef} className="grid" style={{ height: virtualizer.getTotalSize() }}>
      {virtualizer.getVirtualItems().map((item) => {
        const row = rows[item.index];
        const style = { transform: `translateY(${item.start - scrollMargin}px)`, height: item.size };
        if (row.kind === "header") {
          return (
            <div key={item.key} className="grid-row" style={style}>
              <SectionHeader section={row.section} />
            </div>
          );
        }
        const fillers = columns - row.icons.length;
        return (
          <div key={item.key} className="grid-row" style={style}>
            <div
              className={`cells${row.first ? " is-first" : ""}`}
              style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, gridAutoRows: cell }}
            >
              {row.icons.map((icon) => (
                <IconCard
                  key={icon.n}
                  icon={icon}
                  size={size}
                  color={color}
                  selected={selected === icon.n}
                  favorite={favorites.has(icon.n)}
                  onOpen={onOpen}
                  onCopy={onCopy}
                />
              ))}
              {Array.from({ length: fillers }, (_, i) => (
                <div key={`f${i}`} className="cell cell-empty" aria-hidden="true" />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function SectionHeader({ section }: { section: Section }) {
  return (
    <div className="section-head">
      {section.index !== undefined && <span className="section-index">{String(section.index).padStart(2, "0")}</span>}
      <h2>{section.title}</h2>
      <span className="section-count">{section.icons.length.toLocaleString()}</span>
    </div>
  );
}
