import { Outlet } from 'react-router-dom'
import { AppLayout } from './AppLayout'

export function AppShellLayout() {
  return (
    <AppLayout headerVariant="app">
      <Outlet />
    </AppLayout>
  )
}
