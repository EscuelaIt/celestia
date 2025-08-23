import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/middlewares/middleware'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/core/middlewares/empty.middleware'

export class UseCaseService {
  constructor(private readonly middlewares: Middleware[]) {}

  execute<In, Out>(useCase: UseCase<In, Out>, params?: In): Promise<Out> {
    let next = new UseCaseHandler(useCase, new EmptyMiddleware())

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const currentMiddleware = this.middlewares[i]!
      const previous = next
      next = new UseCaseHandler(previous.useCase, currentMiddleware)
    }

    return next.handle(params) as Promise<Out>
  }
}
