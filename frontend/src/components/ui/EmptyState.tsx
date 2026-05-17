import type { ReactNode } from 'react'

interface EmptyStateProps {
  title: string
  description: string
  action?: ReactNode
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div
      className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center sm:p-12 dark:border-slate-700 dark:bg-slate-900"
      role="status"
    >
      <p className="text-lg font-medium text-slate-900 dark:text-slate-50">{title}</p>
      <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
