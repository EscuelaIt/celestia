import { type EventEmitter, EventType } from '../../events/event-emitter'
import type { UseCase } from '../use-case'
import type { UseCaseOptions } from '../use-case-options'
import type { Middleware } from './middleware'

export class ConfirmMiddleware implements Middleware {
  static readonly id = Symbol('ConfirmMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, next: UseCase, options: UseCaseOptions): Promise<unknown> {
    if (options.confirm) {
      return new Promise(resolve => {
        this.eventEmitter.dispatch(EventType.CONFIRM, { confirm: options.confirm })

        const unsubscribe = this.eventEmitter.subscribe(EventType.CONFIRMED, async () => {
          unsubscribe() // Clean up the subscription
          const result = await next.handle(params)
          resolve(result)
        })
      })
    }

    return await next.handle(params)
  }
}
