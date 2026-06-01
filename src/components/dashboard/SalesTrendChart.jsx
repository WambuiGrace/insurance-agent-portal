import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import ChartCard from './ChartCard'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <p className="mb-1.5 text-xs font-semibold text-muted-foreground">{label}</p>
      {payload.map((entry) => (
        <p key={entry.dataKey} className="text-sm font-medium" style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{entry.value}</span>
        </p>
      ))}
    </div>
  )
}

export default function SalesTrendChart({ data, loading }) {
  return (
    <ChartCard
      title="Monthly Sales Trend"
      subtitle="Policies sold vs target — Jan to Dec 2024"
      loading={loading}
      height={240}
    >
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="policiesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="targetGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: 'hsl(var(--muted-foreground))' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
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
          <Area
            type="monotone"
            dataKey="policies"
            name="Policies Sold"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#policiesGrad)"
            dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
            activeDot={{ r: 5 }}
          />
          <Area
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="#8b5cf6"
            strokeWidth={2}
            strokeDasharray="5 4"
            fill="url(#targetGrad)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
