import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  RefreshCw,
  TrendingUp,
  Bell,
  Settings,
  Shield,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'
import { toggleSidebar, closeMobileSidebar } from '@/store/slices/uiSlice'
import { logout } from '@/store/slices/authSlice'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', path: ROUTES.DASHBOARD },
  { icon: Users, label: 'Clients', path: ROUTES.CLIENTS },
  { icon: RefreshCw, label: 'Renewals', path: ROUTES.RENEWALS },
  { icon: TrendingUp, label: 'Performance', path: ROUTES.PERFORMANCE },
  { icon: Bell, label: 'Notifications', path: ROUTES.NOTIFICATIONS, badge: 3 },
  { icon: Settings, label: 'Settings', path: ROUTES.SETTINGS },
]

function NavItem({ item, collapsed, onClick }) {
  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          'group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-150',
          'text-slate-400 hover:bg-slate-800 hover:text-white',
          isActive && 'bg-slate-800 text-white',
          collapsed && 'justify-center px-2.5'
        )
      }
    >
      {({ isActive }) => (
        <>
          {/* Active left border indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-blue-400" />
          )}

          <item.icon
            className={cn(
              'h-5 w-5 flex-shrink-0 transition-colors',
              isActive ? 'text-blue-400' : 'text-slate-400 group-hover:text-slate-200'
            )}
          />

          {!collapsed && (
            <>
              <span className="flex-1 truncate">{item.label}</span>
              {item.badge && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-blue-500 px-1.5 text-[11px] font-semibold text-white">
                  {item.badge}
                </span>
              )}
            </>
          )}

          {/* Badge when collapsed */}
          {collapsed && item.badge && (
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-semibold text-white">
              {item.badge}
            </span>
          )}
        </>
      )}
    </NavLink>
  )
}

export default function Sidebar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { sidebarCollapsed, sidebarMobileOpen } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '??'

  const handleNavClick = () => dispatch(closeMobileSidebar())

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  return (
    <aside
      className={cn(
        // Base
        'fixed inset-y-0 left-0 z-30 flex flex-col bg-slate-900',
        'transition-all duration-300 ease-in-out',
        // Desktop static position
        'lg:static lg:z-auto',
        // Desktop width
        sidebarCollapsed ? 'lg:w-[72px]' : 'lg:w-64',
        // Mobile: always 256px wide, slide in/out
        'w-64',
        sidebarMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      )}
    >
      {/* ── Header ─────────────────────────────────────────────── */}
      <div className="flex h-16 flex-shrink-0 items-center justify-between border-b border-slate-800 px-3">
        {/* Logo mark + brand name */}
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-blue-500">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div
            className={cn(
              'overflow-hidden transition-all duration-300',
              sidebarCollapsed ? 'w-0 opacity-0' : 'w-auto opacity-100'
            )}
          >
            <p className="whitespace-nowrap text-sm font-bold text-white">AgentHub</p>
            <p className="whitespace-nowrap text-xs text-slate-400">Insurance Portal</p>
          </div>
        </div>

        {/* Desktop collapse / expand toggle */}
        <button
          onClick={() => dispatch(toggleSidebar())}
          className="hidden h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-slate-800 hover:text-slate-200 lg:flex"
          aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {sidebarCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* ── Navigation ─────────────────────────────────────────── */}
      <nav
        aria-label="Main navigation"
        className="flex-1 overflow-x-hidden overflow-y-auto py-4 px-2"
      >
        {!sidebarCollapsed && (
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-widest text-slate-500">
            Main Menu
          </p>
        )}

        <div className="space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              collapsed={sidebarCollapsed}
              onClick={handleNavClick}
            />
          ))}
        </div>
      </nav>

      {/* ── User / logout ──────────────────────────────────────── */}
      <div className="flex-shrink-0 border-t border-slate-800 p-3">
        <div
          className={cn(
            'flex items-center rounded-lg p-1.5',
            sidebarCollapsed ? 'flex-col gap-2' : 'gap-3'
          )}
        >
          {/* Avatar */}
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
            {initials}
          </div>

          {!sidebarCollapsed && (
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{user?.name}</p>
              <p className="truncate text-xs text-slate-400">{user?.email}</p>
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className={cn(
              'flex flex-shrink-0 items-center justify-center rounded-md text-slate-400',
              'transition-colors hover:bg-slate-800 hover:text-red-400',
              sidebarCollapsed ? 'h-8 w-8' : 'h-7 w-7'
            )}
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
