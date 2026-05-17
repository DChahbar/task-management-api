import { Skeleton } from '../ui/Skeleton'

export function TaskListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <ul className="space-y-3" aria-hidden aria-label="Loading tasks">
      {Array.from({ length: count }).map((_, index) => (
        <li
          key={index}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex">
            <Skeleton className="w-1 shrink-0 self-stretch rounded-none" />
            <div className="flex flex-1 gap-3 p-4 sm:p-5">
              <Skeleton className="h-5 w-5 shrink-0 rounded" />
              <div className="flex-1 space-y-3">
                <Skeleton className="h-5 w-2/3 max-w-xs" />
                <Skeleton className="h-4 w-full max-w-md" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
