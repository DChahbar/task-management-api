import { inputClassName } from '../ui/inputStyles'

interface TaskSearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function TaskSearchBar({ value, onChange }: TaskSearchBarProps) {
  return (
    <div className="relative">
      <label htmlFor="task-search" className="sr-only">
        Search tasks
      </label>
      <input
        id="task-search"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search by title or description…"
        className={inputClassName}
      />
    </div>
  )
}
