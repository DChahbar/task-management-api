import type { TaskFilter } from '../../utils/tasks'

interface TaskFiltersProps {
  filter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
  counts: { all: number; active: number; completed: number }
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

export function TaskFilters({ filter, onFilterChange, counts }: TaskFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filter tasks"
      className="flex flex-wrap gap-2"
    >
      {filters.map((item) => {
        const isActive = filter === item.value
        const count = counts[item.value]

        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onFilterChange(item.value)}
            className={[
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              isActive
                ? 'bg-blue-600 text-white dark:bg-blue-500'
                : 'border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800',
            ].join(' ')}
          >
            {item.label}
            <span
              className={[
                'ml-1.5 rounded-full px-1.5 py-0.5 text-xs',
                isActive
                  ? 'bg-blue-500 text-white dark:bg-blue-400'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
              ].join(' ')}
            >
              {count}
            </span>
          </button>
        )
      })}
    </div>
  )
}
