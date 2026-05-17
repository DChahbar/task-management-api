type AlertVariant = 'error' | 'info' | 'success'

interface AlertProps {
  variant?: AlertVariant
  title?: string
  message: string
  onDismiss?: () => void
}

const variantStyles: Record<AlertVariant, string> = {
  error:
    'border-red-200 bg-red-50 text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-200',
  info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200',
  success:
    'border-green-200 bg-green-50 text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-200',
}

export function Alert({
  variant = 'error',
  title,
  message,
  onDismiss,
}: AlertProps) {
  return (
    <div
      role="alert"
      className={`flex gap-3 rounded-lg border px-3 py-2 text-sm ${variantStyles[variant]}`}
    >
      <div className="min-w-0 flex-1">
        {title && <p className="mb-0.5 font-medium">{title}</p>}
        <p>{message}</p>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="shrink-0 rounded px-1 text-sm font-medium opacity-70 hover:opacity-100"
          aria-label="Dismiss message"
        >
          ×
        </button>
      )}
    </div>
  )
}

