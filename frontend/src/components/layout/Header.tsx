import { Link, NavLink } from 'react-router-dom'

interface HeaderProps {
  variant?: 'guest' | 'app'
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'text-sm no-underline',
    isActive
      ? 'font-medium text-slate-900 dark:text-slate-50'
      : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50',
  ].join(' ')

export function Header({ variant = 'guest' }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          to={variant === 'app' ? '/dashboard' : '/'}
          className="text-lg font-semibold tracking-tight text-slate-900 no-underline hover:text-blue-600 dark:text-slate-50 dark:hover:text-blue-400"
        >
          Task Manager
        </Link>

        {variant === 'guest' ? (
          <nav aria-label="Main" className="flex items-center gap-4">
            <NavLink to="/login" className={navLinkClass}>
              Log in
            </NavLink>
            <Link
              to="/register"
              className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-medium text-white no-underline hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Sign up
            </Link>
          </nav>
        ) : (
          <nav aria-label="Main" className="flex items-center gap-4">
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/tasks/new" className={navLinkClass}>
              New task
            </NavLink>
            <span className="text-sm text-slate-400 dark:text-slate-500">
              Logout (soon)
            </span>
          </nav>
        )}
      </div>
    </header>
  )
}
