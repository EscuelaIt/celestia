import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'

export class UseCaseService {
  static readonly ID = 'UseCaseService'

  constructor(private readonly middlewares: Middleware[]) {}

  execute<In, Out>(useCase: UseCase<In, Out>, params?: In): Promise<Out> {
    let next = new UseCaseHandler(useCase, new EmptyMiddleware())

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      next = new UseCaseHandler(next, this.middlewares[i]!)
    }

    return next.handle(params) as Promise<Out>
  }
}
