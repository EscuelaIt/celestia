import type { Id } from '@/shared-core/types/id'

export interface Findable<Result> {
  findOne(id: Id): Promise<Result>
}
