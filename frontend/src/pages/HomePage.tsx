import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { btnPrimary, btnSecondary } from '../styles/ui'

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
          <Link to="/dashboard" className={`${btnPrimary} w-full sm:w-auto`}>
            Go to dashboard
          </Link>
        ) : (
          <>
            <Link to="/register" className={`${btnPrimary} w-full sm:w-auto`}>
              Get started
            </Link>
            <Link to="/login" className={`${btnSecondary} w-full sm:w-auto`}>
              Log in
            </Link>
          </>
        )}
      </div>
    </section>
  )
}
