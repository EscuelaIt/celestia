import type { Command } from '@/shared-core/use-cases/command'
import type { DomainEvent } from '@/shared-core/events/domain-event'

// An event handler is just a command whose input is the event, so the use case service can run it
export type EventHandler<Event extends DomainEvent> = Command<Event>
