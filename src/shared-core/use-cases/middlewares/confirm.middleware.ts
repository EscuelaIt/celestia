import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'
import { type EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'

export class ConfirmMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('ConfirmMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  intercept(params: unknown, useCase: UseCase, options: UseCaseOptions): Promise<unknown> {
    if (options.confirm !== undefined) {
      this.eventEmitter.dispatch(EventType.CONFIRM, options.confirm)

      return new Promise(resolve => {
        this.eventEmitter.subscribe(EventType.CONFIRMED, () => {
          resolve(useCase.handle(params))
        })
      })
    }

    return useCase.handle(params)
  }
}
