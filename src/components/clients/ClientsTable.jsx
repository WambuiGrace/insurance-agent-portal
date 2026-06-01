import { useNavigate } from 'react-router-dom'
import { ChevronUp, ChevronDown, ChevronsUpDown, Users } from 'lucide-react'
import StatusBadge from './StatusBadge'
import PlanTypeBadge from './PlanTypeBadge'
import ClientActionsMenu from './ClientActionsMenu'
import { cn } from '@/lib/utils'

const COLUMNS = [
  { key: 'name',          label: 'Client Name',    sortable: true, className: 'min-w-[180px]' },
  { key: 'policyNumber',  label: 'Policy No.',     sortable: true, className: 'min-w-[130px]' },
  { key: 'planType',      label: 'Plan Type',      sortable: true, className: 'min-w-[110px]' },
  { key: 'status',        label: 'Status',         sortable: true, className: 'min-w-[140px]' },
  { key: 'renewalDate',   label: 'Renewal Date',   sortable: true, className: 'min-w-[130px]' },
  { key: 'assignedAgent', label: 'Assigned Agent', sortable: true, className: 'min-w-[140px]' },
  { key: 'actions',       label: '',               sortable: false, className: 'w-12' },
]

function SortIcon({ column, sortField, sortOrder }) {
  if (sortField !== column) return <ChevronsUpDown className="h-3.5 w-3.5 text-muted-foreground/40" />
  return sortOrder === 'asc'
    ? <ChevronUp className="h-3.5 w-3.5 text-blue-600" />
    : <ChevronDown className="h-3.5 w-3.5 text-blue-600" />
}

function SkeletonRow() {
  return (
    <tr className="border-b border-border">
      {COLUMNS.map((col) => (
        <td key={col.key} className="px-4 py-3">
          <div className="h-4 animate-pulse rounded bg-muted" />
        </td>
      ))}
    </tr>
  )
}

function EmptyState({ hasFilters }) {
  return (
    <tr>
      <td colSpan={COLUMNS.length}>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
            <Users className="h-7 w-7 text-muted-foreground" />
          </div>
          <p className="text-sm font-medium text-foreground">No clients found</p>
          <p className="mt-1 text-xs text-muted-foreground">
            {hasFilters
              ? 'Try adjusting your search or filters.'
              : 'Add your first client to get started.'}
          </p>
        </div>
      </td>
    </tr>
  )
}

function getInitials(name) {
  return name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() ?? '?'
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-KE', {
    day: '2-digit', month: 'short', year: 'numeric',
  })
}

function RenewalDateCell({ date, status }) {
  const isPast = new Date(date) < new Date()
  const isSoon = status === 'Expiring Soon'
  return (
    <span className={cn(
      'text-sm',
      isPast || status === 'Expired' ? 'text-red-600 dark:text-red-400' :
      isSoon ? 'text-amber-600 dark:text-amber-400' :
      'text-foreground'
    )}>
      {formatDate(date)}
    </span>
  )
}

export default function ClientsTable({ clients, loading, sortField, sortOrder, onSort, onArchive, hasFilters }) {
  const navigate = useNavigate()

  const handleSort = (key) => {
    if (!COLUMNS.find((c) => c.key === key)?.sortable) return
    if (sortField === key) {
      onSort(key, sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      onSort(key, 'asc')
    }
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-background shadow-sm">
      <table className="w-full border-collapse text-sm">
        {/* Header */}
        <thead>
          <tr className="border-b border-border bg-muted/40">
            {COLUMNS.map((col) => (
              <th
                key={col.key}
                className={cn(
                  'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-muted-foreground',
                  col.sortable && 'cursor-pointer select-none hover:text-foreground',
                  col.className
                )}
                onClick={() => col.sortable && handleSort(col.key)}
              >
                {col.label && (
                  <span className="flex items-center gap-1.5">
                    {col.label}
                    {col.sortable && (
                      <SortIcon column={col.key} sortField={sortField} sortOrder={sortOrder} />
                    )}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} />)
          ) : !clients?.length ? (
            <EmptyState hasFilters={hasFilters} />
          ) : (
            clients.map((client) => (
              <tr
                key={client.id}
                className="group border-b border-border transition-colors last:border-0 hover:bg-muted/30"
              >
                {/* Client Name */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => navigate(`/clients/${client.id}`)}
                    className="flex items-center gap-3 text-left"
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                      {getInitials(client.name)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {client.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{client.email}</p>
                    </div>
                  </button>
                </td>

                {/* Policy Number */}
                <td className="px-4 py-3">
                  <span className="font-mono text-xs font-medium text-foreground">{client.policyNumber}</span>
                </td>

                {/* Plan Type */}
                <td className="px-4 py-3">
                  <PlanTypeBadge planType={client.planType} />
                </td>

                {/* Status */}
                <td className="px-4 py-3">
                  <StatusBadge status={client.status} />
                </td>

                {/* Renewal Date */}
                <td className="px-4 py-3">
                  <RenewalDateCell date={client.renewalDate} status={client.status} />
                </td>

                {/* Assigned Agent */}
                <td className="px-4 py-3">
                  <span className="text-sm text-foreground">{client.assignedAgent}</span>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <ClientActionsMenu client={client} onArchive={onArchive} />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
