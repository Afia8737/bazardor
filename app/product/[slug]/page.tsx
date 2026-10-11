import { headers } from "next/headers";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import ChangeBadge from "@/components/ChangeBadge";
import { getProduct } from "@/lib/api";
import { auth } from "@/lib/auth";
import { formatNum, formatTaka } from "@/lib/bn";

function Stat({
  label,
  value,
  note,
  tone,
}: {
  label: string;
  value: string;
  note?: string;
  tone: string;
}) {
  return (
    <div className="rounded-2xl border border-base-300 bg-white p-4">
      <p className="text-sm text-base-content/60">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${tone}`}>{value}</p>
      {note && <p className="mt-1 text-sm text-base-content/60">{note}</p>}
    </div>
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  // Protected route: requires a session
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    redirect(`/signin?reason=login&redirect=${encodeURIComponent(`/product/${slug}`)}`);
  }

  const product = await getProduct(slug);
  if (!product) notFound();

  const diff =
    product.price && product.avg ? Math.round((product.price - product.avg) * 100) / 100 : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav aria-label="breadcrumb" className="mb-4 text-sm text-base-content/60">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="hover:text-primary">হোম</Link></li>
          <li aria-hidden>›</li>
          {product.category && (
            <>
              <li>
                <Link href={`/category/${encodeURIComponent(product.category)}`} className="hover:text-primary">
                  {product.categoryLabel || "বিভাগ"}
                </Link>
              </li>
              <li aria-hidden>›</li>
            </>
          )}
          <li className="font-medium text-base-content">{product.name}</li>
        </ol>
      </nav>

      {/* Summary */}
      <section className="rounded-2xl border border-base-300 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-start gap-4">
            <span
              aria-hidden
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl sm:h-20 sm:w-20 sm:text-5xl"
            >
              {product.emoji}
            </span>
            <div className="space-y-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-base-content/70">
                {product.description ||
                  `${product.unit} আজকের বাজারদর ও বাজারভিত্তিক তুলনা`}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                {[product.categoryLabel]
                  .filter(Boolean)
                  .filter((t, i, a) => a.indexOf(t) === i)
                  .map((t) => (
                    <span key={t} className="badge badge-outline badge-primary">
                      {t}
                    </span>
                  ))}
                <span className="badge badge-ghost">{product.unit}</span>
              </div>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-sm text-base-content/60">আজকের দাম</p>
            <p className="text-3xl font-bold text-primary">
              {formatNum(product.price)}{" "}
              <span className="text-base font-medium text-base-content/70">
                টাকা / {product.unitShort}
              </span>
            </p>
            <div className="mt-1 flex items-center gap-2 sm:justify-end">
              <ChangeBadge change={product.change} />
              {diff !== null && diff !== 0 && (
                <span className="text-sm text-base-content/60">
                  গড় থেকে {formatNum(Math.abs(diff))} টাকা {diff > 0 ? "বেশি" : "কম"}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Price summary */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Stat
            label="সর্বনিম্ন দাম"
            value={formatTaka(product.min)}
            note={product.minMarket ? `সবচেয়ে কম দামের বাজার: ${product.minMarket}` : undefined}
            tone="text-green-700"
          />
          <Stat
            label="সর্বাধিক দাম"
            value={formatTaka(product.max)}
            note={product.maxMarket ? `সবচেয়ে বেশি দামের বাজার: ${product.maxMarket}` : undefined}
            tone="text-red-600"
          />
          <Stat
            label="গড় দাম"
            value={formatTaka(product.avg)}
            note={`${product.unit}-এর হিসাবে`}
            tone="text-base-content"
          />
        </div>
      </section>

      {/* Price history */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">দামের পরিবর্তন</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "আজ", value: product.price },
            { label: "গতকাল", value: product.yesterday },
            { label: "গত সপ্তাহ", value: product.lastWeek },
            { label: "গত মাস", value: product.lastMonth },
          ].map((h) => (
            <div key={h.label} className="rounded-2xl border border-base-300 bg-white p-4">
              <p className="text-sm text-base-content/60">{h.label}</p>
              <p className="mt-1 text-xl font-bold">{formatTaka(h.value)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Market table */}
      <section className="mt-8">
        <h2 className="mb-3 text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>
        {product.markets.length ? (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-white">
            <table className="table">
              <thead>
                <tr className="text-base-content/70">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={`${m.name}-${i}`} className="hover:bg-base-200/60">
                    <td className="font-medium">{m.name}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatTaka(m.min)}</td>
                    <td className="text-right">{formatTaka(m.max)}</td>
                    <td className="text-right font-semibold">{formatTaka(m.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-2xl border border-dashed border-base-300 bg-white p-6 text-base-content/60">
            এই পণ্যের বাজারভিত্তিক তথ্য এখনো পাওয়া যায়নি।
          </p>
        )}
      </section>
    </div>
  );
}
