export function formatKSh(value) {
  if (value >= 1_000_000) return `KSh ${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `KSh ${(value / 1_000).toFixed(0)}K`
  return `KSh ${value.toLocaleString()}`
}

export function formatNumber(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`
  return value.toLocaleString()
}

export function formatPercent(value) {
  return `${value}%`
}
