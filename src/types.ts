export interface Category {
  id: string;
  label: string;
  /** Name of an icon from the set used as the category's symbol. */
  icon: string;
  count: number;
}

export interface IconData {
  /** Component name, e.g. "GiCrossedSwords". */
  n: string;
  /** Category id. */
  c: string;
  /** Path data on the 24×24 grid. */
  p: string[];
  /** Lowercased words of the name, space separated. */
  w: string;
}

export interface IconLibrary {
  categories: Category[];
  icons: IconData[];
}

export interface ExportOptions {
  /** CSS color or "currentColor". */
  color: string;
  size: number;
  attribution: boolean;
}
