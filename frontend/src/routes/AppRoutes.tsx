import { Route, Routes } from 'react-router-dom'
import { AppShellLayout } from '../components/layout/AppShellLayout'
import { AuthLayout } from '../components/layout/AuthLayout'
import { GuestLayout } from '../components/layout/GuestLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { HomePage } from '../pages/HomePage'
import { LoginPage } from '../pages/LoginPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { RegisterPage } from '../pages/RegisterPage'
import { TaskFormPage } from '../pages/TaskFormPage'
import { GuestOnlyRoute } from './GuestOnlyRoute'
import { ProtectedRoute } from './ProtectedRoute'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<GuestLayout />}>
        <Route index element={<HomePage />} />
      </Route>

      <Route element={<AuthLayout />}>
        <Route element={<GuestOnlyRoute />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<AppShellLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="tasks/new" element={<TaskFormPage />} />
          <Route path="tasks/:taskId/edit" element={<TaskFormPage />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
