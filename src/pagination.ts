export interface PaginationInput {
  first: number
  offset?: number
}

export function paginate<T> (input: T[], paginationOptions?: PaginationInput): T[] {
  const first = paginationOptions?.first ?? 10
  const offset = paginationOptions?.offset ?? 0

  return input.slice(offset, first + offset)
}
