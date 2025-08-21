import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'

export class UseCaseService {
  constructor(private readonly middlewares: Middleware[]) {}

  async execute<In, Out>(useCase: UseCase<In, Out>, params?: In): Promise<Out> {
    let next = UseCaseHandler.create({ middleware: new EmptyMiddleware(), next: useCase })
    for (let i = this.middlewares.length; i >= 0; i--) {
      const currentMiddleware = this.middlewares[i]!
      const previous = next
      next = UseCaseHandler.create({ middleware: currentMiddleware, next: previous })
    }

    return next.execute(params) as Promise<Out>
  }
}
