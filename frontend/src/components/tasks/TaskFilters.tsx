import { type KeyboardEvent, useRef } from 'react'
import type { TaskFilter } from '../../utils/tasks'

interface TaskFiltersProps {
  filter: TaskFilter
  onFilterChange: (filter: TaskFilter) => void
  counts: { all: number; active: number; completed: number }
  listPanelId?: string
}

const filters: { value: TaskFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
]

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400'

export function TaskFilters({
  filter,
  onFilterChange,
  counts,
  listPanelId = 'task-list-panel',
}: TaskFiltersProps) {
  const tabRefs = useRef<Record<TaskFilter, HTMLButtonElement | null>>({
    all: null,
    active: null,
    completed: null,
  })

  function focusTab(value: TaskFilter) {
    tabRefs.current[value]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let nextIndex: number | null = null

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        nextIndex = (index + 1) % filters.length
        break
      case 'ArrowLeft':
      case 'ArrowUp':
        nextIndex = (index - 1 + filters.length) % filters.length
        break
      case 'Home':
        nextIndex = 0
        break
      case 'End':
        nextIndex = filters.length - 1
        break
      default:
        return
    }

    event.preventDefault()
    const next = filters[nextIndex]
    onFilterChange(next.value)
    focusTab(next.value)
  }

  return (
    <div
      role="tablist"
      aria-label="Filter tasks by status"
      className="flex flex-wrap gap-2"
    >
      {filters.map((item, index) => {
        const isActive = filter === item.value
        const count = counts[item.value]
        const tabId = `filter-tab-${item.value}`

        return (
          <button
            key={item.value}
            ref={(element) => {
              tabRefs.current[item.value] = element
            }}
            id={tabId}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={listPanelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onFilterChange(item.value)}
            onKeyDown={(event) => handleKeyDown(event, index)}
            className={[
              'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
              focusRing,
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
              aria-label={`${count} tasks`}
            >
              <span aria-hidden="true">{count}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}
