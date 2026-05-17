import { Link } from 'react-router-dom'
import type { Task } from '../../types/api'
import { formatRelativeDate, formatTaskDate } from '../../utils/tasks'

interface TaskCardProps {
  task: Task
  onDelete: (taskId: number) => void
  isDeleting: boolean
}

export function TaskCard({ task, onDelete, isDeleting }: TaskCardProps) {
  const showUpdated =
    new Date(task.updated_at).getTime() !==
    new Date(task.created_at).getTime()

  return (
    <li
      className={[
        'overflow-hidden rounded-xl border bg-white dark:bg-slate-900',
        task.completed
          ? 'border-slate-200 opacity-90 dark:border-slate-700'
          : 'border-slate-200 dark:border-slate-700',
      ].join(' ')}
    >
      <div className="flex">
        <div
          className={[
            'w-1 shrink-0',
            task.completed ? 'bg-green-500' : 'bg-blue-500',
          ].join(' ')}
          aria-hidden
        />
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <h2
                  className={[
                    'text-base font-semibold text-slate-900 dark:text-slate-50',
                    task.completed ? 'line-through opacity-70' : '',
                  ].join(' ')}
                >
                  {task.title}
                </h2>
                <span
                  className={[
                    'inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium',
                    task.completed
                      ? 'bg-green-100 text-green-800 dark:bg-green-950 dark:text-green-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'h-1.5 w-1.5 rounded-full',
                      task.completed ? 'bg-green-600' : 'bg-blue-600',
                    ].join(' ')}
                    aria-hidden
                  />
                  {task.completed ? 'Completed' : 'Active'}
                </span>
              </div>

              {task.description && (
                <p
                  className={[
                    'text-sm text-slate-600 dark:text-slate-400',
                    task.completed ? 'line-through opacity-70' : '',
                  ].join(' ')}
                >
                  {task.description}
                </p>
              )}

              <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 dark:text-slate-500">
                <div>
                  <dt className="sr-only">Created</dt>
                  <dd>
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      Created:
                    </span>{' '}
                    {formatTaskDate(task.created_at)}
                    <span className="text-slate-400">
                      {' '}
                      ({formatRelativeDate(task.created_at)})
                    </span>
                  </dd>
                </div>
                {showUpdated && (
                  <div>
                    <dt className="sr-only">Last updated</dt>
                    <dd>
                      <span className="font-medium text-slate-600 dark:text-slate-400">
                        Updated:
                      </span>{' '}
                      {formatRelativeDate(task.updated_at)}
                    </dd>
                  </div>
                )}
              </dl>
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
                disabled={isDeleting}
                aria-label={`Delete task ${task.title}`}
                className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </li>
  )
}
