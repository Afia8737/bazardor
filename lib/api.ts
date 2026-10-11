import type { Category, Market, Product } from "./types";

/**
 * Data layer for https://openapi.programming-hero.com/api/bazardor
 *
 * GET /products            -> Product[]
 * GET /products?slug=...   -> Product[] (filtered)
 * GET /products?category=  -> Product[] (filtered)
 * GET /categories          -> Category[]
 * GET /categories/:slug    -> Category
 */

const BASES = [
  process.env.NEXT_PUBLIC_API_BASE_1 ?? "https://openapi.programming-hero.com/api/bazardor",
  process.env.NEXT_PUBLIC_API_BASE_2,
].filter((b): b is string => Boolean(b));

/* eslint-disable @typescript-eslint/no-explicit-any */
type Raw = Record<string, any>;

async function getJSON(path: string): Promise<any> {
  for (const base of BASES) {
    try {
      const res = await fetch(base + path, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
      if (res.status === 404) return null;
    } catch {
      // try the next base URL
    }
  }
  return null;
}

const UNITS: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
  pcs: "পিস",
};

function toProduct(p: Raw): Product {
  const unitShort = UNITS[String(p.unit ?? "").toLowerCase()] ?? String(p.unit ?? "কেজি");

  const markets: Market[] = Array.isArray(p.markets)
    ? p.markets.map((m: Raw) => {
        const min = Number(m.min) || 0;
        const max = Number(m.max) || 0;
        return {
          name: String(m.market ?? "—"),
          division: String(m.division ?? "—"),
          min,
          max,
          avg: Math.round(((min + max) / 2) * 100) / 100,
        };
      })
    : [];

  const price = Number(p.today) || 0;

  // change: { dir: "up" | "down" | "flat", pct: number }
  let change = Number(p.change?.pct) || 0;
  if (p.change?.dir === "flat") change = 0;
  else if (p.change?.dir === "down") change = -Math.abs(change);
  else if (p.change?.dir === "up") change = Math.abs(change);

  const min = markets.length ? Math.min(...markets.map((m) => m.min)) : price || null;
  const max = markets.length ? Math.max(...markets.map((m) => m.max)) : price || null;
  const avg = markets.length
    ? Math.round((markets.reduce((s, m) => s + m.avg, 0) / markets.length) * 100) / 100
    : price || null;

  return {
    id: String(p.id),
    slug: String(p.slug ?? p.id),
    name: String(p.nameBn ?? "পণ্য"),
    emoji: String(p.image ?? p.categoryIcon ?? "🛒"),
    unit: `প্রতি ${unitShort}`,
    unitShort,
    price,
    yesterday: Number(p.yesterday) || 0,
    lastWeek: Number(p.lastWeek) || 0,
    lastMonth: Number(p.lastMonth) || 0,
    change,
    category: String(p.category ?? ""),
    categoryLabel: String(p.categoryNameBn ?? ""),
    categoryIcon: String(p.categoryIcon ?? ""),
    description: markets.length
      ? `${unitShort} হিসাবে আজকের বাজারদর — ${markets.length}টি বাজারের তথ্য অনুযায়ী`
      : `${unitShort} হিসাবে আজকের বাজারদর`,
    markets,
    min,
    max,
    avg,
    minMarket: markets.length ? markets.reduce((a, b) => (b.min < a.min ? b : a)).name : "",
    maxMarket: markets.length ? markets.reduce((a, b) => (b.max > a.max ? b : a)).name : "",
  };
}

function toCategory(c: Raw): Category {
  return {
    slug: String(c.slug ?? c.id),
    name: String(c.nameBn ?? "বিভাগ"),
    emoji: String(c.icon ?? "🛒"),
  };
}

export async function getProducts(category?: string): Promise<Product[]> {
  const q = category ? `?category=${encodeURIComponent(category)}` : "";
  const json = await getJSON(`/products${q}`);
  return Array.isArray(json) ? json.map(toProduct) : [];
}

export async function getProduct(slug: string): Promise<Product | null> {
  const json = await getJSON(`/products?slug=${encodeURIComponent(slug)}`);
  const hit = Array.isArray(json) ? json.find((p: Raw) => p.slug === slug) : null;
  if (hit) return toProduct(hit);

  // Fallback: numeric id (e.g. /product/1) or filter not supported
  const byId = /^\d+$/.test(slug) ? await getJSON(`/products/${slug}`) : null;
  if (byId && !Array.isArray(byId) && byId.nameBn) return toProduct(byId);

  const all = await getProducts();
  return all.find((p) => p.slug === slug || p.id === slug) ?? null;
}

export async function getCategories(): Promise<Category[]> {
  const json = await getJSON("/categories");
  return Array.isArray(json) ? json.map(toCategory) : [];
}

export async function getCategory(slug: string): Promise<Category | null> {
  const json = await getJSON(`/categories/${encodeURIComponent(slug)}`);
  if (!json || Array.isArray(json) || !json.nameBn) return null;
  return toCategory(json);
}

export type SortMode = "default" | "asc" | "desc";

/** Prices are real numbers here, so sorting is numeric (never string-based). */
export function sortProducts(list: Product[], mode: SortMode): Product[] {
  if (mode === "default") return list;
  const copy = [...list];
  copy.sort((a, b) => (mode === "asc" ? a.price - b.price : b.price - a.price));
  return copy;
}
