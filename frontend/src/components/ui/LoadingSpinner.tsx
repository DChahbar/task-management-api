interface LoadingSpinnerProps {
  className?: string
  label?: string
}

export function LoadingSpinner({
  className = 'h-4 w-4',
  label = 'Loading',
}: LoadingSpinnerProps) {
  return (
    <span
      role="status"
      aria-label={label}
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    />
  )
}
