import type { UseCase } from '../use-case'
import { UseCaseHandler } from '../use-case-handler'
import type { Middleware } from './middleware'
import type { InjectionToken } from '@/core/container/injection-token'
import type { UseCaseOptions } from '@/core/use-cases/use-case-options'

export class LogMiddleware implements Middleware {
  static readonly id: InjectionToken = Symbol('LogMiddleware')

  intercept(params: unknown, useCase: UseCase, options: UseCaseOptions): Promise<unknown> {
    if (options.logLevel !== 'silent') {
      console.log(`[${new Date(Date.now()).toISOString()}] ${this.getName(useCase)} / ${this.printResult(params)}`)
    }
    return useCase.handle(params)
  }

  private getName(useCase: UseCase): string {
    if (useCase instanceof UseCaseHandler) {
      return this.getName(useCase.useCase)
    }

    return useCase.constructor.name
  }

  private printResult(result: unknown) {
    return JSON.stringify(result, null, 2)
  }
}
