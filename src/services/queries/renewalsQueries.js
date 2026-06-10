import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { renewalsService } from '@/services/mock/renewalsService'

export function useRenewalsBoard() {
  return useQuery({
    queryKey: ['renewals', 'board'],
    queryFn: () => renewalsService.getBoard(),
    staleTime: 1000 * 60,
  })
}

export function useMoveCard() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ cardId, newStatus }) =>
      renewalsService.moveCard(cardId, newStatus),
    onMutate: async ({ cardId, newStatus }) => {
      // Optimistic update — swap the card status in cache immediately
      await queryClient.cancelQueries({ queryKey: ['renewals', 'board'] })
      const previous = queryClient.getQueryData(['renewals', 'board'])
      queryClient.setQueryData(['renewals', 'board'], (old) =>
        old
          ? old.map((c) => (c.id === cardId ? { ...c, status: newStatus } : c))
          : old
      )
      return { previous }
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) {
        queryClient.setQueryData(['renewals', 'board'], ctx.previous)
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['renewals', 'board'] })
    },
  })
}
