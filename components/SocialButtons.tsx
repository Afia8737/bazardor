"use client";

import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9a6 6 0 1 1 0-12c1.9 0 3.1.8 3.8 1.5l2.6-2.5A9.6 9.6 0 0 0 12 2.4a9.6 9.6 0 1 0 0 19.2c5.5 0 9.2-3.9 9.2-9.3 0-.6-.1-1.1-.2-1.6z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.6v-2c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.2c0 .4.2.7.8.6A11.5 11.5 0 0 0 12 .5z" />
    </svg>
  );
}

export default function SocialButtons() {
  async function social(provider: "google" | "github") {
    const { error } = await authClient.signIn.social({ provider, callbackURL: "/" });
    if (error) {
      toast.error(
        `${provider === "google" ? "Google" : "GitHub"} দিয়ে সাইন ইন করা যায়নি। পরে আবার চেষ্টা করুন।`,
      );
    }
  }

  return (
    <div className="space-y-3">
      <div className="divider my-2 text-sm text-base-content/60">অথবা</div>
      <button type="button" onClick={() => social("google")} className="btn btn-outline w-full gap-2">
        <GoogleIcon /> Google দিয়ে চালিয়ে যান
      </button>
      <button type="button" onClick={() => social("github")} className="btn btn-outline w-full gap-2">
        <GitHubIcon /> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
