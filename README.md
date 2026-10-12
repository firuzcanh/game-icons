# Game Icons Library

A searchable React browser for the 4,038 icons of
[The Ultimate Games Icons Library](https://www.figma.com/community/file/1266365661823917037/the-ultimate-games-icons-library)
(24×24 grid). Every icon can be copied as **SVG** or as a ready-to-paste **React TSX component**,
or downloaded as SVG / PNG.

## Features

- Instant search over names, words and category labels (`/` or `⌘K`)
- 27 numbered categories (Weapons, Armor & Shields, Magic & Alchemy, Monsters & Undead, …)
- Hover any cell for one-click **SVG** / **TSX** copy
- Inspector: preview with a 24×24 pixel-grid overlay, size ramp, color, export size,
  live code, keywords and related icons
- Keyboard: `←` `→` step through icons, `S` copy SVG, `T` copy TSX, `F` favorite, `Esc` close
- Favorites (saved in the browser), random icon, light / dark theme (follows the system by default)
- Optional credit comment embedded in copied code

## Run it

```bash
npm install
npm run dev
```

## Data pipeline

`npm run icons` regenerates `src/data/icons.json`:

- `scripts/figma-names.txt` — the 4,038 component names read from the Figma file (`Icons` frame).
- Vector data comes from the same game-icons.net set (via the `react-icons` package) and is scaled
  from the 512 grid to 24×24, which matches Figma's own SVG export exactly. The Figma API is not
  used at build time because its MCP export is limited to ~20 KB per call.
- `scripts/categories.mjs` assigns each icon to a category: strong keywords first, then the head
  noun of the name (last word), plus a list of hand-picked overrides.

## License & attribution

The icons are **not** covered by this project's code and keep their own licenses:

- Icons by **Lorc, Delapouite and contributors** of [game-icons.net](https://game-icons.net),
  licensed under [CC BY 3.0](https://creativecommons.org/licenses/by/3.0/).
- Adapted to a 24×24 grid in
  [The Ultimate Games Icons Library](https://www.figma.com/community/file/1266365661823917037/the-ultimate-games-icons-library)
  by **Nimesh (@sup_nim)**, licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
- Changes made here: icons were categorized, tagged, and made exportable as SVG / TSX / PNG.
  The artwork itself is unchanged.

When you use an icon, credit it, for example:

> Icons by game-icons.net (CC BY 3.0), via “The Ultimate Games Icons Library” by Nimesh (CC BY 4.0).

See [ATTRIBUTION.md](ATTRIBUTION.md).
