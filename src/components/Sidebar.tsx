import type { Category } from "../types";

interface Props {
  categories: Category[];
  counts: Map<string, number>;
  total: number;
  favoritesCount: number;
  active: string;
  onSelect: (id: string) => void;
}

export function Sidebar({ categories, counts, total, favoritesCount, active, onSelect }: Props) {
  const item = (id: string, label: string, count: number, index?: number) => (
    <li key={id}>
      <button
        className={`index-item${active === id ? " is-active" : ""}${count === 0 ? " is-empty" : ""}`}
        onClick={() => onSelect(id)}
        aria-current={active === id ? "true" : undefined}
      >
        <span className="index-num">{index === undefined ? "—" : String(index).padStart(2, "0")}</span>
        <span className="index-label">{label}</span>
        <span className="index-count">{count.toLocaleString()}</span>
      </button>
    </li>
  );

  return (
    <nav className="index" aria-label="Categories">
      <ul>
        {item("all", "All icons", total)}
        {item("favorites", "Favorites", favoritesCount)}
      </ul>
      <div className="index-heading">Categories</div>
      <ul>{categories.map((c, i) => item(c.id, c.label, counts.get(c.id) ?? 0, i + 1))}</ul>
    </nav>
  );
}
