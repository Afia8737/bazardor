"use client";

import { useMemo, useState } from "react";
import { formatNum } from "@/lib/bn";
import { sortProducts, type SortMode } from "@/lib/api";
import type { Product } from "@/lib/types";
import ProductGrid from "./ProductGrid";

const OPTIONS: { value: SortMode; label: string }[] = [
  { value: "default", label: "ডিফল্ট" },
  { value: "asc", label: "দাম: কম থেকে বেশি" },
  { value: "desc", label: "দাম: বেশি থেকে কম" },
];

export default function SortableGrid({ products }: { products: Product[] }) {
  const [mode, setMode] = useState<SortMode>("default");
  // Prices are numbers (Bengali digits are parsed in lib/api), so this sorts by value.
  const sorted = useMemo(() => sortProducts(products, mode), [products, mode]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-base-content/70">
          মোট {formatNum(products.length)}টি পণ্য দেখানো হচ্ছে
        </p>
        <label className="flex items-center gap-2 text-sm font-medium">
          সাজান:
          <span className="relative">
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value as SortMode)}
              className="select select-bordered select-sm appearance-none pr-9 sm:select-md"
              aria-label="সাজান"
            >
              {OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
            <svg
              aria-hidden
              viewBox="0 0 20 20"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-current"
            >
              <path d="M5.5 7.5 10 12l4.5-4.5-1.1-1.1L10 9.8 6.6 6.4z" />
            </svg>
          </span>
        </label>
      </div>
      <ProductGrid products={sorted} />
    </div>
  );
}
