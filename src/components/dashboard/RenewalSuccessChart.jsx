import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import ChartCard from './ChartCard'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}:{' '}
          <span className="font-bold">{entry.value}%</span>
        </p>
      ))}
    </div>
  )
}

export default function RenewalSuccessChart({ data, loading }) {
  return (
    <ChartCard
      title="Renewal Success Rate"
      subtitle="Monthly renewal rate vs 90% target"
      loading={loading}
      height={240}
    >
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[70, 100]}
            tickFormatter={(v) => `${v}%`}
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '12px' }}
          />
          {/* Target reference line at 90% */}
          <ReferenceLine
            y={90}
            stroke="#f59e0b"
            strokeDasharray="5 4"
            strokeWidth={1.5}
            label={{
              value: 'Target 90%',
              position: 'insideTopRight',
              fontSize: 10,
              fill: '#f59e0b',
            }}
          />
          <Line
            type="monotone"
            dataKey="rate"
            name="Renewal Rate"
            stroke="#10b981"
            strokeWidth={2.5}
            dot={{ r: 3.5, fill: '#10b981', strokeWidth: 0 }}
            activeDot={{ r: 5.5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
