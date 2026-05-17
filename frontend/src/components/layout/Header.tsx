interface HeaderProps {
  showNav?: boolean
}

export function Header({ showNav = false }: HeaderProps) {
  return (
    <header className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a
          href="/"
          className="text-lg font-semibold tracking-tight text-slate-900 no-underline hover:text-blue-600 dark:text-slate-50 dark:hover:text-blue-400"
        >
          Task Manager
        </a>

        {showNav && (
          <nav aria-label="Main" className="flex items-center gap-4 text-sm">
            <a
              href="/login"
              className="text-slate-600 no-underline hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
            >
              Log in
            </a>
            <a
              href="/register"
              className="rounded-lg bg-blue-600 px-3 py-1.5 font-medium text-white no-underline hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              Sign up
            </a>
          </nav>
        )}
      </div>
    </header>
  )
}
