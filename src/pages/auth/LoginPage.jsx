import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Eye,
  EyeOff,
  Shield,
  TrendingUp,
  Users,
  Bell,
  Loader2,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react'
import { loginUser, clearError } from '@/store/slices/authSlice'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ROUTES } from '@/constants'
import { cn } from '@/lib/utils'

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
})

const DEMO_CREDENTIALS = [
  { role: 'Insurance Agent', email: 'agent@agenthub.co.ke', password: 'agent123' },
  { role: 'Team Leader', email: 'leader@agenthub.co.ke', password: 'leader123' },
]

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth)

  const from = location.state?.from?.pathname || ROUTES.DASHBOARD

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true })
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    return () => { dispatch(clearError()) }
  }, [dispatch])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', rememberMe: false },
  })

  const onSubmit = async (data) => {
    dispatch(loginUser({ email: data.email, password: data.password, rememberMe: data.rememberMe }))
  }

  const fillDemo = (email, password) => {
    setValue('email', email)
    setValue('password', password)
    dispatch(clearError())
  }

  return (
    <div className="min-h-screen flex">
      {/* ── Left brand panel ─────────────────────────────────── */}
      <div className="hidden lg:flex lg:w-[42%] relative flex-col justify-between overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-blue-900 p-12">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-indigo-500/20 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-400/10 blur-2xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 backdrop-blur-sm ring-1 ring-white/20">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <p className="text-base font-bold text-white leading-none">AgentHub</p>
            <p className="text-xs text-blue-300 leading-none mt-0.5">Agent Portal</p>
          </div>
        </div>

        {/* Main copy */}
        <div className="relative z-10 space-y-8">
          <div>
            <h1 className="text-4xl font-bold leading-tight text-white">
              Your Insurance Sales<br />
              <span className="text-blue-300">Command Centre</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-blue-200/80">
              A comprehensive platform built for insurance agents to manage clients,
              track renewals, and grow their business — all in one place.
            </p>
          </div>


          {/* Stat strip */}
          <div className="grid grid-cols-3 gap-3 rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
            {[
              { value: '2,400+', label: 'Active Clients' },
              { value: '94%', label: 'Renewal Rate' },
              { value: 'KSh 12M', label: 'Monthly Revenue' },
            ].map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-blue-300/80">{label}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-blue-400/70">
          © {new Date().getFullYear()} Insurance agent portal. All rights reserved.
        </p>
      </div>

      {/* ── Right form panel ──────────────────────────────────── */}
      <div className="flex flex-1 flex-col justify-center bg-gray-50 px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        {/* Mobile logo */}
        <div className="mb-10 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-950">
            <Shield className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Zimasa Portal</span>
        </div>

        <div className="w-full max-w-md mx-auto animate-fade-in">
          {/* Heading */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Welcome back
            </h2>
            <p className="mt-1.5 text-sm text-gray-500">
              Sign in to your agent portal to continue
            </p>
          </div>

          {/* Error banner */}
          {error && (
            <div className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
              <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-500" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700">
                Email address
              </Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="you@zimasa.co.ke"
                {...register('email')}
                className={cn(
                  'h-11 bg-white',
                  errors.email && 'border-red-400 focus-visible:ring-red-300'
                )}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...register('password')}
                  className={cn(
                    'h-11 bg-white pr-11',
                    errors.password && 'border-red-400 focus-visible:ring-red-300'
                  )}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Remember me + Forgot password */}
            <div className="flex items-center justify-between">
              <label className="flex cursor-pointer items-center gap-2 select-none">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="h-4 w-4 rounded border-gray-300 accent-blue-900 cursor-pointer"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                to={ROUTES.FORGOT_PASSWORD}
                className="text-sm font-medium text-blue-700 hover:text-blue-900"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              className="h-11 w-full bg-blue-950 text-white hover:bg-blue-900 focus-visible:ring-blue-700"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </Button>
          </form>

          {/* Demo credentials */}
          <div className="mt-8 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Demo credentials
            </p>
            <div className="space-y-2">
              {DEMO_CREDENTIALS.map(({ role, email, password }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => fillDemo(email, password)}
                  className="group flex w-full items-center justify-between rounded-lg border border-blue-100 bg-white px-3 py-2 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                >
                  <div>
                    <p className="text-xs font-medium text-gray-800">{role}</p>
                    <p className="text-xs text-gray-500">{email}</p>
                  </div>
                  <span className="flex items-center gap-1 rounded-md bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 group-hover:bg-blue-200">
                    <CheckCircle2 className="h-3 w-3" />
                    Use
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
