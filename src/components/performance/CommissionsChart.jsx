import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine,
} from 'recharts'

const avg = (data) => Math.round(data.reduce((s, d) => s + d.amount, 0) / data.length)

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      <p className="text-violet-600 dark:text-violet-400">
        KSh {payload[0].value.toLocaleString()}
      </p>
    </div>
  )
}

export default function CommissionsChart({ data }) {
  const average = avg(data)
  const last = data[data.length - 1]

  return (
    <>
      <div className="mb-4 flex items-end gap-3">
        <p className="text-2xl font-bold text-foreground">
          KSh {last.amount.toLocaleString()}
        </p>
        <p className="mb-0.5 text-xs text-muted-foreground">this month</p>
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={16} margin={{ top: 0, right: 4, bottom: 0, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={(v) => `${(v / 1000).toFixed(0)}K`}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--muted))', radius: 4 }} />
          <ReferenceLine
            y={average}
            stroke="hsl(var(--muted-foreground))"
            strokeDasharray="4 4"
            label={{ value: 'Avg', position: 'insideTopRight', fill: 'hsl(var(--muted-foreground))', fontSize: 10 }}
          />
          <Bar
            dataKey="amount"
            fill="#8b5cf6"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  )
}
