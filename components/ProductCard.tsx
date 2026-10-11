import Link from "next/link";
import { formatTaka } from "@/lib/bn";
import type { Product } from "@/lib/types";
import ChangeBadge from "./ChangeBadge";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.slug)}`}
      className="group flex flex-col gap-3 rounded-2xl border border-base-300 bg-white p-4 shadow-sm transition hover:border-primary hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <div className="flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-base-200 text-3xl"
        >
          {product.emoji}
        </span>
        <div className="min-w-0">
          <h3 className="truncate text-lg font-semibold leading-tight">{product.name}</h3>
          <p className="text-sm text-base-content/60">{product.unit}</p>
        </div>
      </div>
      <div className="flex items-end justify-between border-t border-base-300 pt-3">
        <div>
          <p className="text-xs text-base-content/60">আজকের দাম</p>
          <p className="text-xl font-bold text-primary">{formatTaka(product.price)}</p>
        </div>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
