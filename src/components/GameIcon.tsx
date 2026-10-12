import { memo } from "react";
import type { IconData } from "../types";

interface Props {
  icon: IconData;
  size?: number | string;
  color?: string;
  className?: string;
}

export const GameIcon = memo(function GameIcon({ icon, size = 24, color = "currentColor", className }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={color}
      className={className}
      aria-hidden="true"
    >
      {icon.p.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
});
