import { Link, useParams } from 'react-router-dom'
import { PageHeading } from '../components/ui/PageHeading'

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50'

export function TaskFormPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const isEditing = Boolean(taskId)

  return (
    <>
      <PageHeading
        title={isEditing ? 'Edit task' : 'Create task'}
        description={
          isEditing
            ? `Editing task #${taskId}. Saving will connect in a later milestone.`
            : 'Add a new task to your list.'
        }
      />

      <form
        className="mx-auto max-w-lg space-y-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label={isEditing ? 'Edit task form' : 'Create task form'}
      >
        <div>
          <label
            htmlFor="title"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={200}
            className={inputClassName}
            placeholder="Task title"
          />
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
            maxLength={2000}
            className={inputClassName}
            placeholder="Optional details"
          />
        </div>

        {isEditing && (
          <div className="flex items-center gap-2">
            <input
              id="completed"
              name="completed"
              type="checkbox"
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

        <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            {isEditing ? 'Save changes' : 'Create task'}
          </button>
        </div>
      </form>
    </>
  )
}
