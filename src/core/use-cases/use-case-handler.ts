import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/middlewares/middleware'

export class UseCaseHandler implements UseCase<unknown, unknown> {
  constructor(
    readonly useCase: UseCase<unknown, unknown>,
    private readonly middleware: Middleware,
  ) {}

  async handle(params: unknown): Promise<unknown> {
    return this.middleware.intercept(params, this.useCase)
  }
}
