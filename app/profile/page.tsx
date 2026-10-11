"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?reason=login&redirect=/profile");
    }
  }, [isPending, session, router]);

  async function signOut() {
    const { error } = await authClient.signOut();
    if (error) return toast.error("সাইন আউট করা যায়নি");
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-md px-4 py-10" role="status" aria-label="লোড হচ্ছে…">
        <div className="skeleton h-72 w-full rounded-2xl" />
      </div>
    );
  }

  const { user } = session;

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
        <p className="mb-6 mt-1 text-sm text-base-content/70">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt={user.name}
            className="mx-auto h-24 w-24 rounded-full object-cover"
            referrerPolicy="no-referrer"
          />
        ) : (
          <span className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-white">
            {user.name?.trim()?.[0] ?? "?"}
          </span>
        )}
        <h2 className="mt-4 text-xl font-semibold">{user.name}</h2>
        <p className="text-base-content/70">{user.email}</p>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/profile/update" className="btn btn-primary">
            তথ্য আপডেট করুন
          </Link>
          <button onClick={signOut} className="btn btn-outline">
            ↩ সাইন আউট
          </button>
        </div>
      </div>
    </div>
  );
}
