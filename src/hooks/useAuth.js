import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '@/store/slices/authSlice'
import { ROUTES } from '@/constants'

export function useAuth() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  )

  const handleLogout = () => {
    dispatch(logout())
    navigate(ROUTES.LOGIN)
  }

  return {
    user,
    isAuthenticated,
    loading,
    error,
    logout: handleLogout,
  }
}
