import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'

export class UseCaseHandler implements UseCase {
  constructor(
    readonly useCase: UseCase,
    private readonly middleware: Middleware,
  ) {}

  async handle(params: unknown): Promise<unknown> {
    return this.middleware.intercept(params, this.useCase)
  }
}
