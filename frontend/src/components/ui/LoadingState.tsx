import { LoadingSpinner } from './LoadingSpinner'

interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <div
      className="flex min-h-[12rem] flex-col items-center justify-center gap-3"
      role="status"
      aria-live="polite"
    >
      <LoadingSpinner className="h-8 w-8 text-blue-600 dark:text-blue-400" label={label} />
      <p className="text-sm text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  )
}
