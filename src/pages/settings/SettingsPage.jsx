import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  User, Mail, Phone, Camera, Trash2, Moon, Sun,
  Bell, RefreshCw, MessageSquare, UserPlus, AlertTriangle, Banknote,
  LayoutDashboard, BarChart2, Activity, Zap, CheckCircle2, ChevronDown,
} from 'lucide-react'
import { updateProfile } from '@/store/slices/authSlice'
import { toggleTheme } from '@/store/slices/uiSlice'
import {
  toggleNotificationPref,
  toggleDashboardPref,
  setDashboardPeriod,
} from '@/store/slices/settingsSlice'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

// ─── Schema ────────────────────────────────────────────────────────────────────

const profileSchema = z.object({
  name:  z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Enter a valid email address'),
  phone: z.string().min(7, 'Enter a valid phone number'),
})

// ─── Sub-components ────────────────────────────────────────────────────────────

function SectionCard({ title, description, children }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      <div className="border-b border-border px-6 py-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {description && (
          <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
        )}
      </div>
      <div className="px-6">{children}</div>
    </div>
  )
}

function SettingRow({ icon: Icon, iconBg, iconColor, label, description, children }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-border py-4 last:border-0">
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <div className={cn('flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg', iconBg)}>
            <Icon className={cn('h-4 w-4', iconColor)} />
          </div>
        )}
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{label}</p>
          {description && (
            <p className="mt-0.5 text-xs leading-relaxed text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  )
}

function Toggle({ checked, onChange }) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        'relative inline-flex h-5 w-9 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent',
        'transition-colors duration-200 ease-in-out',
        'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background',
        checked ? 'bg-primary' : 'bg-muted-foreground/30',
      )}
    >
      <span
        className={cn(
          'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-md',
          'transition duration-200 ease-in-out',
          checked ? 'translate-x-4' : 'translate-x-0',
        )}
      />
    </button>
  )
}

function Field({ label, error, children }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls = (hasError) =>
  cn(
    'h-9 w-full rounded-lg border px-3 text-sm',
    'bg-background text-foreground placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
    'transition-colors',
    hasError
      ? 'border-red-400 focus:ring-red-300'
      : 'border-input hover:border-ring',
  )

const PERIODS = ['This Week', 'This Month', 'Last 3 Months', 'Last 6 Months', 'This Year']

// ─── Profile Section ───────────────────────────────────────────────────────────

function ProfileSection() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const fileRef = useRef(null)
  const [preview, setPreview] = useState(user?.avatar ?? null)
  const [saved, setSaved] = useState(false)

  const initials = user?.name
    ?.split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? '??'

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name:  user?.name  ?? '',
      email: user?.email ?? '',
      phone: user?.phone ?? '',
    },
  })

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const dataUrl = ev.target.result
      setPreview(dataUrl)
      dispatch(updateProfile({ avatar: dataUrl }))
    }
    reader.readAsDataURL(file)
    e.target.value = ''
  }

  const handleRemovePhoto = () => {
    setPreview(null)
    dispatch(updateProfile({ avatar: null }))
  }

  const onSubmit = (data) => {
    dispatch(updateProfile(data))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <SectionCard
      title="Profile Settings"
      description="Update your personal information and profile photo"
    >
      <div className="py-6 space-y-6">

        {/* Avatar row */}
        <div className="flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {preview ? (
              <img
                src={preview}
                alt={user?.name}
                className="h-20 w-20 rounded-full object-cover ring-2 ring-border"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white ring-2 ring-border">
                {initials}
              </div>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-background bg-primary text-white shadow-sm transition-opacity hover:opacity-80"
              title="Change photo"
            >
              <Camera className="h-3 w-3" />
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm font-semibold text-foreground">{user?.name}</p>
            <p className="mt-0.5 text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ')}</p>
            <div className="mt-2 flex items-center gap-2">
              <button
                onClick={() => fileRef.current?.click()}
                className="text-xs font-medium text-primary hover:underline"
              >
                Change photo
              </button>
              {preview && (
                <>
                  <span className="text-muted-foreground/50">·</span>
                  <button
                    onClick={handleRemovePhoto}
                    className="flex items-center gap-1 text-xs font-medium text-red-500 hover:underline"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </>
              )}
            </div>
            <p className="mt-1 text-[10px] text-muted-foreground">
              JPG, PNG or GIF · Max 5 MB
            </p>
          </div>
        </div>

        {/* Form fields */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Full Name" error={errors.name?.message}>
              <div className="relative">
                <User className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register('name')}
                  placeholder="Your full name"
                  className={cn(inputCls(!!errors.name), 'pl-9')}
                />
              </div>
            </Field>

            <Field label="Email Address" error={errors.email?.message}>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={cn(inputCls(!!errors.email), 'pl-9')}
                />
              </div>
            </Field>

            <Field label="Phone Number" error={errors.phone?.message}>
              <div className="relative">
                <Phone className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  {...register('phone')}
                  type="tel"
                  placeholder="+254 7XX XXX XXX"
                  className={cn(inputCls(!!errors.phone), 'pl-9')}
                />
              </div>
            </Field>

            <Field label="Region">
              <input
                value={user?.region ?? ''}
                disabled
                className={cn(inputCls(false), 'cursor-not-allowed opacity-60')}
              />
            </Field>
          </div>

          {/* Success banner */}
          {saved && (
            <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-2.5 text-sm text-green-700 dark:bg-green-950/40 dark:text-green-400">
              <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
              Profile updated successfully.
            </div>
          )}

          <div className="flex justify-end">
            <Button type="submit" disabled={!isDirty && !saved} size="sm">
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </SectionCard>
  )
}

// ─── Appearance Section ────────────────────────────────────────────────────────

function AppearanceSection() {
  const dispatch = useDispatch()
  const theme = useSelector((state) => state.ui.theme)
  const isDark = theme === 'dark'

  return (
    <SectionCard title="Appearance" description="Personalise how the portal looks">
      <SettingRow
        icon={isDark ? Moon : Sun}
        iconBg={isDark ? 'bg-slate-800' : 'bg-amber-50 dark:bg-amber-950/40'}
        iconColor={isDark ? 'text-slate-300' : 'text-amber-500'}
        label="Dark Mode"
        description={isDark ? 'Dark theme is active' : 'Light theme is active'}
      >
        <Toggle checked={isDark} onChange={() => dispatch(toggleTheme())} />
      </SettingRow>
    </SectionCard>
  )
}

// ─── Notification Preferences Section ─────────────────────────────────────────

const NOTIF_PREFS = [
  {
    key: 'renewalReminders',
    label: 'Renewal Reminders',
    description: 'Alerts when client policies are due for renewal',
    Icon: RefreshCw,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'clientInquiries',
    label: 'Client Inquiries',
    description: 'Notifications for client questions and follow-up requests',
    Icon: MessageSquare,
    iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    key: 'newLeads',
    label: 'New Leads',
    description: 'Alerts when new prospective clients are assigned to you',
    Icon: UserPlus,
    iconBg: 'bg-green-50 dark:bg-green-950/40',
    iconColor: 'text-green-600 dark:text-green-400',
  },
  {
    key: 'policyExpiry',
    label: 'Policy Expiry',
    description: 'Warnings when policies expire without renewal',
    Icon: AlertTriangle,
    iconBg: 'bg-red-50 dark:bg-red-950/40',
    iconColor: 'text-red-500 dark:text-red-400',
  },
  {
    key: 'commissionPayments',
    label: 'Commission Payments',
    description: 'Updates when commissions are credited or pending',
    Icon: Banknote,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'emailAlerts',
    label: 'Email Alerts',
    description: 'Receive a daily summary via email',
    Icon: Mail,
    iconBg: 'bg-sky-50 dark:bg-sky-950/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    key: 'pushNotifications',
    label: 'Push Notifications',
    description: 'In-app notifications shown in the bell icon',
    Icon: Bell,
    iconBg: 'bg-orange-50 dark:bg-orange-950/40',
    iconColor: 'text-orange-500 dark:text-orange-400',
  },
]

function NotificationPrefsSection() {
  const dispatch = useDispatch()
  const notifPrefs = useSelector((state) => state.settings.notifications)

  return (
    <SectionCard
      title="Notification Preferences"
      description="Choose which alerts you want to receive in-app"
    >
      {NOTIF_PREFS.map(({ key, label, description, Icon, iconBg, iconColor }) => (
        <SettingRow
          key={key}
          icon={Icon}
          iconBg={iconBg}
          iconColor={iconColor}
          label={label}
          description={description}
        >
          <Toggle
            checked={notifPrefs[key] ?? true}
            onChange={() => dispatch(toggleNotificationPref(key))}
          />
        </SettingRow>
      ))}
    </SectionCard>
  )
}

// ─── Dashboard Preferences Section ────────────────────────────────────────────

const DASHBOARD_PREFS = [
  {
    key: 'showKpiCards',
    label: 'KPI Metric Cards',
    description: 'Show key performance indicator cards at the top of the dashboard',
    Icon: LayoutDashboard,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    key: 'showCharts',
    label: 'Performance Charts',
    description: 'Display commission trends and sales funnel charts',
    Icon: BarChart2,
    iconBg: 'bg-violet-50 dark:bg-violet-950/40',
    iconColor: 'text-violet-600 dark:text-violet-400',
  },
  {
    key: 'showRecentActivity',
    label: 'Recent Activity Feed',
    description: 'Show the latest client and policy activity list',
    Icon: Activity,
    iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  {
    key: 'showQuickActions',
    label: 'Quick Actions',
    description: 'Show shortcut buttons for common tasks',
    Icon: Zap,
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
]

function DashboardPrefsSection() {
  const dispatch = useDispatch()
  const dashPrefs = useSelector((state) => state.settings.dashboard)

  return (
    <SectionCard
      title="Dashboard Preferences"
      description="Customise which widgets appear on your dashboard"
    >
      {DASHBOARD_PREFS.map(({ key, label, description, Icon, iconBg, iconColor }) => (
        <SettingRow
          key={key}
          icon={Icon}
          iconBg={iconBg}
          iconColor={iconColor}
          label={label}
          description={description}
        >
          <Toggle
            checked={dashPrefs[key] ?? true}
            onChange={() => dispatch(toggleDashboardPref(key))}
          />
        </SettingRow>
      ))}

      {/* Default period selector */}
      <div className="flex items-center justify-between gap-4 py-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">Default Time Period</p>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Pre-select a date range when the dashboard loads
          </p>
        </div>
        <div className="relative flex-shrink-0">
          <select
            value={dashPrefs.defaultPeriod}
            onChange={(e) => dispatch(setDashboardPeriod(e.target.value))}
            className={cn(
              'h-9 appearance-none rounded-lg border border-input bg-background py-0 pl-3 pr-8 text-sm',
              'text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1',
              'transition-colors hover:border-ring cursor-pointer',
            )}
          >
            {PERIODS.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>
    </SectionCard>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Manage your profile, appearance, and preferences
        </p>
      </div>

      <ProfileSection />
      <AppearanceSection />
      <NotificationPrefsSection />
      <DashboardPrefsSection />
    </div>
  )
}
