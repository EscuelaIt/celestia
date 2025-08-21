import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'

export class UseCaseHandler implements UseCase {
  constructor(
    readonly useCase: UseCase,
    private readonly middlewares: Middleware,
  ) {}

  execute(input?: unknown): Promise<unknown> {
    return this.middlewares.intercept(input, this.useCase)
  }

  static create({ middleware, next }: { middleware: Middleware; next: UseCase }) {
    return new UseCaseHandler(next, middleware)
  }
}
