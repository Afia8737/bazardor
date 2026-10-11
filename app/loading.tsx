import { GridSkeleton } from "@/components/Skeletons";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10">
      <div className="space-y-3">
        <div className="skeleton h-6 w-40 rounded-full" />
        <div className="skeleton h-10 w-3/4 max-w-xl" />
        <div className="skeleton h-4 w-full max-w-lg" />
      </div>
      <GridSkeleton count={8} />
    </div>
  );
}
