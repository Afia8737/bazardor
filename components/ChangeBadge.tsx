import { formatPct } from "@/lib/bn";

export default function ChangeBadge({ change }: { change: number }) {
  if (change > 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-700">
        ▲ {formatPct(change)}
      </span>
    );
  }
  if (change < 0) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-sm font-semibold text-red-600">
        ▼ {formatPct(change)}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-semibold text-gray-500">
      — {formatPct(0)}
    </span>
  );
}
