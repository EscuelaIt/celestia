import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'
import type { InjectionToken } from '@/core/container/injection-token'

export class EmptyMiddleware implements Middleware {
  static readonly id: InjectionToken = Symbol('EmptyMiddleware')

  intercept(params: unknown, next: UseCase): Promise<unknown> {
    return next.handle(params)
  }
}
