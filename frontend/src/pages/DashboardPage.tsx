import { useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteTask } from '../api/tasks'
import { TaskList } from '../components/tasks/TaskList'
import { FormAlert } from '../components/ui/FormAlert'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeading } from '../components/ui/PageHeading'
import { useTasks } from '../hooks/useTasks'
import { getApiErrorMessage } from '../utils/errors'

export function DashboardPage() {
  const { tasks, isLoading, error, refetch } = useTasks()
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleDelete(taskId: number) {
    if (!window.confirm('Delete this task? This cannot be undone.')) {
      return
    }

    setActionError(null)
    setDeletingId(taskId)

    try {
      await deleteTask(taskId)
      await refetch()
    } catch (err) {
      setActionError(getApiErrorMessage(err, 'Failed to delete task.'))
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeading
          title="Dashboard"
          description="View and manage your tasks."
        />
        <Link
          to="/tasks/new"
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white no-underline hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          New task
        </Link>
      </div>

      {actionError && (
        <div className="mb-4">
          <FormAlert message={actionError} />
        </div>
      )}

      {error && (
        <div className="mb-6 space-y-3">
          <FormAlert message={error} />
          <button
            type="button"
            onClick={() => void refetch()}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Try again
          </button>
        </div>
      )}

      {isLoading && <LoadingState label="Loading tasks…" />}

      {!isLoading && !error && tasks.length === 0 && (
        <div
          className="rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center dark:border-slate-700 dark:bg-slate-900"
          role="status"
        >
          <p className="text-lg font-medium text-slate-900 dark:text-slate-50">
            No tasks yet
          </p>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Create your first task to get started.
          </p>
          <Link
            to="/tasks/new"
            className="mt-6 inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Create task
          </Link>
        </div>
      )}

      {!isLoading && !error && tasks.length > 0 && (
        <TaskList tasks={tasks} onDelete={handleDelete} deletingId={deletingId} />
      )}
    </>
  )
}
