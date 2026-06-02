import { createBrowserRouter, Navigate } from 'react-router-dom'
import AuthLayout from '@/layouts/AuthLayout'
import MainLayout from '@/layouts/MainLayout'
import ProtectedRoute from '@/components/shared/ProtectedRoute'
import LoginPage from '@/pages/auth/LoginPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import DashboardPage from '@/pages/dashboard/DashboardPage'
import ClientsPage from '@/pages/clients/ClientsPage'
import ClientDetailPage from '@/pages/clients/ClientDetailPage'
import AddClientPage from '@/pages/clients/AddClientPage'
import RenewalsPage from '@/pages/renewals/RenewalsPage'
import PerformancePage from '@/pages/performance/PerformancePage'
import NotificationsPage from '@/pages/notifications/NotificationsPage'
import SettingsPage from '@/pages/settings/SettingsPage'
import { ROUTES } from '@/constants'

export const router = createBrowserRouter([
  // ── Public auth routes ─────────────────────────────────────
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.LOGIN, element: <LoginPage /> },
      { path: ROUTES.FORGOT_PASSWORD, element: <ForgotPasswordPage /> },
    ],
  },

  // ── Protected app routes (inside MainLayout) ───────────────
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          { path: ROUTES.DASHBOARD, element: <DashboardPage /> },
          { path: ROUTES.CLIENTS, element: <ClientsPage /> },
          { path: `${ROUTES.CLIENTS}/new`, element: <AddClientPage /> },
          { path: `${ROUTES.CLIENTS}/:id`, element: <ClientDetailPage /> },
          { path: ROUTES.RENEWALS, element: <RenewalsPage /> },
          { path: ROUTES.PERFORMANCE, element: <PerformancePage /> },
          { path: ROUTES.NOTIFICATIONS, element: <NotificationsPage /> },
          { path: ROUTES.SETTINGS, element: <SettingsPage /> },
        ],
      },
    ],
  },

  // ── Fallbacks ──────────────────────────────────────────────
  { path: '/', element: <Navigate to={ROUTES.LOGIN} replace /> },
  { path: '*', element: <Navigate to={ROUTES.LOGIN} replace /> },
])
