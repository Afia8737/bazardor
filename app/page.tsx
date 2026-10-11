import Image from "next/image";
import ProductGrid from "@/components/ProductGrid";
import Section from "@/components/Section";
import { formatNum } from "@/lib/bn";
import { getProducts } from "@/lib/api";

export default async function HomePage() {
  const products = await getProducts();

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);
  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-green-50 to-base-200">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
          <div className="space-y-4 text-center md:text-left">
            <p className="inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
              {formatNum(products.length)}টি নিত্যদিনের পণ্য
            </p>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mx-auto max-w-prose text-base-content/70 md:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,
              সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <a href="#সব-পণ্য" className="btn btn-primary btn-md sm:btn-lg">
              সব পণ্য দেখুন
            </a>
          </div>
          <div className="flex justify-center md:justify-end">
            <Image
              src="/hero-basket.png"
              alt="সবজি ও ফলের ঝুড়ি"
              width={315}
              height={263}
              priority
              className="h-auto w-64 sm:w-80 lg:w-96"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4">
        <Section
          title="আজ দাম বেড়েছে ▲"
          subtitle="গতকালের তুলনায় সবচেয়ে বেশি বেড়েছে এমন ৬টি পণ্য"
        >
          {risers.length ? (
            <ProductGrid products={risers} />
          ) : (
            <p className="text-base-content/60">আজ কোনো পণ্যের দাম বাড়েনি।</p>
          )}
        </Section>

        <Section
          title="আজ দাম কমেছে ▼"
          subtitle="গতকালের তুলনায় সবচেয়ে বেশি কমেছে এমন ৬টি পণ্য"
        >
          {fallers.length ? (
            <ProductGrid products={fallers} />
          ) : (
            <p className="text-base-content/60">আজ কোনো পণ্যের দাম কমেনি।</p>
          )}
        </Section>

        <Section
          id="সব-পণ্য"
          title="সব পণ্য"
          subtitle={`মোট ${formatNum(products.length)}টি পণ্য দেখানো হচ্ছে`}
        >
          {products.length ? (
            <ProductGrid products={products} />
          ) : (
            <p className="text-base-content/60">
              পণ্যের তথ্য আনা যায়নি। কিছুক্ষণ পরে আবার চেষ্টা করুন।
            </p>
          )}
        </Section>
      </div>
    </>
  );
}
