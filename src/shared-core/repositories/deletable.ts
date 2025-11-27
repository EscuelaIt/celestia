import type { Id } from '@/shared-core/types/id'

export interface Deletable<Result = void> {
  delete(id: Id): Promise<Result>
}
