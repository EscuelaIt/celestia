import type { Middleware } from '@/core/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'

export class EmptyMiddleware implements Middleware {
  next(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown> {
    return useCase.handle(params)
  }
}
