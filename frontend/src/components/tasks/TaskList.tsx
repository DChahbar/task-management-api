import { Link } from 'react-router-dom'
import type { Task } from '../../types/api'

interface TaskListProps {
  tasks: Task[]
  onDelete: (taskId: number) => void
  deletingId: number | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export function TaskList({ tasks, onDelete, deletingId }: TaskListProps) {
  return (
    <ul className="space-y-3" aria-label="Task list">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h2 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                  {task.title}
                </h2>
                <span
                  className={[
                    'rounded-full px-2 py-0.5 text-xs font-medium',
                    task.completed
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
                  ].join(' ')}
                >
                  {task.completed ? 'Completed' : 'Active'}
                </span>
              </div>
              {task.description && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {task.description}
                </p>
              )}
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                Created {formatDate(task.created_at)}
              </p>
            </div>

            <div className="flex shrink-0 gap-2">
              <Link
                to={`/tasks/${task.id}/edit`}
                className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => onDelete(task.id)}
                disabled={deletingId === task.id}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
              >
                {deletingId === task.id ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
