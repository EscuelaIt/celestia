import { type EventEmitter, EventTypes } from '../../events/event-emitter'
import type { UseCase } from '../use-case'
import type { UseCaseOptions } from '../use-case-options'
import type { Middleware } from './middleware'

export class ConfirmMiddleware implements Middleware {
  static readonly id = Symbol('ConfirmMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, next: UseCase, options: UseCaseOptions): Promise<unknown> {
    const confirm = options.confirm

    if (confirm !== undefined) {
      return new Promise(resolve => {
        this.eventEmitter.dispatch(EventTypes.CONFIRM, confirm)

        const unsubscribe = this.eventEmitter.subscribe(EventTypes.CONFIRMED, async () => {
          unsubscribe() // Clean up the subscription
          const result = await next.handle(params)
          resolve(result)
        })
      })
    }

    return await next.handle(params)
  }
}
