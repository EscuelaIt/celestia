import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'

export class EmptyMiddleware implements Middleware {
  intercept(params: unknown, next: UseCase): Promise<unknown> {
    return next.execute(params)
  }
}
