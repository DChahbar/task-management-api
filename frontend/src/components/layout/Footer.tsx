export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white py-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-5xl px-4 text-center text-sm text-slate-500 sm:px-6 dark:text-slate-400">
        <p>&copy; {year} Task Manager</p>
      </div>
    </footer>
  )
}
