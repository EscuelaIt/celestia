import type { Id } from '@/core/types/id'

export interface UpdatableOne<Params> {
  update(id: Id, params: Params): Promise<void>
}
