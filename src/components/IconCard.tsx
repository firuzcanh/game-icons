import { memo } from "react";
import type { IconData } from "../types";
import { displayName } from "../lib/codegen";
import { GameIcon } from "./GameIcon";

interface Props {
  icon: IconData;
  size: number;
  color: string;
  selected: boolean;
  favorite: boolean;
  onOpen: (icon: IconData) => void;
  onCopy: (icon: IconData, format: "svg" | "tsx") => void;
}

export const IconCard = memo(function IconCard({ icon, size, color, selected, favorite, onOpen, onCopy }: Props) {
  const name = displayName(icon);
  return (
    <div className={`cell${selected ? " is-selected" : ""}`}>
      <button className="cell-hit" onClick={() => onOpen(icon)} aria-label={`Inspect ${name}`} aria-pressed={selected}>
        <GameIcon icon={icon} size={size} color={selected ? undefined : color} />
      </button>
      <span className="cell-name">{name}</span>
      {favorite && <span className="cell-fav" aria-label="Favorite" />}
      <div className="cell-actions">
        <button onClick={() => onCopy(icon, "svg")} aria-label={`Copy ${name} as SVG`}>
          SVG
        </button>
        <button onClick={() => onCopy(icon, "tsx")} aria-label={`Copy ${name} as TSX`}>
          TSX
        </button>
      </div>
    </div>
  );
});
