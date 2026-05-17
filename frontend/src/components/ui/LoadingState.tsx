interface LoadingStateProps {
  label?: string
}

export function LoadingState({ label = 'Loading…' }: LoadingStateProps) {
  return (
    <div
      className="flex min-h-[12rem] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <p className="text-slate-600 dark:text-slate-400">{label}</p>
    </div>
  )
}
