import { LoadingSpinner } from './LoadingSpinner'

interface ErrorStateProps {
  title?: string
  message: string
  onRetry?: () => void
  isRetrying?: boolean
}

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  isRetrying = false,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-center dark:border-red-900 dark:bg-red-950/30"
    >
      <p className="text-lg font-medium text-red-900 dark:text-red-100">{title}</p>
      <p className="mt-2 text-sm text-red-800 dark:text-red-200">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          disabled={isRetrying}
          className="mt-4 inline-flex items-center justify-center gap-2 rounded-lg border border-red-300 bg-white px-4 py-2 text-sm font-medium text-red-800 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-800 dark:bg-red-950 dark:text-red-100 dark:hover:bg-red-900"
        >
          {isRetrying && <LoadingSpinner className="h-4 w-4" label="Retrying" />}
          {isRetrying ? 'Retrying...' : 'Try again'}
        </button>
      )}
    </div>
  )
}
