import type { UseCase } from '@/core/use-cases/use-case'
import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import type { Container } from '@/core/container/container'
import type { InjectionToken } from '@/core/container/injection-token'
import type { AnyConstructor, WithInjectionToken } from '@/core/container/with-injection-token'
import type { UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { UseCaseOptions } from '@/core/use-cases/use-case-options'

export class UseCaseService {
  static readonly id: InjectionToken = Symbol('UseCaseService')
  constructor(
    private readonly middlewares: Middleware[],
    private readonly container: Container,
  ) {}

  async execute<T extends UseCase>(
    useCaseClass: WithInjectionToken<AnyConstructor<T>>,
    params?: UseCaseParams<T>,
    options?: UseCaseOptions,
  ): Promise<UseCaseReturn<T>> {
    const useCaseInstance = this.container.get(useCaseClass)
    const requiredOptions = options ?? {
      logLevel: 'info',
    }

    let next = UseCaseHandler.create({
      middleware: this.container.get(EmptyMiddleware),
      next: useCaseInstance,
      options: requiredOptions,
    })
    for (let i = this.middlewares.length - 1; i >= 0; i--) {
      const currentMiddleware = this.middlewares[i]!
      const previous = next
      next = UseCaseHandler.create({ middleware: currentMiddleware, next: previous, options: requiredOptions })
    }

    return next.handle(params) as Promise<UseCaseReturn<T>>
  }
}
