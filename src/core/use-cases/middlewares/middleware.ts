import type { UseCase } from '../use-case'

export interface Middleware {
  intercept(params: unknown, next: UseCase): Promise<unknown>
}
