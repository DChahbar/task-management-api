import { type FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormAlert } from '../components/ui/FormAlert'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { PageHeading } from '../components/ui/PageHeading'
import { useAuth } from '../hooks/useAuth'
import { getApiErrorMessage } from '../utils/errors'

import { inputClassName } from '../components/ui/inputStyles'

export function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setIsSubmitting(true)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get('email') ?? '')
    const password = String(formData.get('password') ?? '')

    try {
      await register(email, password)
      navigate('/dashboard', { replace: true })
    } catch (err) {
      setError(
        getApiErrorMessage(err, 'Unable to create account. Please try again.'),
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHeading
        title="Create an account"
        description="Register to start tracking your tasks."
      />

      {error && (
        <FormAlert message={error} onDismiss={() => setError(null)} />
      )}

      <form
        className="mt-4 space-y-4"
        onSubmit={handleSubmit}
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
            disabled={isSubmitting}
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
            disabled={isSubmitting}
            className={inputClassName}
            placeholder="At least 8 characters"
          />
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Minimum 8 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-blue-500 dark:hover:bg-blue-400"
        >
          {isSubmitting ? (
            <span className="inline-flex items-center justify-center gap-2">
              <LoadingSpinner className="h-4 w-4" label="Creating account" />
              Creating account...
            </span>
          ) : (
            'Sign up'
          )}
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
