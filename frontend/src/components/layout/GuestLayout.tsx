import { Outlet } from 'react-router-dom'
import { AppLayout } from './AppLayout'

export function GuestLayout() {
  return (
    <AppLayout headerVariant="guest">
      <Outlet />
    </AppLayout>
  )
}
