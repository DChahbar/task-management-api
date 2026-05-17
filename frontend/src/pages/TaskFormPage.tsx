import { type FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { createTask, deleteTask, updateTask } from '../api/tasks'
import { FormAlert } from '../components/ui/FormAlert'
import { FieldHint } from '../components/ui/FieldHint'
import { inputClassName } from '../components/ui/inputStyles'
import { LoadingState } from '../components/ui/LoadingState'
import { PageHeading } from '../components/ui/PageHeading'
import { useTask } from '../hooks/useTask'
import { getApiErrorMessage } from '../utils/errors'

const TITLE_MAX = 200
const DESCRIPTION_MAX = 2000

export function TaskFormPage() {
  const navigate = useNavigate()
  const { taskId: taskIdParam } = useParams<{ taskId: string }>()
  const isEditing = Boolean(taskIdParam)
  const taskId =
    isEditing && taskIdParam && !Number.isNaN(Number(taskIdParam))
      ? Number(taskIdParam)
      : undefined
  const isInvalidId = isEditing && taskId === undefined

  const { task, isLoading, error: loadError } = useTask(taskId)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [completed, setCompleted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (task) {
      setTitle(task.title)
      setDescription(task.description ?? '')
      setCompleted(task.completed)
    }
  }, [task])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitError(null)

    const trimmedTitle = title.trim()
    const trimmedDescription = description.trim()

    if (!trimmedTitle) {
      setSubmitError('Title is required.')
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditing && taskId !== undefined) {
        await updateTask(taskId, {
          title: trimmedTitle,
          description: trimmedDescription || null,
          completed,
        })
      } else {
        await createTask({
          title: trimmedTitle,
          description: trimmedDescription || null,
        })
      }
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setSubmitError(
        getApiErrorMessage(
          err,
          isEditing ? 'Failed to update task.' : 'Failed to create task.',
        ),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  async function handleDelete() {
    if (taskId === undefined) return

    if (
      !window.confirm(
        `Delete "${title.trim() || 'this task'}"? This cannot be undone.`,
      )
    ) {
      return
    }

    setSubmitError(null)
    setIsDeleting(true)

    try {
      await deleteTask(taskId)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, 'Failed to delete task.'))
    } finally {
      setIsDeleting(false)
    }
  }

  const isBusy = isSubmitting || isDeleting

  if (isEditing && isLoading) {
    return <LoadingState label="Loading task…" />
  }

  if (isEditing && loadError) {
    return (
      <div className="space-y-4">
        <PageHeading title="Edit task" />
        <FormAlert message={loadError} />
        <Link
          to="/dashboard"
          className="inline-flex text-sm font-medium text-blue-600 no-underline hover:text-blue-700 dark:text-blue-400"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  if (isInvalidId) {
    return (
      <div className="space-y-4">
        <PageHeading title="Invalid task" description="This task link is not valid." />
        <Link
          to="/dashboard"
          className="inline-flex text-sm font-medium text-blue-600 no-underline hover:text-blue-700 dark:text-blue-400"
        >
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <>
      <PageHeading
        title={isEditing ? 'Edit task' : 'Create task'}
        description={
          isEditing ? 'Update your task details.' : 'Add a new task to your list.'
        }
      />

      {submitError && (
        <div className="mb-4">
          <FormAlert message={submitError} />
        </div>
      )}

      <form
        className="mx-auto max-w-lg space-y-4"
        onSubmit={handleSubmit}
        aria-label={isEditing ? 'Edit task form' : 'Create task form'}
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={TITLE_MAX}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isBusy}
            className={inputClassName}
            placeholder="Task title"
          />
          <FieldHint>
            {title.trim().length}/{TITLE_MAX} characters
          </FieldHint>
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            maxLength={DESCRIPTION_MAX}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isBusy}
            className={inputClassName}
            placeholder="Optional details"
          />
          <FieldHint>
            {description.length}/{DESCRIPTION_MAX} characters
          </FieldHint>
        </div>

        {isEditing && (
          <div className="flex items-center gap-2">
            <input
              id="completed"
              name="completed"
              type="checkbox"
              checked={completed}
              onChange={(e) => setCompleted(e.target.checked)}
              disabled={isBusy}
              className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="completed"
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Mark as completed
            </label>
          </div>
        )}

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Link
              to="/dashboard"
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isBusy}
              className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              {isSubmitting
                ? 'Saving...'
                : isEditing
                  ? 'Save changes'
                  : 'Create task'}
            </button>
          </div>

          {isEditing && (
            <button
              type="button"
              onClick={() => void handleDelete()}
              disabled={isBusy}
              className="rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-red-900 dark:text-red-300 dark:hover:bg-red-950/50"
            >
              {isDeleting ? 'Deleting...' : 'Delete task'}
            </button>
          )}
        </div>
      </form>
    </>
  )
}

