import type { Task } from '../types/api'

export type TaskFilter = 'all' | 'active' | 'completed'

export function filterTasks(
  tasks: Task[],
  filter: TaskFilter,
  searchQuery: string,
): Task[] {
  let result = tasks

  if (filter === 'active') {
    result = result.filter((task) => !task.completed)
  } else if (filter === 'completed') {
    result = result.filter((task) => task.completed)
  }

  const query = searchQuery.trim().toLowerCase()
  if (query) {
    result = result.filter(
      (task) =>
        task.title.toLowerCase().includes(query) ||
        task.description?.toLowerCase().includes(query),
    )
  }

  return result
}

export function countTasksByStatus(tasks: Task[]) {
  const completed = tasks.filter((task) => task.completed).length
  return {
    total: tasks.length,
    active: tasks.length - completed,
    completed,
  }
}

export function formatTaskDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function formatRelativeDate(iso: string) {
  const date = new Date(iso)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Yesterday'
  if (diffDays < 7) return `${diffDays} days ago`
  return formatTaskDate(iso)
}
