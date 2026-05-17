import { type FormEvent, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FormAlert } from '../components/ui/FormAlert'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { PageHeading } from '../components/ui/PageHeading'
import { useAuth } from '../hooks/useAuth'
import { inputClassName } from '../components/ui/inputStyles'
import { getApiErrorMessage } from '../utils/errors'

const LOGIN_ERROR_ID = 'login-error'

export function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const from =
    (location.state as { from?: { pathname: string } } | null)?.from?.pathname ??
    '/dashboard'

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')

    try {
      await login(email, password)
      navigate(from, { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Unable to log in. Check your credentials.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeading
        title="Log in"
        description="Sign in to manage your tasks."
      />

      {error && (
        <FormAlert
          id={LOGIN_ERROR_ID}
          message={error}
          onDismiss={() => setError(null)}
        />
      )}

      <form
        className="mt-4 space-y-4"
        onSubmit={handleSubmit}
        aria-label="Log in form"
        aria-describedby={error ? LOGIN_ERROR_ID : undefined}
      >
        <div>
          <label
            htmlFor="email"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(error)}
            className={inputClassName}
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="mb-1 block text-sm font-medium text-slate-700 dark:text-slate-300"
          >
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            aria-invalid={Boolean(error)}
            className={inputClassName}
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <LoadingSpinner className="h-4 w-4" label="Logging in" />
              Logging in...
            </span>
          ) : (
            'Log in'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{' '}
        <Link
          to="/register"
          className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Sign up
        </Link>
      </p>
    </>
  )
}
