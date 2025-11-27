import type { UseCase, UseCaseParams, UseCaseReturn } from '@/shared-core/use-cases/use-case'
import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import { UseCaseHandler } from '@/shared-core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { Container } from '@/shared-core/dependency-injection/container'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export class UseCaseService {
  static readonly ID: InjectionToken = Symbol('UseCaseService')

  constructor(
    private readonly middlewares: Middleware[],
    private readonly container: Container,
  ) {}

  execute<T extends UseCase>(
    useCaseClass: WithInjectionToken<AnyConstructor<T>>,
    params?: UseCaseParams<T>,
    options?: UseCaseOptions,
  ): Promise<UseCaseReturn<T>> {
    const useCase = this.container.get(useCaseClass)
    const requiredOptions = options ?? {
      logLevel: 'info',
    }

    let next = UseCaseHandler.create({
      useCase,
      middleware: this.container.get(EmptyMiddleware),
      options: requiredOptions,
    })

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      next = UseCaseHandler.create({ useCase: next, middleware: this.middlewares[i]!, options: requiredOptions })
    }

    return next.handle(params) as Promise<UseCaseReturn<T>>
  }
}
