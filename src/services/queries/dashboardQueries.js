import { useQuery } from '@tanstack/react-query'
import { dashboardService } from '@/services/mock/dashboardService'

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: dashboardService.getMetrics,
    staleTime: 1000 * 60 * 2,
  })
}

export function useDashboardCharts() {
  return useQuery({
    queryKey: ['dashboard', 'charts'],
    queryFn: dashboardService.getChartData,
    staleTime: 1000 * 60 * 5,
  })
}

export function useDashboardActivities() {
  return useQuery({
    queryKey: ['dashboard', 'activities'],
    queryFn: dashboardService.getRecentActivities,
    staleTime: 1000 * 60 * 1,
  })
}
