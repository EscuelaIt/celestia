import type { Middleware } from '@/core/use-cases/middlewares/middleware'
import type { UseCase } from '../use-case'
import { type EventEmitter, EventType } from '@/core/event-emitter/event-emitter'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export class ErrorMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('ErrorMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, useCase: UseCase<unknown, unknown>): Promise<unknown> {
    try {
      return await useCase.handle(params)
    } catch (error) {
      this.eventEmitter.dispatch(EventType.ERROR, 'An error occurred. Please try again.')
      throw error
    }
  }
}
