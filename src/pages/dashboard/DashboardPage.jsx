import { Shield, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { ROLE_LABELS } from '@/constants'

export default function DashboardPage() {
  const { user, logout } = useAuth()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950">
          <Shield className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-xl font-bold text-gray-900">Welcome, {user?.name}!</h1>
        <p className="mt-1 text-sm text-gray-500">
          {ROLE_LABELS[user?.role] ?? user?.role}
        </p>
        <div className="mt-6 rounded-lg bg-gray-50 p-3 text-left text-xs text-gray-500 space-y-1">
          <p><span className="font-medium text-gray-700">Email:</span> {user?.email}</p>
          <p><span className="font-medium text-gray-700">Region:</span> {user?.region}</p>
          <p><span className="font-medium text-gray-700">Phone:</span> {user?.phone}</p>
        </div>
        <p className="mt-4 text-xs text-gray-400">
          Dashboard module coming next — authentication complete ✓
        </p>
        <Button
          onClick={logout}
          variant="outline"
          className="mt-6 w-full text-red-600 border-red-200 hover:bg-red-50 hover:border-red-300"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </div>
  )
}
