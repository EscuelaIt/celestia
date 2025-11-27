import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'

export class LoggerMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('LoggerMiddleware')

  private getActualUseCaseName(useCase: WithInjectionToken<AnyConstructor>): string {
    if (useCase instanceof UseCaseHandler) {
      return this.getActualUseCaseName(useCase.useCase as unknown as WithInjectionToken<AnyConstructor>)
    }

    return (useCase.constructor as WithInjectionToken<AnyConstructor>).ID?.description?.toString() ?? 'unknown use case'
  }

  async intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    const useCaseName = this.getActualUseCaseName(useCase as unknown as WithInjectionToken<AnyConstructor>)
    console.log('Logging use case:', useCaseName)
    console.log('Logging params:', params)
    console.time(useCaseName)
    const result = await useCase.handle(params)
    console.timeEnd(useCaseName)
    console.log('Logging result:', result)
    return result
  }
}
