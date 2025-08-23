import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'

export class EmptyMiddleware implements Middleware {
  intercept(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown> {
    return useCase.handle(params)
  }
}
