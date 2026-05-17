import { Skeleton } from '../ui/Skeleton'

export function TaskFormSkeleton() {
  return (
    <div className="mx-auto max-w-lg space-y-4" aria-hidden aria-label="Loading form">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-10 w-full" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-24 w-full" />
      <div className="flex justify-end gap-3 pt-2">
        <Skeleton className="h-10 w-24" />
        <Skeleton className="h-10 w-28" />
      </div>
    </div>
  )
}
