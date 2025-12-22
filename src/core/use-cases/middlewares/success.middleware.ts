import { EventEmitter, EventTypes } from '../../events/event-emitter'
import type { UseCase } from '../use-case'
import type { UseCaseOptions } from '../use-case-options'
import type { Middleware } from './middleware'

export class SuccessMiddleware implements Middleware {
  static readonly id = Symbol('SuccessMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, next: UseCase, options: UseCaseOptions): Promise<unknown> {
    const result = await next.handle(params)

    if (options.success) {
      this.eventEmitter.dispatch(EventTypes.SUCCESS, options.success)
    }

    return result
  }
}
