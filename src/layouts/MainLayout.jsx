import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { closeMobileSidebar } from '@/store/slices/uiSlice'
import Sidebar from '@/components/shared/Sidebar'
import TopNav from '@/components/shared/TopNav'

export default function MainLayout() {
  const dispatch = useDispatch()
  const { theme, sidebarMobileOpen } = useSelector((state) => state.ui)

  // Sync theme class to <html> whenever it changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Mobile overlay — closes sidebar on outside tap */}
      {sidebarMobileOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => dispatch(closeMobileSidebar())}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <Sidebar />

      {/* Content area */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-950 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
