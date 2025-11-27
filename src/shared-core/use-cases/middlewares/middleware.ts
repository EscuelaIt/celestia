import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export interface Middleware {
  intercept(params: unknown, useCase: UseCase, options: UseCaseOptions): Promise<unknown>
}
