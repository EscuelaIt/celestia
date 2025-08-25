import type { Id } from '@/core/types/id'

export interface Findable<Result> {
  findOne(id: Id): Promise<Result>
}
