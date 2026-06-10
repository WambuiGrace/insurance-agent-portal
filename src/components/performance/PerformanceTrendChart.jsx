import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ReferenceLine, ResponsiveContainer,
} from 'recharts'

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs space-y-1">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

function CustomLegend({ payload }) {
  return (
    <div className="flex flex-wrap justify-center gap-4 pb-2">
      {payload.map((entry) => (
        <div key={entry.value} className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <div
            className="h-0.5 w-5 flex-shrink-0"
            style={{
              backgroundColor: entry.color,
              borderTop: entry.payload?.strokeDasharray ? `2px dashed ${entry.color}` : undefined,
              height: entry.payload?.strokeDasharray ? 0 : undefined,
            }}
          />
          {entry.value}
        </div>
      ))}
    </div>
  )
}

export default function PerformanceTrendChart({ data }) {
  const latest = data[data.length - 1]
  return (
    <>
      <div className="mb-4 flex items-end gap-3">
        <p className="text-2xl font-bold text-foreground">{latest.you}</p>
        <p className="mb-0.5 text-xs text-muted-foreground">performance score this month</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[60, 100]}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={28}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend content={<CustomLegend />} />
          <Line
            type="monotone"
            dataKey="you"
            name="You"
            stroke="#3b82f6"
            strokeWidth={2.5}
            dot={{ r: 3, fill: '#3b82f6' }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            name="Target"
            stroke="hsl(var(--muted-foreground))"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            dot={false}
          />
          <Line
            type="monotone"
            dataKey="teamAvg"
            name="Team Avg"
            stroke="#f59e0b"
            strokeWidth={1.5}
            strokeDasharray="5 4"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  )
}
