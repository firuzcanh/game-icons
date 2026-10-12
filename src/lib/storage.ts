import { useCallback, useEffect, useState } from "react";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

/** useState that survives reloads. Storage failures are ignored (private mode etc). */
export function usePersistentState<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(() => read(key, fallback));
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  }, [key, value]);
  return [value, setValue] as const;
}

export function useFavorites() {
  const [list, setList] = usePersistentState<string[]>("gi:favorites", []);
  const toggle = useCallback(
    (name: string) => setList((l) => (l.includes(name) ? l.filter((n) => n !== name) : [name, ...l])),
    [setList],
  );
  return { favorites: list, isFavorite: (name: string) => list.includes(name), toggle };
}
