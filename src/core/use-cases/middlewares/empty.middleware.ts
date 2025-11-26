import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export class EmptyMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('EmptyMiddleware')

  intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    return useCase.handle(params)
  }
}
