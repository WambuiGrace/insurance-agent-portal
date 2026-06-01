import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useClientById } from '@/services/queries/clientsQueries'
import StatusBadge from '@/components/clients/StatusBadge'
import PlanTypeBadge from '@/components/clients/PlanTypeBadge'

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-center border-b border-border last:border-0">
      <span className="w-40 flex-shrink-0 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <span className="text-sm text-foreground">{value ?? '—'}</span>
    </div>
  )
}

function SkeletonDetail() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-48 rounded bg-muted" />
      <div className="h-4 w-64 rounded bg-muted" />
      <div className="mt-6 rounded-xl border border-border bg-background p-6 space-y-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-4 rounded bg-muted" style={{ width: `${60 + i * 5}%` }} />
        ))}
      </div>
    </div>
  )
}

export default function ClientDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: client, isLoading, isError } = useClientById(id)

  if (isLoading) return <SkeletonDetail />

  if (isError || !client) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <User className="mb-3 h-12 w-12 text-muted-foreground" />
        <p className="text-base font-semibold text-foreground">Client not found</p>
        <p className="mt-1 text-sm text-muted-foreground">The client you're looking for doesn't exist.</p>
        <Button variant="outline" className="mt-4" onClick={() => navigate('/clients')}>
          <ArrowLeft className="h-4 w-4" /> Back to clients
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="outline" size="sm" onClick={() => navigate('/clients')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{client.name}</h1>
          <p className="text-sm text-muted-foreground">{client.policyNumber}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <PlanTypeBadge planType={client.planType} />
          <StatusBadge status={client.status} />
        </div>
      </div>

      {/* Profile card */}
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Client Profile</h2>
        <DetailRow label="Full Name"      value={client.name} />
        <DetailRow label="Email"          value={client.email} />
        <DetailRow label="Phone"          value={client.phone} />
        <DetailRow label="Region"         value={client.region} />
        <DetailRow label="Joined"         value={new Date(client.joinedDate).toLocaleDateString('en-KE', { day: '2-digit', month: 'long', year: 'numeric' })} />
      </div>

      {/* Policy card */}
      <div className="rounded-xl border border-border bg-background p-6 shadow-sm">
        <h2 className="mb-4 text-sm font-semibold text-foreground">Policy Details</h2>
        <DetailRow label="Policy No."     value={client.policyNumber} />
        <DetailRow label="Plan Type"      value={client.planType} />
        <DetailRow label="Status"         value={<StatusBadge status={client.status} />} />
        <DetailRow label="Annual Premium" value={`KSh ${client.premium.toLocaleString()}`} />
        <DetailRow label="Renewal Date"   value={new Date(client.renewalDate).toLocaleDateString('en-KE', { day: '2-digit', month: 'long', year: 'numeric' })} />
        <DetailRow label="Assigned Agent" value={client.assignedAgent} />
      </div>

      {/* Placeholder for future sections */}
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-background py-12 text-center">
        <p className="text-sm font-medium text-foreground">More sections coming soon</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Claims, Notes, Activity Timeline, and Renewal History will be built in a later module.
        </p>
      </div>
    </div>
  )
}
