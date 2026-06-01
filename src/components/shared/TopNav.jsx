import { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  Menu,
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react'
import { toggleMobileSidebar, toggleTheme } from '@/store/slices/uiSlice'
import { logout } from '@/store/slices/authSlice'
import { ROUTES, ROLE_LABELS } from '@/constants'
import { useClickOutside } from '@/hooks/useClickOutside'
import { cn } from '@/lib/utils'

export default function TopNav() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { theme } = useSelector((state) => state.ui)
  const { user } = useSelector((state) => state.auth)

  const [profileOpen, setProfileOpen] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const profileRef = useRef(null)

  useClickOutside(profileRef, () => setProfileOpen(false))

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '??'

  const handleLogout = () => {
    setProfileOpen(false)
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  const handleNav = (path) => {
    setProfileOpen(false)
    navigate(path)
  }

  return (
    <header className="flex h-16 flex-shrink-0 items-center gap-3 border-b border-border bg-background px-4 lg:px-6">
      {/* Mobile hamburger */}
      <button
        onClick={() => dispatch(toggleMobileSidebar())}
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden"
        aria-label="Open navigation menu"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Search bar */}
      <div className="relative flex-1 max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search clients, policies…"
          className={cn(
            'h-9 w-full rounded-lg border border-input bg-muted/40 pl-9 pr-4 text-sm',
            'text-foreground placeholder:text-muted-foreground',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
            'transition-colors'
          )}
        />
      </div>

      {/* Right-side actions */}
      <div className="ml-auto flex items-center gap-1">
        {/* Theme toggle */}
        <button
          onClick={() => dispatch(toggleTheme())}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </button>

        {/* Notifications bell */}
        <button
          onClick={() => navigate(ROUTES.NOTIFICATIONS)}
          className="relative flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
          aria-label="View notifications"
        >
          <Bell className="h-[18px] w-[18px]" />
          {/* Unread badge — will be driven by state once Notifications module is built */}
          <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold leading-none text-white">
            3
          </span>
        </button>

        {/* Separator */}
        <div className="mx-1.5 h-6 w-px bg-border" aria-hidden="true" />

        {/* User profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-accent"
            aria-haspopup="true"
            aria-expanded={profileOpen}
          >
            {/* Avatar */}
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
              {initials}
            </div>

            {/* Name + role (hidden on very small screens) */}
            <div className="hidden text-left sm:block">
              <p className="text-[13px] font-semibold text-foreground leading-none">
                {user?.name}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground leading-none">
                {ROLE_LABELS[user?.role] ?? user?.role}
              </p>
            </div>

            <ChevronDown
              className={cn(
                'h-4 w-4 text-muted-foreground transition-transform duration-200',
                profileOpen && 'rotate-180'
              )}
            />
          </button>

          {/* Dropdown panel */}
          {profileOpen && (
            <div className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-border bg-background shadow-lg ring-1 ring-black/5 dark:ring-white/10">
              {/* User info header */}
              <div className="border-b border-border px-4 py-3">
                <p className="text-sm font-semibold text-foreground">{user?.name}</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>

              {/* Menu items */}
              <div className="py-1">
                <button
                  onClick={() => handleNav(ROUTES.SETTINGS)}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <User className="h-4 w-4 text-muted-foreground" />
                  My Profile
                </button>
                <button
                  onClick={() => handleNav(ROUTES.SETTINGS)}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm text-foreground transition-colors hover:bg-accent"
                >
                  <Settings className="h-4 w-4 text-muted-foreground" />
                  Settings
                </button>
              </div>

              {/* Logout */}
              <div className="border-t border-border py-1">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"
                >
                  <LogOut className="h-4 w-4" />
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
