import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserPlus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ConfirmDialog from '@/components/ui/ConfirmDialog'
import ClientsFilters from '@/components/clients/ClientsFilters'
import ClientsTable from '@/components/clients/ClientsTable'
import ClientsPagination from '@/components/clients/ClientsPagination'
import { useClients, useArchiveClient } from '@/services/queries/clientsQueries'
import { useDebounce } from '@/hooks/useDebounce'

const PER_PAGE = 10

export default function ClientsPage() {
  const navigate = useNavigate()

  // Filter / search state
  const [search, setSearch]     = useState('')
  const [status, setStatus]     = useState('')
  const [planType, setPlanType] = useState('')

  // Sort state
  const [sortField, setSortField] = useState('name')
  const [sortOrder, setSortOrder] = useState('asc')

  // Pagination
  const [page, setPage] = useState(1)

  // Archive confirmation
  const [archiveTarget, setArchiveTarget] = useState(null)

  const debouncedSearch = useDebounce(search, 350)

  // Reset to page 1 whenever filters change
  const handleSearch = (v) => { setSearch(v); setPage(1) }
  const handleStatus = (v) => { setStatus(v); setPage(1) }
  const handlePlanType = (v) => { setPlanType(v); setPage(1) }
  const handleSort = (field, order) => { setSortField(field); setSortOrder(order); setPage(1) }

  const { data, isLoading, isFetching } = useClients({
    search: debouncedSearch,
    status,
    planType,
    sortField,
    sortOrder,
    page,
    perPage: PER_PAGE,
  })

  const { mutate: archiveClient, isPending: archiving } = useArchiveClient()

  const handleArchiveConfirm = () => {
    if (!archiveTarget) return
    archiveClient(archiveTarget.id, {
      onSuccess: () => setArchiveTarget(null),
    })
  }

  const hasFilters = !!(debouncedSearch || status || planType)

  return (
    <>
      <div className="space-y-5">
        {/* ── Page header ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Clients</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Manage your client portfolio and policy details
            </p>
          </div>
          <Button
            onClick={() => navigate('/clients/new')}
            className="bg-blue-950 hover:bg-blue-900 sm:w-auto w-full"
          >
            <UserPlus className="h-4 w-4" />
            Add Client
          </Button>
        </div>

        {/* ── Filters bar ───────────────────────────────────────── */}
        <ClientsFilters
          search={search}
          onSearchChange={handleSearch}
          status={status}
          onStatusChange={handleStatus}
          planType={planType}
          onPlanTypeChange={handlePlanType}
          total={data?.total ?? 0}
          loading={isLoading}
        />

        {/* ── Table ─────────────────────────────────────────────── */}
        <ClientsTable
          clients={data?.data}
          loading={isLoading || isFetching}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onArchive={setArchiveTarget}
          hasFilters={hasFilters}
        />

        {/* ── Pagination ────────────────────────────────────────── */}
        {data && (
          <ClientsPagination
            page={data.page}
            totalPages={data.totalPages}
            perPage={PER_PAGE}
            total={data.total}
            onPageChange={setPage}
          />
        )}
      </div>

      {/* ── Archive confirmation dialog ──────────────────────────── */}
      <ConfirmDialog
        open={!!archiveTarget}
        title="Archive client?"
        message={`${archiveTarget?.name} and their policy (${archiveTarget?.policyNumber}) will be archived. You can restore them later from the archive.`}
        confirmLabel="Archive"
        loading={archiving}
        onConfirm={handleArchiveConfirm}
        onCancel={() => setArchiveTarget(null)}
      />
    </>
  )
}
