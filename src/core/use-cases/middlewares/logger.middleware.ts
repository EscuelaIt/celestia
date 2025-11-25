import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '@/core/use-cases/use-case'
import { UseCaseHandler } from '@/core/use-cases/use-case-handler'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export class LoggerMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('LoggerMiddleware')

  private getActualUseCaseName(useCase: UseCase<unknown, unknown>): string {
    if (useCase instanceof UseCaseHandler) {
      return this.getActualUseCaseName(useCase.useCase)
    }
    return useCase.constructor.name
  }

  async intercept(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown> {
    const useCaseName = this.getActualUseCaseName(useCase)
    console.log('Logging use case:', useCaseName)
    console.log('Logging params:', params)
    console.time(useCaseName)
    const result = await useCase.handle(params)
    console.timeEnd(useCaseName)
    console.log('Logging result:', result)
    return result
  }
}
