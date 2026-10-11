export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-8" role="status" aria-label="লোড হচ্ছে…">
      <div className="skeleton h-4 w-48" />
      <div className="skeleton h-40 w-full rounded-2xl" />
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
        <div className="skeleton h-24 rounded-2xl" />
      </div>
      <div className="skeleton h-72 w-full rounded-2xl" />
    </div>
  );
}
