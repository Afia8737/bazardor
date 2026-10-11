// "use client";

// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
// import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) setName(session.user.name);
  }, [session?.user?.name]);

  useEffect(() => {
    if (!isPending && !session) {
      router.replace("/signin?reason=login&redirect=/profile/update");
    }
  }, [isPending, session, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return toast.error("নাম খালি রাখা যাবে না");

    setLoading(true);
    // https://better-auth.com/docs/concepts/users-accounts#update-user
    const { error } = await authClient.updateUser({ name: trimmed });
    setLoading(false);

    if (error) {
      toast.error(error.message || "তথ্য আপডেট করা যায়নি");
      return;
    }
    toast.success("আপনার তথ্য আপডেট হয়েছে");
    router.push("/profile");
    router.refresh();
  }

  if (isPending || !session) {
    return (
      <div className="mx-auto max-w-md px-4 py-10" role="status" aria-label="লোড হচ্ছে…">
        <div className="skeleton h-64 w-full rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10">
      <div className="rounded-2xl border border-base-300 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
        <p className="mb-5 mt-1 text-sm text-base-content/70">আপনার প্রোফাইলের নাম পরিবর্তন করুন।</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="form-control block">
            <span className="mb-1 block text-sm font-medium">নাম</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="input input-bordered w-full"
            />
          </label>
          <button type="submit" disabled={loading} className="btn btn-primary w-full">
            {loading ? <span className="loading loading-spinner loading-sm" /> : "তথ্য আপডেট করুন"}
          </button>
        </form>
      </div>
      <Link href="/profile" className="mt-4 block text-center text-sm text-base-content/70 hover:text-primary">
        ← প্রোফাইলে ফিরে যান
      </Link>
    </div>
  );
}
