import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeading } from '../components/ui/PageHeading'

export function NotFoundPage() {
  return (
    <AppLayout>
      <PageHeading
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Link
        to="/"
        className="inline-flex rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white no-underline hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
      >
        Go home
      </Link>
    </AppLayout>
  )
}
