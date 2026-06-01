import { ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function PageButton({ page, current, onClick }) {
  return (
    <button
      onClick={() => onClick(page)}
      className={cn(
        'flex h-8 min-w-[32px] items-center justify-center rounded-md px-2.5 text-sm font-medium transition-colors',
        page === current
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:bg-accent hover:text-foreground'
      )}
    >
      {page}
    </button>
  )
}

function buildPageRange(current, total) {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)
  if (current <= 4) return [1, 2, 3, 4, 5, '…', total]
  if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total]
  return [1, '…', current - 1, current, current + 1, '…', total]
}

export default function ClientsPagination({ page, totalPages, perPage, total, onPageChange }) {
  if (totalPages <= 1) return null

  const start = (page - 1) * perPage + 1
  const end = Math.min(page * perPage, total)
  const pages = buildPageRange(page, totalPages)

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
      {/* Range label */}
      <p className="text-xs text-muted-foreground">
        Showing <span className="font-medium text-foreground">{start}–{end}</span> of{' '}
        <span className="font-medium text-foreground">{total}</span> clients
      </p>

      {/* Page buttons */}
      <div className="flex items-center gap-1">
        {/* Previous */}
        <button
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Page numbers */}
        {pages.map((p, i) =>
          p === '…' ? (
            <span key={`ellipsis-${i}`} className="flex h-8 w-8 items-center justify-center text-xs text-muted-foreground">
              …
            </span>
          ) : (
            <PageButton key={p} page={p} current={page} onClick={onPageChange} />
          )
        )}

        {/* Next */}
        <button
          onClick={() => onPageChange(page + 1)}
          disabled={page === totalPages}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:opacity-40"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
