import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const MOCK_USERS = [
  {
    id: 1,
    email: 'agent@agenthub.co.ke',
    password: 'agent123',
    name: 'Chandler Bing',
    role: 'agent',
    avatar: null,
    phone: '+254 712 345 678',
    region: 'Nairobi',
  },
  {
    id: 2,
    email: 'leader@agenthub.co.ke',
    password: 'leader123',
    name: 'Monicah Geller',
    role: 'team_leader',
    avatar: null,
    phone: '+254 722 987 654',
    region: 'Nairobi',
  },
]

function getStoredUser() {
  try {
    const fromLocal = localStorage.getItem('auth_user')
    if (fromLocal) return JSON.parse(fromLocal)
    const fromSession = sessionStorage.getItem('auth_user')
    if (fromSession) return JSON.parse(fromSession)
  } catch {
    // ignore parse errors
  }
  return null
}

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const match = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!match) {
      return rejectWithValue('Invalid email or password. Please try again.')
    }

    const { password: _pwd, ...safeUser } = match
    return { user: safeUser, rememberMe }
  }
)

const storedUser = getStoredUser()

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser,
    isAuthenticated: !!storedUser,
    loading: false,
    error: null,
  },
  reducers: {
    logout(state) {
      state.user = null
      state.isAuthenticated = false
      state.error = null
      localStorage.removeItem('auth_user')
      sessionStorage.removeItem('auth_user')
    },
    clearError(state) {
      state.error = null
    },
    updateProfile(state, action) {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
        const stored = localStorage.getItem('auth_user')
          ? localStorage
          : sessionStorage
        stored.setItem('auth_user', JSON.stringify(state.user))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, rememberMe } = action.payload
        state.loading = false
        state.user = user
        state.isAuthenticated = true
        const storage = rememberMe ? localStorage : sessionStorage
        storage.setItem('auth_user', JSON.stringify(user))
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  },
})

export const { logout, clearError, updateProfile } = authSlice.actions
export default authSlice.reducer
