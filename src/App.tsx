import { useCallback, useDeferredValue, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import type { ExportOptions, IconData, IconLibrary } from "./types";
import { buildIndex, search } from "./lib/search";
import { copyText, displayName, toSvg, toTsx } from "./lib/codegen";
import { useFavorites, usePersistentState } from "./lib/storage";
import { GameIcon } from "./components/GameIcon";
import { IconGrid, type Section } from "./components/IconGrid";
import { Sidebar } from "./components/Sidebar";
import { DetailPanel } from "./components/DetailPanel";
import { ColorPicker } from "./components/ColorPicker";
import { AboutDialog } from "./components/AboutDialog";
import { useToast } from "./components/Toast";

const DEFAULT_OPTS: ExportOptions = { color: "currentColor", size: 24, attribution: false };
const PREVIEW_SIZES = [24, 32, 40, 48];
const GITHUB_URL = "https://github.com/firuzcanh";
const FIGMA_URL = "https://www.figma.com/community/file/1266365661823917037/the-ultimate-games-icons-library";

const systemTheme = () => (window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light");

export default function App() {
  const [lib, setLib] = useState<IconLibrary | null>(null);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [active, setActive] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [colorOpen, setColorOpen] = useState(false);
  const [previewSize, setPreviewSize] = usePersistentState("gi:preview-size", 32);
  const [opts, setOpts] = usePersistentState<ExportOptions>("gi:export", DEFAULT_OPTS);
  const [theme, setTheme] = usePersistentState<"dark" | "light">("gi:theme", systemTheme());
  const { favorites, toggle: toggleFavorite } = useFavorites();
  const toast = useToast();
  const searchRef = useRef<HTMLInputElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [toolbarH, setToolbarH] = useState(64);

  useEffect(() => {
    import("./data/icons.json").then((m) => setLib(m.default as IconLibrary));
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useLayoutEffect(() => {
    const el = toolbarRef.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      setToolbarH(el.offsetHeight);
      document.documentElement.style.setProperty("--toolbar-h", `${el.offsetHeight}px`);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const index = useMemo(() => (lib ? buildIndex(lib.icons, lib.categories) : []), [lib]);
  const iconByName = useMemo(() => new Map(lib?.icons.map((i) => [i.n, i]) ?? []), [lib]);
  const categoryById = useMemo(() => new Map(lib?.categories.map((c) => [c.id, c]) ?? []), [lib]);
  const favoriteSet = useMemo(() => new Set(favorites), [favorites]);

  const results = useMemo(() => search(index, deferredQuery), [index, deferredQuery]);

  const counts = useMemo(() => {
    const m = new Map<string, number>();
    for (const i of results) m.set(i.c, (m.get(i.c) ?? 0) + 1);
    return m;
  }, [results]);

  const sections: Section[] = useMemo(() => {
    if (!lib) return [];
    const searching = deferredQuery.trim().length > 0;
    if (active === "favorites") {
      const set = new Set(results.map((i) => i.n));
      const icons = favorites.filter((n) => set.has(n)).map((n) => iconByName.get(n)!).filter(Boolean);
      return [{ title: "Favorites", icons }];
    }
    if (active !== "all") {
      const category = categoryById.get(active);
      const idx = lib.categories.findIndex((c) => c.id === active) + 1;
      return [{ category, index: idx, title: category?.label ?? active, icons: results.filter((i) => i.c === active) }];
    }
    // Search results stay in rank order; browsing groups everything by category.
    if (searching) return [{ title: "Results", icons: results }];
    return lib.categories.map((category, i) => ({
      category,
      index: i + 1,
      title: category.label,
      icons: results.filter((icon) => icon.c === category.id),
    }));
  }, [lib, active, results, deferredQuery, favorites, iconByName, categoryById]);

  const visible = useMemo(() => sections.flatMap((s) => s.icons), [sections]);
  const selectedIcon = selected ? iconByName.get(selected) : undefined;

  const related = useMemo(() => {
    if (!selectedIcon) return [];
    const words = new Set(selectedIcon.w.split(" ").filter((w) => w.length > 2));
    const scored: { icon: IconData; score: number }[] = [];
    for (const icon of lib?.icons ?? []) {
      if (icon.n === selectedIcon.n) continue;
      let score = icon.c === selectedIcon.c ? 1 : 0;
      for (const w of icon.w.split(" ")) if (words.has(w)) score += 3;
      if (score > 1) scored.push({ icon, score });
    }
    return scored.sort((a, b) => b.score - a.score).slice(0, 16).map((s) => s.icon);
  }, [selectedIcon, lib]);

  const handleCopy = useCallback(
    (icon: IconData, format: "svg" | "tsx") => {
      copyText(format === "svg" ? toSvg(icon, opts) : toTsx(icon, opts));
      toast(`Copied ${displayName(icon)}`, format.toUpperCase());
    },
    [opts, toast],
  );

  const handleOpen = useCallback((icon: IconData) => setSelected(icon.n), []);

  const handleToggleFavorite = useCallback(
    (name: string) => {
      toast(favoriteSet.has(name) ? "Removed from favorites" : "Added to favorites");
      toggleFavorite(name);
    },
    [favoriteSet, toggleFavorite, toast],
  );

  const pickRandom = useCallback(() => {
    const pool = visible.length ? visible : lib?.icons ?? [];
    if (pool.length) setSelected(pool[Math.floor(Math.random() * pool.length)].n);
  }, [visible, lib]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement)?.matches?.("input, textarea");
      if (((e.metaKey || e.ctrlKey) && e.key === "k") || (e.key === "/" && !typing)) {
        e.preventDefault();
        searchRef.current?.focus();
        searchRef.current?.select();
        return;
      }
      if (e.key === "Escape") {
        if (typing && query) setQuery("");
        else if (typing) (e.target as HTMLElement).blur();
        else setSelected(null);
        return;
      }
      if (typing || e.metaKey || e.ctrlKey || e.altKey || !selectedIcon) return;
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        const i = visible.findIndex((v) => v.n === selectedIcon.n);
        if (i === -1) return;
        setSelected(visible[(i + (e.key === "ArrowRight" ? 1 : -1) + visible.length) % visible.length].n);
      } else if (e.key === "s") handleCopy(selectedIcon, "svg");
      else if (e.key === "t") handleCopy(selectedIcon, "tsx");
      else if (e.key === "f") handleToggleFavorite(selectedIcon.n);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [query, selectedIcon, visible, handleCopy, handleToggleFavorite]);

  const markIcon = iconByName.get("GiCrossedSwords");
  const iconCount = lib?.icons.length ?? 4038;
  const categoryCount = lib?.categories.length ?? 27;
  const isSearching = deferredQuery.trim().length > 0;

  return (
    <div className={`page${selectedIcon ? " has-inspector" : ""}`}>
      <header className="masthead">
        <a className="wordmark" href="/">
          <span className="wordmark-mark">{markIcon && <GameIcon icon={markIcon} size={14} />}</span>
          Game Icons
        </a>
        <nav className="masthead-nav">
          <a href="#library">Library</a>
          <button onClick={() => setAboutOpen(true)}>License</button>
          <a href={FIGMA_URL} target="_blank" rel="noreferrer">
            Figma ↗
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            <span className={`theme-dot is-${theme}`} />
          </button>
        </nav>
      </header>

      <section className="hero">
        <h1>Game icons</h1>
        <p className="hero-lede">
          {iconCount.toLocaleString()} icons for interfaces, prototypes and games. Search the set, browse it by
          category, and copy any icon as SVG markup or a typed React component.
        </p>
        <dl className="hero-stats">
          <div>
            <dt>Icons</dt>
            <dd>{iconCount.toLocaleString()}</dd>
          </div>
          <div>
            <dt>Categories</dt>
            <dd>{categoryCount}</dd>
          </div>
          <div>
            <dt>Grid</dt>
            <dd>24 × 24</dd>
          </div>
          <div>
            <dt>License</dt>
            <dd>
              <button className="text-link" onClick={() => setAboutOpen(true)}>
                CC BY
              </button>
            </dd>
          </div>
        </dl>
      </section>

      <div className="toolbar" ref={toolbarRef} id="library">
        <div className="toolbar-inner">
          <label className="search">
            <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
              <circle cx="7" cy="7" r="4.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <path d="M10.5 10.5L14 14" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder={`Search ${iconCount.toLocaleString()} icons`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search icons"
            />
            {query ? (
              <button className="search-clear" onClick={() => setQuery("")}>
                Clear
              </button>
            ) : (
              <kbd>/</kbd>
            )}
          </label>

          <div className="toolbar-controls">
            <span className="result-count" aria-live="polite">
              {isSearching ? `${results.length.toLocaleString()} results` : ""}
            </span>
            <div className="segmented" role="group" aria-label="Preview size">
              {PREVIEW_SIZES.map((s) => (
                <button key={s} aria-pressed={previewSize === s} onClick={() => setPreviewSize(s)}>
                  {s}
                </button>
              ))}
            </div>
            <div className="popover-anchor">
              <button
                className="tool-btn"
                onClick={() => setColorOpen((o) => !o)}
                aria-expanded={colorOpen}
                aria-label="Icon color"
              >
                <span
                  className={`color-chip${opts.color === "currentColor" ? " is-inherit" : ""}`}
                  style={opts.color === "currentColor" ? undefined : { background: opts.color }}
                />
              </button>
              {colorOpen && (
                <>
                  <div className="popover-scrim" onClick={() => setColorOpen(false)} />
                  <div className="popover">
                    <div className="popover-title">Icon color</div>
                    <ColorPicker value={opts.color} onChange={(color) => setOpts({ ...opts, color })} />
                  </div>
                </>
              )}
            </div>
            <button className="tool-btn" onClick={pickRandom} title="Random icon" aria-label="Inspect a random icon">
              <svg viewBox="0 0 16 16" width="15" height="15" aria-hidden="true">
                <path
                  d="M2 4.5h2.2c1.2 0 2 .5 2.7 1.5l2.2 4c.6 1 1.4 1.5 2.6 1.5H14M2 11.5h2.2c1.2 0 2-.5 2.7-1.5M9.1 6c.6-1 1.4-1.5 2.6-1.5H14M12.2 2.8L14 4.5l-1.8 1.7M12.2 9.8L14 11.5l-1.8 1.7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {lib ? (
        <div className="layout">
          <Sidebar
            categories={lib.categories}
            counts={counts}
            total={results.length}
            favoritesCount={favorites.length}
            active={active}
            onSelect={setActive}
          />

          <main className="main">
            {visible.length > 0 ? (
              <IconGrid
                sections={sections}
                size={previewSize}
                color={opts.color}
                selected={selected}
                favorites={favoriteSet}
                resetKey={`${active}|${deferredQuery}`}
                stickyOffset={toolbarH}
                onOpen={handleOpen}
                onCopy={handleCopy}
              />
            ) : (
              <EmptyState
                favorites={active === "favorites" && !deferredQuery}
                query={deferredQuery}
                onReset={() => {
                  setQuery("");
                  setActive("all");
                }}
              />
            )}
          </main>

          {selectedIcon && (
            <DetailPanel
              key={selectedIcon.n}
              icon={selectedIcon}
              category={categoryById.get(selectedIcon.c)}
              related={related}
              opts={opts}
              favorite={favoriteSet.has(selectedIcon.n)}
              onOptsChange={setOpts}
              onCopy={handleCopy}
              onOpen={handleOpen}
              onToggleFavorite={handleToggleFavorite}
              onSearch={(q) => {
                setQuery(q);
                setActive("all");
              }}
              onCategory={(id) => {
                setQuery("");
                setActive(id);
              }}
              onClose={() => setSelected(null)}
            />
          )}
        </div>
      ) : (
        <div className="loading">
          <span className="loading-bar" />
          Loading library
        </div>
      )}

      <footer className="site-footer">
        <div className="footer-col">
          <div className="wordmark">
            <span className="wordmark-mark">{markIcon && <GameIcon icon={markIcon} size={14} />}</span>
            Game Icons
          </div>
          <p>
            Artwork by Lorc, Delapouite and contributors of{" "}
            <a href="https://game-icons.net" target="_blank" rel="noreferrer">
              game-icons.net
            </a>{" "}
            (CC BY 3.0), via{" "}
            <a href={FIGMA_URL} target="_blank" rel="noreferrer">
              The Ultimate Games Icons Library
            </a>{" "}
            by Nimesh (CC BY 4.0).{" "}
            <button className="text-link" onClick={() => setAboutOpen(true)}>
              License details
            </button>
          </p>
          <div className="footer-meta">
            Built by{" "}
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              @firuzcanh
            </a>{" "}
            on GitHub
          </div>
        </div>
        <div className="footer-col">
          <h4>Shortcuts</h4>
          <ul className="shortcuts">
            <li>
              <kbd>/</kbd> Search
            </li>
            <li>
              <kbd>←</kbd>
              <kbd>→</kbd> Previous / next
            </li>
            <li>
              <kbd>S</kbd> Copy SVG
            </li>
            <li>
              <kbd>T</kbd> Copy TSX
            </li>
            <li>
              <kbd>F</kbd> Favorite
            </li>
            <li>
              <kbd>Esc</kbd> Close
            </li>
          </ul>
        </div>
      </footer>

      <AboutDialog open={aboutOpen} onClose={() => setAboutOpen(false)} />
    </div>
  );
}

function EmptyState({ favorites, query, onReset }: { favorites: boolean; query: string; onReset: () => void }) {
  return (
    <div className="empty">
      {favorites ? (
        <>
          <h3>No favorites yet</h3>
          <p>
            Open an icon and press <kbd>F</kbd> to keep it here.
          </p>
        </>
      ) : (
        <>
          <h3>No icons match “{query}”</h3>
          <p>Try a broader word, such as sword, skull or potion.</p>
        </>
      )}
      <button className="btn" onClick={onReset}>
        Show all icons
      </button>
    </div>
  );
}
