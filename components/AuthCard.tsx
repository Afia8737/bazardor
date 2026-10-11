import Link from "next/link";

export default function AuthCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col gap-4 px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="mb-5 mt-1 text-sm text-base-content/70">{subtitle}</p>
        {children}
      </div>
      <Link href="/" className="text-center text-sm text-base-content/70 hover:text-primary">
        ← হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
