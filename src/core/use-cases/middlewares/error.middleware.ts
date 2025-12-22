import type { UseCase } from '../use-case'
import type { Middleware } from './middleware'
import type { InjectionToken } from '@/core/container/injection-token'
import { type EventEmitter, EventTypes } from '@/core/events/event-emitter'
import type { DomainError } from '@/core/errors/domain-error'

export class ErrorMiddleware implements Middleware {
  static readonly id: InjectionToken = Symbol('ErrorMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    try {
      const result = await useCase.handle(params)
      return result
    } catch (error) {
      this.eventEmitter.dispatch(EventTypes.ERROR, error as DomainError)
      throw error
    }
  }
}
