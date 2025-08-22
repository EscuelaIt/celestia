import type { UseCase } from '../use-case'
import type { Middleware } from './middleware'

export class ErrorMiddleware implements Middleware {
  async intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    try {
      const result = await useCase.handle(params)
      return result
    } catch (error) {
      alert(error)
      throw error
    }
  }
}
