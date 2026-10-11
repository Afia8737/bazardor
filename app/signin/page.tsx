import { Suspense } from "react";
import SignInForm from "@/components/SignInForm";

export const metadata = { title: "সাইন ইন — বাজার দর" };

export default function SignInPage() {
  return (
    <Suspense fallback={<div className="skeleton mx-auto my-10 h-96 max-w-md rounded-2xl" />}>
      <SignInForm />
    </Suspense>
  );
}
