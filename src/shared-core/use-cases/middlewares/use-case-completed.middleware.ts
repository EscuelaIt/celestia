import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import { type EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { UseCaseHandler } from '@/shared-core/use-cases/use-case-handler'

export interface UseCaseCompleted {
  useCaseId: InjectionToken
  params: unknown
  result: unknown
}

export class UseCaseCompletedMiddleware implements Middleware {
  static readonly ID: InjectionToken = Symbol('UseCaseCompletedMiddleware')

  constructor(private readonly eventEmitter: EventEmitter) {}

  async intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    const result = await useCase.handle(params)
    const useCaseClass = UseCaseHandler.unwrap(useCase).constructor as WithInjectionToken<AnyConstructor>

    const useCaseCompleted: UseCaseCompleted = { useCaseId: useCaseClass.ID, params, result }
    this.eventEmitter.dispatch(EventType.USE_CASE_COMPLETED, useCaseCompleted)

    return result
  }
}
