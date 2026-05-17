import { Outlet } from 'react-router-dom'
import { AppLayout } from './AppLayout'

export function AuthLayout() {
  return (
    <AppLayout headerVariant="guest" narrow>
      <Outlet />
    </AppLayout>
  )
}
