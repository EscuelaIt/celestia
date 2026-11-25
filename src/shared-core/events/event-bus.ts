import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import type { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import type { DomainEvent } from '@/shared-core/events/domain-event'
import type { EventHandler } from '@/shared-core/events/event-handler'

type EventHandlerClass<Event extends DomainEvent> = WithInjectionToken<AnyConstructor<EventHandler<Event>>>

export class EventBus {
  static readonly ID: InjectionToken = Symbol('EventBus')

  private readonly handlers = new Map<string, EventHandlerClass<DomainEvent>[]>()

  constructor(private readonly useCaseService: UseCaseService) {}

  subscribe<Event extends DomainEvent>(eventName: Event['name'], handler: EventHandlerClass<Event>): void {
    const handlers = this.handlers.get(eventName) ?? []
    this.handlers.set(eventName, [...handlers, handler as EventHandlerClass<DomainEvent>])
  }

  async publish(event: DomainEvent): Promise<void> {
    const handlers = this.handlers.get(event.name) ?? []

    // The event already happened, so a failing side effect must not fail the command that published it
    await Promise.allSettled(handlers.map(handler => this.useCaseService.execute(handler, event)))
  }
}
