import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowLeft, Pencil, User, Phone, Mail, MapPin, Calendar,
  ShieldCheck, UserCheck, RefreshCw, CheckCircle2, Plus, X,
  StickyNote, Building2, BadgeCheck, AlertCircle, Clock,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useClientDetail, useAddNote } from '@/services/queries/clientsQueries'
import StatusBadge from '@/components/clients/StatusBadge'
import PlanTypeBadge from '@/components/clients/PlanTypeBadge'
import { cn } from '@/lib/utils'
import { formatKSh } from '@/utils/formatters'

// ─── Helpers ───────────────────────────────────────────────────────────────────

const fmtDate = (d) =>
  new Date(d).toLocaleDateString('en-KE', { day: '2-digit', month: 'long', year: 'numeric' })

const fmtShort = (d) =>
  new Date(d).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' })

function relativeTime(iso) {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hours = Math.floor(mins / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return fmtShort(iso)
}

function toInitials(name) {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
}

// ─── Shared sub-components ─────────────────────────────────────────────────────

function SectionCard({ title, action, children, noPadding }) {
  return (
    <div className="rounded-xl border border-border bg-background shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        {action}
      </div>
      <div className={noPadding ? '' : 'p-5'}>{children}</div>
    </div>
  )
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border-b border-border py-2.5 last:border-0">
      <Icon className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
      <div className="min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        <div className="mt-0.5 text-sm font-medium text-foreground">{value ?? '—'}</div>
      </div>
    </div>
  )
}

function ClaimStatusBadge({ status }) {
  const styles = {
    Settled:  'bg-green-50 text-green-700 ring-green-200 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800',
    Pending:  'bg-amber-50 text-amber-700 ring-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:ring-amber-800',
    Rejected: 'bg-red-50 text-red-700 ring-red-200 dark:bg-red-950/40 dark:text-red-400 dark:ring-red-800',
  }
  return (
    <span className={cn('inline-flex rounded-full px-2 py-0.5 text-xs font-medium ring-1 ring-inset', styles[status] ?? styles.Pending)}>
      {status}
    </span>
  )
}

const TIMELINE_CONFIG = {
  registered:        { Icon: UserCheck,    bg: 'bg-green-100 dark:bg-green-900/50',    color: 'text-green-600 dark:text-green-400' },
  call:              { Icon: Phone,         bg: 'bg-blue-100 dark:bg-blue-900/50',      color: 'text-blue-600 dark:text-blue-400' },
  email:             { Icon: Mail,          bg: 'bg-violet-100 dark:bg-violet-900/50',  color: 'text-violet-600 dark:text-violet-400' },
  renewal_initiated: { Icon: RefreshCw,    bg: 'bg-amber-100 dark:bg-amber-900/50',    color: 'text-amber-600 dark:text-amber-400' },
  renewed:           { Icon: CheckCircle2, bg: 'bg-green-100 dark:bg-green-900/50',    color: 'text-green-600 dark:text-green-400' },
}

// ─── Add Note Modal ────────────────────────────────────────────────────────────

const noteSchema = z.object({
  content: z.string().min(1, 'Note cannot be empty').max(500, 'Maximum 500 characters'),
})

function AddNoteModal({ clientId, open, onClose }) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(noteSchema),
    defaultValues: { content: '' },
  })
  const { mutate: addNote, isPending } = useAddNote()
  const content = watch('content') || ''

  useEffect(() => {
    if (!open) reset()
  }, [open, reset])

  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  if (!open) return null

  const onSubmit = (data) => {
    addNote(
      { clientId, content: data.content, author: 'You' },
      { onSuccess: () => { reset(); onClose() } }
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <h3 className="text-sm font-semibold text-foreground">Add Note</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Modal body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-5">
          <div>
            <textarea
              {...register('content')}
              rows={5}
              placeholder="Write a note about this client…"
              className={cn(
                'w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm',
                'text-foreground placeholder:text-muted-foreground',
                'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 focus:ring-offset-background',
                errors.content && 'border-red-400 focus:ring-red-400'
              )}
            />
            <div className="mt-1.5 flex items-center justify-between">
              {errors.content
                ? <p className="text-xs text-red-500">{errors.content.message}</p>
                : <span />}
              <span className={cn('text-xs', content.length > 480 ? 'text-amber-500' : 'text-muted-foreground')}>
                {content.length}/500
              </span>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button type="button" variant="outline" size="sm" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isPending}
              className="bg-blue-950 hover:bg-blue-900"
            >
              {isPending ? 'Saving…' : 'Save Note'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

// ─── Loading Skeleton ──────────────────────────────────────────────────────────

function SkeletonDetail() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted" />
        <div className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <div className="h-6 w-48 rounded bg-muted" />
          <div className="h-3.5 w-28 rounded bg-muted" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[0, 1].map((i) => (
              <div key={i} className="rounded-xl border border-border bg-background p-5 space-y-3">
                <div className="h-4 w-24 rounded bg-muted" />
                {[75, 85, 65, 90].map((w, j) => (
                  <div key={j} className="h-3.5 rounded bg-muted" style={{ width: `${w}%` }} />
                ))}
              </div>
            ))}
          </div>
          {[0, 1, 2].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-5 space-y-3">
              <div className="h-4 w-32 rounded bg-muted" />
              {[80, 60, 70].map((w, j) => (
                <div key={j} className="h-3.5 rounded bg-muted" style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
        <div className="space-y-6">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-xl border border-border bg-background p-5 space-y-3">
              <div className="h-4 w-28 rounded bg-muted" />
              {[90, 75, 85, 65, 80].map((w, j) => (
                <div key={j} className="h-3.5 rounded bg-muted" style={{ width: `${w}%` }} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [noteModalOpen, setNoteModalOpen] = useState(false)

  const { data: client, isLoading, isError } = useClientDetail(id)

  if (isLoading) return <SkeletonDetail />

  if (isError || !client) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <User className="mb-3 h-12 w-12 text-muted-foreground" />
        <p className="text-base font-semibold text-foreground">Client not found</p>
        <p className="mt-1 text-sm text-muted-foreground">
          The client you're looking for doesn't exist or has been removed.
        </p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/clients')}>
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Button>
      </div>
    )
  }

  const clientInitials = toInitials(client.name)

  const policyIconColor =
    client.planType === 'Medical'  ? { bg: 'bg-blue-50 dark:bg-blue-950/50',    icon: 'text-blue-600 dark:text-blue-400' }   :
    client.planType === 'Life'     ? { bg: 'bg-violet-50 dark:bg-violet-950/50', icon: 'text-violet-600 dark:text-violet-400' } :
    client.planType === 'Motor'    ? { bg: 'bg-amber-50 dark:bg-amber-950/50',   icon: 'text-amber-600 dark:text-amber-400' }  :
                                     { bg: 'bg-emerald-50 dark:bg-emerald-950/50', icon: 'text-emerald-600 dark:text-emerald-400' }

  return (
    <>
      <div className="space-y-6">

        {/* ── Header ──────────────────────────────────────────────── */}
        <div className="flex items-start gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/clients')}
            className="mt-0.5 flex-shrink-0"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="flex flex-1 min-w-0 items-start gap-3">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-base font-semibold text-primary">
              {clientInitials}
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-foreground sm:text-2xl">
                {client.name}
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                {client.id} · {client.policyNumber}
              </p>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <PlanTypeBadge planType={client.planType} />
                <StatusBadge status={client.status} />
              </div>
            </div>
          </div>

          <Button variant="outline" size="sm" className="mt-0.5 flex-shrink-0">
            <Pencil className="h-4 w-4" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
        </div>

        {/* ── Body grid ───────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* ── Left column (2 / 3 wide) ─────────────────────────── */}
          <div className="space-y-6 lg:col-span-2">

            {/* 1 & 2 – Profile + Contact side by side */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">

              {/* Section 1: Client Profile */}
              <SectionCard title="Client Profile">
                <InfoRow icon={BadgeCheck}  label="Client ID"     value={client.id} />
                <InfoRow icon={Calendar}    label="Member Since"  value={fmtDate(client.joinedDate)} />
                <InfoRow icon={MapPin}      label="Region"        value={client.region} />
                <InfoRow icon={Building2}   label="Agent"         value={client.assignedAgent} />
              </SectionCard>

              {/* Section 2: Contact Details */}
              <SectionCard title="Contact Details">
                <InfoRow icon={User}  label="Full Name" value={client.name} />
                <InfoRow icon={Mail}  label="Email"     value={client.email} />
                <InfoRow icon={Phone} label="Phone"     value={client.phone} />
                <InfoRow icon={MapPin} label="Region"   value={client.region} />
              </SectionCard>
            </div>

            {/* Section 4: Claims Summary */}
            <SectionCard title="Claims Summary" noPadding>
              {client.claims.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <AlertCircle className="mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No claims on record</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border text-left">
                        {['Claim No.', 'Type', 'Amount', 'Status', 'Filed'].map((h) => (
                          <th key={h} className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {client.claims.map((claim, i) => (
                        <tr
                          key={claim.id}
                          className={cn('border-b border-border last:border-0', i % 2 !== 0 && 'bg-muted/20')}
                        >
                          <td className="px-5 py-3 font-mono text-xs text-muted-foreground">{claim.claimNumber}</td>
                          <td className="px-5 py-3 text-foreground">{claim.type}</td>
                          <td className="px-5 py-3 font-medium text-foreground">{formatKSh(claim.amount)}</td>
                          <td className="px-5 py-3"><ClaimStatusBadge status={claim.status} /></td>
                          <td className="px-5 py-3 text-muted-foreground whitespace-nowrap">{fmtShort(claim.dateFiled)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </SectionCard>

            {/* Section 5: Notes */}
            <SectionCard
              title="Notes"
              action={
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setNoteModalOpen(true)}
                  className="h-7 gap-1 px-2.5 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add Note
                </Button>
              }
            >
              {client.notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <StickyNote className="mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No notes yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Add a note to track important details about this client.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {client.notes.map((note) => (
                    <div key={note.id} className="rounded-lg border border-border bg-muted/30 px-4 py-3">
                      <p className="text-sm leading-relaxed text-foreground">{note.content}</p>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="text-xs font-medium text-muted-foreground">{note.author}</span>
                        <span className="text-xs text-muted-foreground/50">·</span>
                        <span className="text-xs text-muted-foreground">{relativeTime(note.createdAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

            {/* Section 6: Activity Timeline */}
            <SectionCard title="Activity Timeline">
              <div className="relative">
                <div className="absolute bottom-4 left-4 top-4 w-px bg-border" />
                <div className="space-y-5">
                  {client.timeline.map((event) => {
                    const cfg = TIMELINE_CONFIG[event.type] ?? TIMELINE_CONFIG.call
                    const { Icon, bg, color } = cfg
                    return (
                      <div key={event.id} className="relative flex items-start gap-4">
                        <div className={cn('relative z-10 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full', bg)}>
                          <Icon className={cn('h-4 w-4', color)} />
                        </div>
                        <div className="flex-1 min-w-0 pt-1">
                          <p className="text-sm font-semibold text-foreground">{event.label}</p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{event.description}</p>
                          <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-muted-foreground">{fmtShort(event.timestamp)}</span>
                            {event.actor && event.actor !== 'System' && (
                              <>
                                <span className="text-xs text-muted-foreground/40">·</span>
                                <span className="text-xs text-muted-foreground">{event.actor}</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </SectionCard>
          </div>

          {/* ── Right column (1 / 3 wide) ────────────────────────── */}
          <div className="space-y-6">

            {/* Section 3: Policy Details */}
            <SectionCard title="Policy Details">
              <div className="mb-4 flex items-center gap-3">
                <div className={cn('flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full', policyIconColor.bg)}>
                  <ShieldCheck className={cn('h-5 w-5', policyIconColor.icon)} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{client.planType} Insurance</p>
                  <p className="font-mono text-xs text-muted-foreground">{client.policyNumber}</p>
                </div>
              </div>

              <InfoRow icon={BadgeCheck}  label="Status"          value={<StatusBadge status={client.status} />} />
              <InfoRow icon={Calendar}    label="Renewal Date"    value={fmtDate(client.renewalDate)} />
              <InfoRow icon={ShieldCheck} label="Annual Premium"  value={`KSh ${client.premium.toLocaleString()}`} />
              <InfoRow icon={Building2}   label="Agent"           value={client.assignedAgent} />
              <InfoRow icon={Calendar}    label="Member Since"    value={fmtDate(client.joinedDate)} />
            </SectionCard>

            {/* Section 7: Renewal History */}
            <SectionCard title="Renewal History">
              {client.renewalHistory.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="mb-2 h-8 w-8 text-muted-foreground/40" />
                  <p className="text-sm text-muted-foreground">No renewals yet</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    First renewal will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {client.renewalHistory.map((r) => (
                    <div key={r.id} className="rounded-lg border border-border p-3.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold text-foreground">{fmtShort(r.renewedOn)}</p>
                        <span className="inline-flex rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-200 dark:bg-green-950/40 dark:text-green-400 dark:ring-green-800">
                          {r.status}
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-foreground">
                        Premium:{' '}
                        <span className="font-medium text-foreground">{formatKSh(r.premium)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Valid: {fmtShort(r.renewedOn)} – {fmtShort(r.newExpiry)}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </SectionCard>

          </div>
        </div>
      </div>

      {/* Add Note Modal */}
      <AddNoteModal
        clientId={client.id}
        open={noteModalOpen}
        onClose={() => setNoteModalOpen(false)}
      />
    </>
  )
}
