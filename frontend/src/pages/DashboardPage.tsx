import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteTask, updateTask } from '../api/tasks'
import { TaskFilters } from '../components/tasks/TaskFilters'
import { TaskList } from '../components/tasks/TaskList'
import { TaskListSkeleton } from '../components/tasks/TaskListSkeleton'
import { TaskSearchBar } from '../components/tasks/TaskSearchBar'
import { TaskStats } from '../components/tasks/TaskStats'
import { TaskStatsSkeleton } from '../components/tasks/TaskStatsSkeleton'
import { Alert } from '../components/ui/Alert'
import { EmptyState } from '../components/ui/EmptyState'
import { ErrorState } from '../components/ui/ErrorState'
import { PageHeading } from '../components/ui/PageHeading'
import { useTasks } from '../hooks/useTasks'
import type { Task } from '../types/api'
import { btnPrimary, btnSecondary } from '../styles/ui'
import { getApiErrorMessage } from '../utils/errors'
import {
  countTasksByStatus,
  filterTasks,
  type TaskFilter,
} from '../utils/tasks'

export function DashboardPage() {
  const {
    tasks,
    setTasks,
    isLoading,
    isRefetching,
    error,
    fetchError,
    clearFetchError,
    refetch,
    replaceTask,
    removeTask,
  } = useTasks()
  const [filter, setFilter] = useState<TaskFilter>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [togglingId, setTogglingId] = useState<number | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  const stats = useMemo(() => countTasksByStatus(tasks), [tasks])

  const filteredTasks = useMemo(
    () => filterTasks(tasks, filter, searchQuery),
    [tasks, filter, searchQuery],
  )

  const filterCounts = useMemo(
    () => ({
      all: tasks.length,
      active: stats.active,
      completed: stats.completed,
    }),
    [tasks.length, stats.active, stats.completed],
  )

  async function handleToggleComplete(task: Task) {
    const nextCompleted = !task.completed
    setActionError(null)
    setTogglingId(task.id)

    const optimistic: Task = {
      ...task,
      completed: nextCompleted,
      updated_at: new Date().toISOString(),
    }
    replaceTask(optimistic)

    try {
      const updated = await updateTask(task.id, { completed: nextCompleted })
      replaceTask(updated)
    } catch (err) {
      replaceTask(task)
      setActionError(
        getApiErrorMessage(err, 'Failed to update task status.'),
      )
    } finally {
      setTogglingId(null)
    }
  }

  async function handleDelete(taskId: number) {
    const task = tasks.find((item) => item.id === taskId)
    if (!task) return

    if (!window.confirm(`Delete "${task.title}"? This cannot be undone.`)) {
      return
    }

    setActionError(null)
    setDeletingId(taskId)

    const snapshot = tasks
    removeTask(taskId)

    try {
      await deleteTask(taskId)
    } catch (err) {
      setTasks(snapshot)
      setActionError(getApiErrorMessage(err, 'Failed to delete task.'))
    } finally {
      setDeletingId(null)
    }
  }

  const hasTasks = tasks.length > 0
  const hasFilteredResults = filteredTasks.length > 0
  const showInitialSkeleton = isLoading && !hasTasks && !error

  return (
    <>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <PageHeading
          titleId="dashboard-title"
          title="Dashboard"
          description="View, filter, and manage your tasks."
          className="mb-0 sm:mb-0"
        />
        <Link to="/tasks/new" className={`${btnPrimary} shrink-0`}>
          New task
        </Link>
      </div>

      {actionError && (
        <div className="mb-4">
          <Alert
            variant="error"
            message={actionError}
            onDismiss={() => setActionError(null)}
          />
        </div>
      )}

      {fetchError && (
        <div className="mb-4">
          <Alert
            variant="error"
            message={fetchError}
            onDismiss={clearFetchError}
          />
        </div>
      )}

      {isRefetching && hasTasks && !fetchError && (
        <div className="mb-4">
          <Alert variant="info" message="Refreshing tasks..." />
        </div>
      )}

      {showInitialSkeleton && (
        <div className="space-y-6">
          <TaskStatsSkeleton />
          <TaskListSkeleton count={4} />
        </div>
      )}

      {error && !hasTasks && (
        <div className="mb-6">
          <ErrorState
            title="Could not load tasks"
            message={error}
            onRetry={() => void refetch()}
            isRetrying={isRefetching}
          />
        </div>
      )}

      {!isLoading && !error && !hasTasks && (
        <EmptyState
          title="No tasks yet"
          description="Create your first task to get started organizing your work."
          action={
            <Link to="/tasks/new" className={btnPrimary}>
              Create task
            </Link>
          }
        />
      )}

      {!isLoading && !error && hasTasks && (
        <section
          aria-labelledby="dashboard-title"
          className={[
            'space-y-6',
            isRefetching ? 'pointer-events-none opacity-60' : '',
          ].join(' ')}
        >
          <TaskStats
            total={stats.total}
            active={stats.active}
            completed={stats.completed}
          />

          <div className="space-y-4 rounded-xl border border-slate-200 bg-slate-50/50 p-4 dark:border-slate-700 dark:bg-slate-900/50 sm:p-5">
            <TaskSearchBar value={searchQuery} onChange={setSearchQuery} />
            <TaskFilters
              filter={filter}
              onFilterChange={setFilter}
              counts={filterCounts}
            />
          </div>

          {hasFilteredResults ? (
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
              togglingId={togglingId}
              deletingId={deletingId}
            />
          ) : (
            <EmptyState
              title="No matching tasks"
              description="Try a different search term or filter to see more tasks."
              action={
                <button
                  type="button"
                  onClick={() => {
                    setFilter('all')
                    setSearchQuery('')
                  }}
                  className={btnSecondary}
                >
                  Clear filters
                </button>
              }
            />
          )}
        </section>
      )}
    </>
  )
}

