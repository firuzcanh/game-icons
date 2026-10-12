import type { ExportOptions, IconData } from "../types";

export const CREDIT_LINE =
  "game-icons.net (CC BY 3.0) via “The Ultimate Games Icons Library” by Nimesh (CC BY 4.0)";

/** "GiCrossedSwords" -> "Crossed Swords" */
export function displayName(icon: IconData): string {
  return icon.w.replace(/\b\w/g, (c) => c.toUpperCase()).replace(/\b3d\b/g, "3D");
}

/** "GiCrossedSwords" -> "crossed-swords" */
export function fileName(icon: IconData): string {
  return icon.w.replace(/\s+/g, "-");
}

export function toSvg(icon: IconData, opts: ExportOptions): string {
  const paths = icon.p.map((d) => `  <path d="${d}"/>`).join("\n");
  const comment = opts.attribution ? `<!-- ${displayName(icon)} · ${CREDIT_LINE} -->\n` : "";
  return (
    comment +
    `<svg xmlns="http://www.w3.org/2000/svg" width="${opts.size}" height="${opts.size}" viewBox="0 0 24 24" fill="${opts.color}">\n` +
    `${paths}\n</svg>`
  );
}

export function toTsx(icon: IconData, opts: ExportOptions): string {
  const paths = icon.p.map((d) => `      <path d="${d}" />`).join("\n");
  const comment = opts.attribution ? `// ${displayName(icon)} · ${CREDIT_LINE}\n` : "";
  return `${comment}import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number | string };

export function ${icon.n}({ size = ${opts.size}, ...props }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="${opts.color}"
      {...props}
    >
${paths}
    </svg>
  );
}
`;
}

export async function copyText(text: string): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // Clipboard API is unavailable on insecure origins; fall back to a hidden textarea.
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
  }
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadSvg(icon: IconData, opts: ExportOptions) {
  downloadBlob(new Blob([toSvg(icon, opts)], { type: "image/svg+xml" }), `${fileName(icon)}.svg`);
}

export async function downloadPng(icon: IconData, opts: ExportOptions, px = 512) {
  // currentColor has no meaning outside a document, so rasterize it as the page's text color.
  const color = opts.color === "currentColor" ? getComputedStyle(document.body).color : opts.color;
  const svg = toSvg(icon, { ...opts, color, size: px, attribution: false });
  const img = new Image();
  img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await img.decode();
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = px;
  canvas.getContext("2d")!.drawImage(img, 0, 0, px, px);
  const blob = await new Promise<Blob | null>((r) => canvas.toBlob(r, "image/png"));
  if (blob) downloadBlob(blob, `${fileName(icon)}.png`);
}
