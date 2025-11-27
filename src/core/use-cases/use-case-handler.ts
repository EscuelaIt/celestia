import type { UseCase, UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCaseOptions } from '@/core/use-cases/use-case-options'

export class UseCaseHandler implements UseCase {
  constructor(
    readonly useCase: UseCase,
    private readonly middlewares: Middleware,
    private readonly useCaseOptions: UseCaseOptions,
  ) {}

  handle<T extends UseCase>(input?: UseCaseParams<T>): Promise<UseCaseReturn<T>> {
    return this.middlewares.intercept(input, this.useCase, this.useCaseOptions) as Promise<UseCaseReturn<T>>
  }

  static create({ middleware, next, options }: { middleware: Middleware; next: UseCase; options: UseCaseOptions }) {
    return new UseCaseHandler(next, middleware, options)
  }
}
