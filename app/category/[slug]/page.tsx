import NotFoundView from "@/components/NotFoundView";
import SortableGrid from "@/components/SortableGrid";
import { getCategory, getProducts } from "@/lib/api";
import { formatNum } from "@/lib/bn";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);

  const [category, products] = await Promise.all([getCategory(slug), getProducts(slug)]);

  if (!category || products.length === 0) {
    return (
      <NotFoundView
        title="এই বিভাগে কোনো পণ্য নেই"
        message="বিভাগটি সঠিক নয় অথবা এখানে এখনো কোনো পণ্য যোগ হয়নি।"
      />
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <span
          aria-hidden
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-3xl shadow-sm"
        >
          {category.emoji}
        </span>
        <div>
          <h1 className="text-3xl font-bold">{category.name}</h1>
          <p className="text-base-content/70">
            {formatNum(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <SortableGrid products={products} />
    </div>
  );
}
