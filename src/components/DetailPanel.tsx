import { useMemo, useState } from "react";
import type { Category, ExportOptions, IconData } from "../types";
import { displayName, downloadPng, downloadSvg, toSvg, toTsx } from "../lib/codegen";
import { GameIcon } from "./GameIcon";
import { ColorPicker } from "./ColorPicker";

export const EXPORT_SIZES = [16, 20, 24, 32, 48];

interface Props {
  icon: IconData;
  category?: Category;
  related: IconData[];
  opts: ExportOptions;
  favorite: boolean;
  onOptsChange: (opts: ExportOptions) => void;
  onCopy: (icon: IconData, format: "svg" | "tsx") => void;
  onOpen: (icon: IconData) => void;
  onToggleFavorite: (name: string) => void;
  onSearch: (q: string) => void;
  onCategory: (id: string) => void;
  onClose: () => void;
}

export function DetailPanel({
  icon,
  category,
  related,
  opts,
  favorite,
  onOptsChange,
  onCopy,
  onOpen,
  onToggleFavorite,
  onSearch,
  onCategory,
  onClose,
}: Props) {
  const [tab, setTab] = useState<"tsx" | "svg">("tsx");
  const [showGrid, setShowGrid] = useState(true);
  const name = displayName(icon);
  const code = useMemo(() => (tab === "svg" ? toSvg(icon, opts) : toTsx(icon, opts)), [tab, icon, opts]);
  const tint = opts.color === "currentColor" ? undefined : opts.color;

  return (
    <aside className="inspector" aria-label={`${name} details`}>
      <header className="inspector-head">
        <div className="inspector-title">
          <h2>{name}</h2>
          <code>{icon.n}</code>
        </div>
        <button
          className={`ghost-btn${favorite ? " is-on" : ""}`}
          onClick={() => onToggleFavorite(icon.n)}
          aria-pressed={favorite}
          title="Favorite (F)"
        >
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path
              d="M8 1.8l1.9 3.9 4.3.6-3.1 3 .7 4.3L8 11.6l-3.8 2 .7-4.3-3.1-3 4.3-.6z"
              fill={favorite ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinejoin="round"
            />
          </svg>
          <span className="sr-only">{favorite ? "Remove from favorites" : "Add to favorites"}</span>
        </button>
        <button className="ghost-btn" onClick={onClose} title="Close (Esc)">
          <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
            <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Close</span>
        </button>
      </header>

      <div className="inspector-body">
        <figure className={`canvas${showGrid ? " has-grid" : ""}`}>
          <div className="canvas-art">
            <GameIcon icon={icon} size="100%" color={tint} />
          </div>
          <figcaption>
            <span>24 × 24</span>
            <button onClick={() => setShowGrid((g) => !g)} aria-pressed={showGrid}>
              Pixel grid {showGrid ? "on" : "off"}
            </button>
          </figcaption>
        </figure>

        <div className="scale">
          {EXPORT_SIZES.map((s) => (
            <div key={s}>
              <GameIcon icon={icon} size={s} color={tint} />
              <span>{s}</span>
            </div>
          ))}
        </div>

        <div className="copy-row">
          <button className="btn" onClick={() => onCopy(icon, "svg")}>
            Copy SVG <kbd>S</kbd>
          </button>
          <button className="btn btn-solid" onClick={() => onCopy(icon, "tsx")}>
            Copy TSX <kbd>T</kbd>
          </button>
        </div>

        <dl className="props">
          <div>
            <dt>Category</dt>
            <dd>
              {category && (
                <button className="text-link" onClick={() => onCategory(category.id)}>
                  {category.label}
                </button>
              )}
            </dd>
          </div>
          <div>
            <dt>Color</dt>
            <dd>
              <ColorPicker value={opts.color} onChange={(color) => onOptsChange({ ...opts, color })} />
            </dd>
          </div>
          <div>
            <dt>Export size</dt>
            <dd>
              <div className="segmented segmented-sm">
                {EXPORT_SIZES.map((s) => (
                  <button key={s} aria-pressed={opts.size === s} onClick={() => onOptsChange({ ...opts, size: s })}>
                    {s}
                  </button>
                ))}
              </div>
            </dd>
          </div>
          <div>
            <dt>Download</dt>
            <dd className="dl-links">
              <button className="text-link" onClick={() => downloadSvg(icon, opts)}>
                .svg
              </button>
              <button className="text-link" onClick={() => downloadPng(icon, opts)}>
                .png <span className="muted">512px</span>
              </button>
            </dd>
          </div>
        </dl>

        <section className="code">
          <div className="code-head">
            <div className="segmented segmented-sm" role="tablist">
              <button role="tab" aria-selected={tab === "tsx"} aria-pressed={tab === "tsx"} onClick={() => setTab("tsx")}>
                TSX
              </button>
              <button role="tab" aria-selected={tab === "svg"} aria-pressed={tab === "svg"} onClick={() => setTab("svg")}>
                SVG
              </button>
            </div>
            <label className="check">
              <input
                type="checkbox"
                checked={opts.attribution}
                onChange={(e) => onOptsChange({ ...opts, attribution: e.target.checked })}
              />
              <span>Credit comment</span>
            </label>
          </div>
          <pre>
            <code>{code}</code>
          </pre>
        </section>

        <section className="block">
          <h3>Keywords</h3>
          <p className="keywords">
            {icon.w.split(" ").map((w, i) => (
              <span key={w}>
                {i > 0 && <span className="sep">, </span>}
                <button className="text-link" onClick={() => onSearch(w)}>
                  {w}
                </button>
              </span>
            ))}
          </p>
        </section>

        {related.length > 0 && (
          <section className="block">
            <h3>Related</h3>
            <div className="related">
              {related.map((r) => (
                <button key={r.n} onClick={() => onOpen(r)} title={displayName(r)}>
                  <GameIcon icon={r} size={22} />
                  <span className="sr-only">{displayName(r)}</span>
                </button>
              ))}
            </div>
          </section>
        )}

      </div>
    </aside>
  );
}
