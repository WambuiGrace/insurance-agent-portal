import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-lg border border-border bg-background px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold text-foreground">{payload[0].name}</p>
      <p className="text-muted-foreground">{payload[0].value}% of portfolio</p>
    </div>
  )
}

export default function PolicyCategoriesChart({ data }) {
  return (
    <>
      <ResponsiveContainer width="100%" height={180}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={52}
            outerRadius={82}
            paddingAngle={3}
            dataKey="value"
            label={({ name, value }) => `${value}%`}
            labelLine={false}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1.5">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 flex-shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="truncate text-xs text-muted-foreground">{item.name}</span>
            <span className="ml-auto text-xs font-semibold text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </>
  )
}
