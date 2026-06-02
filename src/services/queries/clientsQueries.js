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

export function useClientDetail(id) {
  return useQuery({
    queryKey: ['clients', 'full-detail', id],
    queryFn: () => clientsService.getClientDetail(id),
    enabled: !!id,
  })
}

export function useAddNote() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ clientId, content, author }) =>
      clientsService.addNote(clientId, { content, author }),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['clients', 'full-detail', variables.clientId] })
    },
  })
}

export function useCreateClient() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data) => clientsService.createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] })
    },
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
