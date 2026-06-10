import { useQuery } from '@tanstack/react-query'
import { performanceService } from '@/services/mock/performanceService'

export function usePerformanceMetrics() {
  return useQuery({
    queryKey: ['performance', 'metrics'],
    queryFn: () => performanceService.getMetrics(),
    staleTime: 1000 * 60 * 5,
  })
}

export function usePerformanceCharts() {
  return useQuery({
    queryKey: ['performance', 'charts'],
    queryFn: () => performanceService.getChartData(),
    staleTime: 1000 * 60 * 5,
  })
}

export function useAgentLeaderboard() {
  return useQuery({
    queryKey: ['performance', 'leaderboard'],
    queryFn: () => performanceService.getLeaderboard(),
    staleTime: 1000 * 60 * 5,
  })
}
