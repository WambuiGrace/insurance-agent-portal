import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCreateClient } from '@/services/queries/clientsQueries'
import { PLAN_TYPES, CLIENT_STATUSES, AGENTS } from '@/data/clientsData'
import { cn } from '@/lib/utils'

const REGIONS = ['Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret']

const schema = z.object({
  name:          z.string().min(2, 'Full name is required'),
  email:         z.string().email('Enter a valid email address'),
  phone:         z.string().min(10, 'Phone number is required'),
  region:        z.string().min(1, 'Select a region'),
  planType:      z.enum(['Medical', 'Life', 'Motor', 'Property'], { required_error: 'Select a plan type' }),
  premium:       z.coerce.number({ invalid_type_error: 'Enter a valid amount' }).min(1000, 'Minimum premium is KSh 1,000'),
  renewalDate:   z.string().min(1, 'Renewal date is required'),
  assignedAgent: z.string().min(1, 'Select an agent'),
  status:        z.enum(['Active', 'Expiring Soon', 'Expired', 'Cancelled']).default('Active'),
})

// ─── Shared field wrapper ──────────────────────────────────────────────────────

function Field({ label, required, error, children }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  )
}

const inputCls = (hasError) =>
  cn(
    'h-9 w-full rounded-lg border bg-background px-3 text-sm text-foreground',
    'placeholder:text-muted-foreground',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
    hasError ? 'border-red-400 focus:ring-red-400' : 'border-input'
  )

function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function AddClientPage() {
  const navigate = useNavigate()
  const { mutate: createClient, isPending } = useCreateClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'Active' },
  })

  const onSubmit = (data) => {
    createClient(data, {
      onSuccess: (newClient) => navigate(`/clients/${newClient.id}`),
    })
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* ── Header ────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/clients')} className="flex-shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-foreground sm:text-2xl">Add New Client</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the client details and policy information below.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* ── Personal Information ───────────────────────────── */}
        <SectionCard title="Personal Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Field label="Full Name" required error={errors.name?.message}>
              <input
                {...register('name')}
                type="text"
                placeholder="e.g. James Kamau"
                className={inputCls(!!errors.name)}
              />
            </Field>

            <Field label="Email Address" required error={errors.email?.message}>
              <input
                {...register('email')}
                type="email"
                placeholder="james.kamau@email.com"
                className={inputCls(!!errors.email)}
              />
            </Field>

            <Field label="Phone Number" required error={errors.phone?.message}>
              <input
                {...register('phone')}
                type="tel"
                placeholder="+254 712 000 000"
                className={inputCls(!!errors.phone)}
              />
            </Field>

            <Field label="Region" required error={errors.region?.message}>
              <select {...register('region')} className={inputCls(!!errors.region)}>
                <option value="">Select region…</option>
                {REGIONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </Field>

          </div>
        </SectionCard>

        {/* ── Policy Information ─────────────────────────────── */}
        <SectionCard title="Policy Information">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

            <Field label="Plan Type" required error={errors.planType?.message}>
              <select {...register('planType')} className={inputCls(!!errors.planType)}>
                <option value="">Select plan type…</option>
                {PLAN_TYPES.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </Field>

            <Field label="Annual Premium (KSh)" required error={errors.premium?.message}>
              <input
                {...register('premium')}
                type="number"
                min="1000"
                step="500"
                placeholder="e.g. 48000"
                className={inputCls(!!errors.premium)}
              />
            </Field>

            <Field label="Renewal Date" required error={errors.renewalDate?.message}>
              <input
                {...register('renewalDate')}
                type="date"
                className={inputCls(!!errors.renewalDate)}
              />
            </Field>

            <Field label="Assigned Agent" required error={errors.assignedAgent?.message}>
              <select {...register('assignedAgent')} className={inputCls(!!errors.assignedAgent)}>
                <option value="">Select agent…</option>
                {AGENTS.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </Field>

            <Field label="Initial Status" error={errors.status?.message}>
              <select {...register('status')} className={inputCls(!!errors.status)}>
                {CLIENT_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </Field>

          </div>
        </SectionCard>

        {/* ── Actions ───────────────────────────────────────── */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/clients')}
            className="sm:w-auto w-full"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isPending}
            className="bg-blue-950 hover:bg-blue-900 sm:w-auto w-full"
          >
            <UserPlus className="h-4 w-4" />
            {isPending ? 'Saving…' : 'Save Client'}
          </Button>
        </div>

      </form>
    </div>
  )
}
