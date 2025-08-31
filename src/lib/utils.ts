import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function parseEventDate(value?: string): number {
  if (!value) return NaN;
  const onlyDate = /^(\d{4}-\d{2}-\d{2})$/;
  if (onlyDate.test(value)) {
    const [y, m, d] = value.split("-").map(Number);
    return new Date(y, m - 1, d).getTime();
  }
  const t = Date.parse(value);
  return Number.isNaN(t) ? NaN : t;
}

/**
 * Ordena por proximidade de hoje:
 * - Primeiro FUTUROS (>= hoje), do mais próximo pro mais distante
 * - Depois PASSADOS (< hoje), do mais recente pro mais antigo
 */
export function sortByDateProximity<T extends { data?: string }>(
  arr: T[],
  now = new Date()
): T[] {
  const base = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime(); // hoje 00:00
  return [...arr].sort((a, b) => {
    const ta = parseEventDate(a.data);
    const tb = parseEventDate(b.data);
    if (Number.isNaN(ta) && Number.isNaN(tb)) return 0;
    if (Number.isNaN(ta)) return 1;
    if (Number.isNaN(tb)) return -1;

    const da = ta - base;
    const db = tb - base;

    const aFuture = da >= 0;
    const bFuture = db >= 0;

    if (aFuture && !bFuture) return -1;
    if (!aFuture && bFuture) return 1;

    if (aFuture && bFuture) return da - db;

    return tb - ta;
  });
}
