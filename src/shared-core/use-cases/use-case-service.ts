import type { UseCase, UseCaseParams, UseCaseReturn } from '@/shared-core/use-cases/use-case'
import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import { UseCaseHandler } from '@/shared-core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { Container } from '@/shared-core/dependency-injection/container'

export class UseCaseService {
  static readonly ID: InjectionToken = Symbol('UseCaseService')

  constructor(
    private readonly middlewares: Middleware[],
    private readonly container: Container,
  ) {}

  execute<T extends UseCase>(
    useCaseClass: WithInjectionToken<AnyConstructor<T>>,
    params?: UseCaseParams<T>,
  ): Promise<UseCaseReturn<T>> {
    const useCase = this.container.get(useCaseClass)
    let next = new UseCaseHandler(useCase, this.container.get(EmptyMiddleware))

    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      next = new UseCaseHandler(next, this.middlewares[i]!)
    }

    return next.handle(params) as Promise<UseCaseReturn<T>>
  }
}
