import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export class UseCaseHandler implements UseCase {
  private constructor(
    readonly useCase: UseCase,
    private readonly middleware: Middleware,
    private readonly options: UseCaseOptions,
  ) {}

  async handle(params: unknown): Promise<unknown> {
    return this.middleware.intercept(params, this.useCase, this.options)
  }

  static create({
    middleware,
    options,
    useCase,
  }: {
    useCase: UseCase
    middleware: Middleware
    options: UseCaseOptions
  }) {
    return new UseCaseHandler(useCase, middleware, options)
  }
}
