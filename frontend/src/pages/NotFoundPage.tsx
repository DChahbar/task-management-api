import { Link } from 'react-router-dom'
import { AppLayout } from '../components/layout/AppLayout'
import { PageHeading } from '../components/ui/PageHeading'
import { btnPrimary } from '../styles/ui'

export function NotFoundPage() {
  return (
    <AppLayout>
      <PageHeading
        title="Page not found"
        description="The page you're looking for doesn't exist or has been moved."
      />
      <Link to="/" className={btnPrimary}>
        Go home
      </Link>
    </AppLayout>
  )
}
