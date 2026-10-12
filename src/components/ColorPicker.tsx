export const SWATCHES = [
  { value: "currentColor", label: "Inherit (currentColor)" },
  { value: "#111110", label: "Ink" },
  { value: "#e5484d", label: "Red" },
  { value: "#f76b15", label: "Orange" },
  { value: "#30a46c", label: "Green" },
  { value: "#0090ff", label: "Blue" },
  { value: "#8e4ec6", label: "Violet" },
];

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ value, onChange }: Props) {
  const custom = !SWATCHES.some((s) => s.value === value);
  return (
    <div className="swatches" role="radiogroup" aria-label="Icon color">
      {SWATCHES.map((s) => (
        <button
          key={s.value}
          role="radio"
          aria-checked={value === s.value}
          className={`swatch${s.value === "currentColor" ? " swatch-inherit" : ""}`}
          style={s.value === "currentColor" ? undefined : { background: s.value }}
          onClick={() => onChange(s.value)}
          title={s.label}
        >
          <span className="sr-only">{s.label}</span>
        </button>
      ))}
      <label
        className="swatch swatch-custom"
        aria-checked={custom}
        title="Custom color"
        style={custom ? { background: value } : undefined}
      >
        <input type="color" value={custom ? value : "#f76b15"} onChange={(e) => onChange(e.target.value)} />
        <span className="sr-only">Custom color</span>
      </label>
    </div>
  );
}
