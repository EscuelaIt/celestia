import type { Id } from '@/core/types/id'

export interface Deletable<Result = void> {
  delete(id: Id): Promise<Result>
}
