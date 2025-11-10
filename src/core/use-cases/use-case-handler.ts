import type { UseCase, UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'

export class UseCaseHandler implements UseCase {
  constructor(
    readonly useCase: UseCase,
    private readonly middlewares: Middleware,
  ) {}

  handle<T extends UseCase>(input?: UseCaseParams<T>): Promise<UseCaseReturn<T>> {
    return this.middlewares.intercept(input, this.useCase) as Promise<UseCaseReturn<T>>
  }

  static create({ middleware, next }: { middleware: Middleware; next: UseCase }) {
    return new UseCaseHandler(next, middleware)
  }
}
