import { Skeleton } from '../ui/Skeleton'

export function TaskStatsSkeleton() {
  return (
    <div
      className="grid grid-cols-3 gap-3"
      aria-hidden
      aria-label="Loading statistics"
    >
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
        >
          <Skeleton className="h-3 w-12" />
          <Skeleton className="mt-2 h-7 w-8" />
        </div>
      ))}
    </div>
  )
}
