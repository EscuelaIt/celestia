import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'

export class UseCaseHandler implements UseCase {
  constructor(
    readonly useCase: UseCase,
    private readonly middleware: Middleware,
  ) {}

  async handle(params: unknown): Promise<unknown> {
    return this.middleware.intercept(params, this.useCase)
  }
}
