import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '../use-case'

export class ErrorMiddleware implements Middleware {
  async intercept(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown> {
    try {
      return await useCase.handle(params)
    } catch (error) {
      alert('An error occurred. Please try again.')
      throw error
    }
  }
}
