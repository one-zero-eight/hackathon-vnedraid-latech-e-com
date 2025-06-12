import { useQuery } from '@tanstack/react-query'
import { fetchCategories } from '../api/analytics'

export function useCategories(userId: string) {
  return useQuery({
    queryKey: ['categories', userId],
    queryFn: () => fetchCategories(userId),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000
  })
}
