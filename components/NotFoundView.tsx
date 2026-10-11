import Link from "next/link";

export default function NotFoundView({
  title = "পাতাটি খুঁজে পাওয়া যায়নি",
  message = "আপনি যে ঠিকানাটি খুঁজছেন সেটি নেই বা সরিয়ে ফেলা হয়েছে।",
}: {
  title?: string;
  message?: string;
}) {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 py-20 text-center">
      <div className="text-7xl font-bold text-primary">৪০৪</div>
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-base-content/70">{message}</p>
      <Link href="/" className="btn btn-primary">
        হোম পেজে ফিরে যান
      </Link>
    </div>
  );
}
