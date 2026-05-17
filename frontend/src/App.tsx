import { AppLayout } from './components/layout/AppLayout'

function App() {
  return (
    <AppLayout showNav>
      <section className="mx-auto max-w-2xl text-center">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Portfolio project
        </p>
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-50">
          Organize your work with clarity
        </h1>
        <p className="mb-8 text-lg text-slate-600 dark:text-slate-400">
          A modern task manager with secure authentication and a clean dashboard.
          Routing and auth pages arrive in the next milestones.
        </p>
        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="/register"
            className="inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white no-underline hover:bg-blue-700 sm:w-auto dark:bg-blue-500 dark:hover:bg-blue-400"
          >
            Get started
          </a>
          <a
            href="/login"
            className="inline-flex w-full items-center justify-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 no-underline hover:bg-slate-50 sm:w-auto dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Log in
          </a>
        </div>
      </section>
    </AppLayout>
  )
}

export default App
