import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'
import { type EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'

export class SuccessMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('SuccessMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  intercept(params: unknown, useCase: UseCase, options: UseCaseOptions): Promise<unknown> {
    if (options.success !== undefined) {
      this.eventEmitter.dispatch(EventType.SUCCESS, options.success)
    }
    return useCase.handle(params)
  }
}
