"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthCard from "./AuthCard";
import SocialButtons from "./SocialButtons";

// export default function SignInForm() {
//   const router = useRouter();
//   const params = useSearchParams();
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const toasted = useRef(false);

  // Toast when a protected route sent the user here
  useEffect(() => {
    if (params.get("reason") === "login" && !toasted.current) {
      toasted.current = true;
      toast.error("এই পাতাটি দেখতে আগে সাইন ইন করুন");
    }
  }, [params]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      const msg = "ইমেইল ও পাসওয়ার্ড দিন";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    const { error: err } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (err) {
      const msg = "ইমেইল বা পাসওয়ার্ড সঠিক নয়";
      setError(msg);
      toast.error(msg);
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    const redirectTo = params.get("redirect");
    router.push(redirectTo && redirectTo.startsWith("/") ? redirectTo : "/");
    router.refresh();
  }

  return (
    <AuthCard
      title="সাইন ইন"
      subtitle="বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।"
    >
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">ইমেইল</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড</span>
          <input
            name="password"
            type="password"
            autoComplete="current-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন ইন"}
        </button>
      </form>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট নেই?{" "}
        <Link href="/signup" className="font-semibold text-primary hover:underline">
          সাইন আপ করুন
        </Link>
      </p>
    </AuthCard>
  );
}
