import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query'
import { clientsService } from '@/services/mock/clientsService'

export function useClients(params) {
  return useQuery({
    queryKey: ['clients', 'list', params],
    queryFn: () => clientsService.getClients(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
  })
}

export function useClientById(id) {
  return useQuery({
    queryKey: ['clients', 'detail', id],
    queryFn: () => clientsService.getClientById(id),
    enabled: !!id,
  })
}

export function useArchiveClient() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id) => clientsService.archiveClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
  })
}
