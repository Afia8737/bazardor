import { formatNum } from "@/lib/bn";
import type { Product } from "@/lib/types";

function Item({ p }: { p: Product }) {
  const up = p.change > 0;
  const down = p.change < 0;
  return (
    <span className="flex items-center gap-2 whitespace-nowrap px-5 text-sm">
      <span aria-hidden>{p.emoji}</span>
      <span className="font-medium">{p.name}</span>
      <span className="text-white/80">
        {formatNum(p.price)} টাকা/{p.unitShort}
      </span>
      <span
        className={
          up ? "font-semibold text-green-300" : down ? "font-semibold text-red-300" : "text-white/60"
        }
      >
        {up ? "▲" : down ? "▼" : "—"} {formatNum(Math.abs(p.change), 1)}%
      </span>
    </span>
  );
}

export default function Ticker({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div
      className="ticker overflow-hidden bg-secondary py-2 text-white"
      aria-label="আজকের দামের তালিকা"
    >
      <div className="ticker-track">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex" aria-hidden={dup === 1}>
            {products.map((p) => (
              <Item key={`${dup}-${p.slug}`} p={p} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
