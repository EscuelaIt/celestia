import type { UseCase } from '../use-case'
import type { Middleware } from './middleware'
import type { InjectionToken } from '@/core/container/injection-token'

export class ErrorMiddleware implements Middleware {
  static readonly id: InjectionToken = Symbol('ErrorMiddleware')

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
