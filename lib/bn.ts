const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

/** 1850 -> ১৮৫০ */
export const toBn = (v: string | number): string =>
  String(v).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

/** ১,৮৫০ -> 1,850 */
export const fromBn = (s: string): string =>
  s.replace(/[০-৯]/g, (d) => String(BN_DIGITS.indexOf(d)));

/** Parses numbers or strings that may contain Bengali digits, commas, symbols. */
export function parseNum(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const cleaned = fromBn(v).replace(/,/g, "");
  const m = cleaned.match(/\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : null;
}

export const formatNum = (n: number, maxFraction = 2): string =>
  toBn(n.toLocaleString("en-US", { maximumFractionDigits: maxFraction }));

export const formatTaka = (n: number | null | undefined): string =>
  n == null ? "—" : `${formatNum(n)} টাকা`;

export const formatPct = (n: number): string => `${formatNum(Math.abs(n), 1)}%`;
