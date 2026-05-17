import { Link } from 'react-router-dom'
import { PageHeading } from '../components/ui/PageHeading'

const inputClassName =
  'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-50'

export function RegisterPage() {
  return (
    <>
      <PageHeading
        title="Create an account"
        description="Register to start tracking tasks. API integration arrives in the next milestone."
      />

      <form
        className="space-y-4"
        onSubmit={(e) => e.preventDefault()}
        aria-label="Registration form"
      >
        <div>
          <label
            htmlFor="register-email"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="register-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="register-password"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <input
            id="register-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={inputClassName}
            placeholder="At least 8 characters"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Minimum 8 characters
          </p>
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          Sign up
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Already have an account?{' '}
        <Link
          to="/login"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Log in
        </Link>
      </p>
    </>
  )
}
