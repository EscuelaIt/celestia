import type { UseCase } from '@/core/use-cases/use-case'

export interface Middleware {
  next(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown>
}
