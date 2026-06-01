import { createSlice } from '@reduxjs/toolkit'

function getInitialTheme() {
  const stored = localStorage.getItem('theme')
  if (stored === 'dark' || stored === 'light') return stored
  return 'light'
}

function getInitialSidebarCollapsed() {
  return localStorage.getItem('sidebar_collapsed') === 'true'
}

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    theme: getInitialTheme(),
    sidebarCollapsed: getInitialSidebarCollapsed(),
    sidebarMobileOpen: false,
  },
  reducers: {
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', state.theme)
    },
    setTheme(state, action) {
      state.theme = action.payload
      localStorage.setItem('theme', action.payload)
    },
    toggleSidebar(state) {
      state.sidebarCollapsed = !state.sidebarCollapsed
      localStorage.setItem('sidebar_collapsed', String(state.sidebarCollapsed))
    },
    setSidebarCollapsed(state, action) {
      state.sidebarCollapsed = action.payload
      localStorage.setItem('sidebar_collapsed', String(action.payload))
    },
    toggleMobileSidebar(state) {
      state.sidebarMobileOpen = !state.sidebarMobileOpen
    },
    closeMobileSidebar(state) {
      state.sidebarMobileOpen = false
    },
  },
})

export const {
  toggleTheme,
  setTheme,
  toggleSidebar,
  setSidebarCollapsed,
  toggleMobileSidebar,
  closeMobileSidebar,
} = uiSlice.actions

export default uiSlice.reducer
