import type { DomainEvent } from '@/shared-core/events/domain-event'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'

export class DestinationCreatedEvent implements DomainEvent {
  static readonly NAME = 'DestinationCreated'

  readonly name = DestinationCreatedEvent.NAME

  constructor(
    readonly destination: CreateDestination,
    readonly occurredOn = new Date(),
  ) {}
}
