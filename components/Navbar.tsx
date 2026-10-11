"use client";

// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";
// import type { Category } from "@/lib/types";
// import BanglaDate from "./BanglaDate";

export default function Navbar({ categories }: { categories: Category[] }) {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    const { error } = await authClient.signOut();
    if (error) {
      toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
      return;
    }
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  const initial = session?.user?.name?.trim()?.[0] ?? "?";

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-white/95 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex items-center gap-2" aria-label="বাজার দর হোম">
            <span className="text-3xl" aria-hidden>🛒</span>
            <span className="leading-tight">
              <span className="block text-xl font-bold text-primary">বাজার দর</span>
              <BanglaDate />
            </span>
          </Link>

          <div className="flex items-center gap-2">
            {isPending ? (
              <div className="skeleton h-9 w-24 rounded-full" />
            ) : session ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-full border border-base-300 py-1 pl-1 pr-3 text-sm font-medium hover:border-primary"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {initial}
                  </span>
                  <span className="hidden max-w-28 truncate sm:inline">{session.user.name}</span>
                </Link>
                <button onClick={handleSignOut} className="btn btn-outline btn-primary btn-sm sm:btn-md">
                  সাইন আউট
                </button>
              </>
            ) : (
              <>
                <Link href="/signin" className="btn btn-ghost btn-sm sm:btn-md">
                  সাইন ইন
                </Link>
                <Link href="/signup" className="btn btn-primary btn-sm sm:btn-md">
                  সাইন আপ
                </Link>
              </>
            )}
          </div>
        </div>

        {categories.length > 0 && (
          <nav aria-label="পণ্যের বিভাগ" className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-3">
            <ul className="flex w-max gap-2 md:w-auto md:flex-wrap">
              {categories.map((c) => {
                const href = `/category/${encodeURIComponent(c.slug)}`;
                const active = pathname === href || pathname === `/category/${c.slug}`;
                return (
                  <li key={c.slug}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm font-medium transition ${
                        active
                          ? "border-primary bg-primary text-white"
                          : "border-base-300 bg-white hover:border-primary hover:text-primary"
                      }`}
                    >
                      <span aria-hidden>{c.emoji !== "🛒" ? c.emoji : ""}</span>
                      {c.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
