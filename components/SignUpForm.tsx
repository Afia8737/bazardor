"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import AuthCard from "./AuthCard";
import SocialButtons from "./SocialButtons";

export default function SignUpForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function fail(msg: string) {
    setError(msg);
    toast.error(msg);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    const confirm = String(form.get("confirm") ?? "");

    if (!name) return fail("আপনার নাম লিখুন");
    if (!email) return fail("ইমেইল দিন");
    if (password.length < 8) return fail("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
    if (password !== confirm) return fail("দুটি পাসওয়ার্ড মিলছে না");

    setLoading(true);
    const { error: err } = await authClient.signUp.email({ name, email, password });
    setLoading(false);

    if (err) {
      return fail(err.message || "অ্যাকাউন্ট তৈরি করা যায়নি। আবার চেষ্টা করুন।");
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এবার সাইন ইন করুন।");
    router.push("/signin");
  }

  return (
    <AuthCard title="অ্যাকাউন্ট তৈরি করুন" subtitle="বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।">
      <form onSubmit={onSubmit} className="space-y-4" noValidate>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">নাম</span>
          <input
            name="name"
            autoComplete="name"
            placeholder="যেমন: রহিম উদ্দিন"
            className="input input-bordered w-full"
          />
        </label>
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
            autoComplete="new-password"
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input input-bordered w-full"
          />
        </label>
        <label className="form-control block">
          <span className="mb-1 block text-sm font-medium">পাসওয়ার্ড নিশ্চিত করুন</span>
          <input
            name="confirm"
            type="password"
            autoComplete="new-password"
            placeholder="আবার লিখুন"
            className="input input-bordered w-full"
          />
        </label>
        {error && (
          <p role="alert" className="text-sm font-medium text-error">
            {error}
          </p>
        )}
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? <span className="loading loading-spinner loading-sm" /> : "সাইন আপ"}
        </button>
      </form>
      <SocialButtons />
      <p className="mt-5 text-center text-sm">
        অ্যাকাউন্ট আছে?{" "}
        <Link href="/signin" className="font-semibold text-primary hover:underline">
          সাইন ইন করুন
        </Link>
      </p>
    </AuthCard>
  );
}
