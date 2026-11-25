import type { Command } from '@/shared-core/use-cases/command'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { EventBus } from '@/shared-core/events/event-bus'
import { DestinationNameDuplicatedError } from '@/features/destination/domain/destination-name-duplicated.error'
import { DestinationCreatedEvent } from '@/features/destination/domain/destination-created.event'

// Runs on the server behind POST /api/destinations; CreateDestinationCmd is the browser side that calls it
export class SaveDestinationCmd implements Command<CreateDestination> {
  static readonly ID: InjectionToken = Symbol('SaveDestinationCmd')

  constructor(
    private readonly destinationRepository: DestinationRepository,
    private readonly eventBus: EventBus,
  ) {}

  async handle(createDestination: CreateDestination): Promise<void> {
    const destinations = await this.destinationRepository.findAll()
    if (destinations.some(destination => destination.name === createDestination.name)) {
      throw new DestinationNameDuplicatedError()
    }

    await this.destinationRepository.create(createDestination)
    await this.eventBus.publish(new DestinationCreatedEvent(createDestination))
  }
}
