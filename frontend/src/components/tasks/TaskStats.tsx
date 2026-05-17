interface TaskStatsProps {
  total: number
  active: number
  completed: number
}

export function TaskStats({ total, active, completed }: TaskStatsProps) {
  const items = [
    { label: 'Total', value: total, accent: 'text-slate-900 dark:text-slate-50' },
    { label: 'Active', value: active, accent: 'text-blue-600 dark:text-blue-400' },
    {
      label: 'Completed',
      value: completed,
      accent: 'text-green-600 dark:text-green-400',
    },
  ]

  return (
    <div className="grid grid-cols-3 gap-3" aria-label="Task statistics">
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-700 dark:bg-slate-900"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400">
            {item.label}
          </p>
          <p className={`mt-1 text-2xl font-bold ${item.accent}`}>{item.value}</p>
        </div>
      ))}
    </div>
  )
}
