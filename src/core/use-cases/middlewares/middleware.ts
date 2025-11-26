import type { UseCase } from '@/core/use-cases/use-case'

export interface Middleware {
  intercept(params: unknown, useCase: UseCase): Promise<unknown>
}
