import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ChartCard from './ChartCard'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const { name, value, payload: data } = payload[0]
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg">
      <div className="flex items-center gap-2">
        <span
          className="inline-block h-2.5 w-2.5 rounded-full"
          style={{ background: data.color }}
        />
        <span className="text-sm font-semibold text-foreground">{name}</span>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Share: <span className="font-bold text-foreground">{value}%</span>
      </p>
    </div>
  )
}

function renderCustomLabel({ cx, cy, midAngle, innerRadius, outerRadius, percent }) {
  const RADIAN = Math.PI / 180
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)
  if (percent < 0.08) return null
  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default function PolicyDistributionChart({ data, loading }) {
  return (
    <ChartCard
      title="Policy Distribution"
      subtitle="Breakdown by plan type"
      loading={loading}
      height={240}
    >
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="46%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
            dataKey="value"
            labelLine={false}
            label={renderCustomLabel}
          >
            {data?.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  )
}
