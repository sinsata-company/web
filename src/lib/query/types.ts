import { UseQueryOptions } from '@tanstack/react-query'

export type QueryConfig<TData, TError> = Omit<
  UseQueryOptions<TData, TError>,
  'queryKey' | 'queryFn'
> 