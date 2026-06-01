import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { formatKSh } from '@/utils/formatters'
import ChartCard from './ChartCard'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{formatKSh(entry.value)}</span>
        </p>
      ))}
    </div>
  )
}

function shortKSh(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}K`
  return value
}

export default function RevenueTrendChart({ data, loading }) {
  return (
    <ChartCard
      title="Revenue Trend"
      subtitle="Monthly revenue and commission — KSh"
      loading={loading}
      height={240}
    >
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={data} margin={{ top: 4, right: 4, left: -16, bottom: 0 }} barSize={8}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={shortKSh}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', opacity: 0.5 }} />
          <Legend
            iconType="square"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          <Bar dataKey="revenue" name="Revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="commission" name="Commission" fill="#10b981" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
