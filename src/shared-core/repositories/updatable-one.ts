import type { Id } from '@/shared-core/types/id'

export interface UpdatableOne<Params> {
  update(id: Id, params: Params): Promise<void>
}
