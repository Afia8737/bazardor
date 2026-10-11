import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="skeleton h-14 w-14 rounded-2xl" />
        <div className="space-y-2">
          <div className="skeleton h-7 w-40" />
          <div className="skeleton h-4 w-56" />
        </div>
      </div>
      <GridSkeleton count={8} />
    </div>
  );
}
