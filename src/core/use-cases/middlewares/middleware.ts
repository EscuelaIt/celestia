import type { UseCase } from '../use-case'
import type { UseCaseOptions } from '@/core/use-cases/use-case-options'

export interface Middleware {
  intercept(params: unknown, next: UseCase, options: UseCaseOptions): Promise<unknown>
}
