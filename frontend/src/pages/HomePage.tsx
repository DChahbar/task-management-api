import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function HomePage() {
  const { isAuthenticated } = useAuth()

  return (
    <section className="mx-auto max-w-2xl text-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
        Portfolio project
      </p>
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
        Organize your work with clarity
      </h1>
      <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
        A modern task manager with secure authentication and a clean dashboard.
      </p>
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        {isAuthenticated ? (
          <Link
            to="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white no-underline hover:bg-blue-700 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link
              to="/register"
              className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white no-underline hover:bg-blue-700 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Get started
            </Link>
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 sm:w-auto dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Log in
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
