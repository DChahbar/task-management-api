import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface HeaderProps {
  variant?: 'guest' | 'app'
}

const linkFocusClass =
  'rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:focus-visible:outline-blue-400'

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm no-underline',
    linkFocusClass,
    isActive
      ? 'font-medium text-slate-900 dark:text-slate-50'
      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50',
  ].join(' ')

export function Header({ variant = 'guest' }: HeaderProps) {
  const { isAuthenticated, logout, user } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          to={variant === 'app' || isAuthenticated ? '/dashboard' : '/'}
          className={`text-lg font-semibold tracking-tight text-slate-900 no-underline hover:text-blue-600 dark:text-slate-50 dark:hover:text-blue-400 ${linkFocusClass}`}
        >
          Task Manager
        </Link>

        {variant === 'app' || isAuthenticated ? (
          <nav aria-label="Account and tasks" className="flex items-center gap-4">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks/new" className={navLinkClass}>
              New task
            </NavLink>
            {user?.email && (
              <span className="sr-only">Signed in as {user.email}</span>
            )}
            {user?.email && (
              <span
                className="hidden text-sm text-slate-500 sm:inline dark:text-slate-400"
                aria-hidden="true"
              >
                {user.email}
              </span>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className={`text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50 ${linkFocusClass}`}
            >
              Log out
            </button>
          </nav>
        ) : (
          <nav aria-label="Sign in" className="flex items-center gap-4">
            <NavLink to="/login" className={navLinkClass}>
              Log in
            </NavLink>
            <Link
              to="/register"
              className={`rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 ${linkFocusClass}`}
            >
              Sign up
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}


