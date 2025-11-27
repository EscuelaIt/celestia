import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import { UseCaseHandler } from '@/shared-core/use-cases/use-case-handler'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export class LoggerMiddleware implements Middleware {
  private isFirst = true

  static readonly ID: InjectionToken = Symbol('LoggerMiddleware')

  private getActualUseCaseName(useCase: WithInjectionToken<AnyConstructor>): string {
    if (useCase instanceof UseCaseHandler) {
      return this.getActualUseCaseName(useCase.useCase as unknown as WithInjectionToken<AnyConstructor>)
    }

    return (useCase.constructor as WithInjectionToken<AnyConstructor>).ID?.description?.toString() ?? 'unknown use case'
  }

  async intercept(params: unknown, useCase: UseCase, options: UseCaseOptions): Promise<unknown> {
    if (this.isFirst) {
      console.log('First')
      this.isFirst = false
    }

    if (options.logLevel === 'silent') {
      return useCase.handle(params)
    }

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
