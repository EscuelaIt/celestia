import type { CreateDestination } from '@/features/destination/destination-create/create-destination'
import type { Command } from '@/core/use-cases/command'
import type { DestinationRepository } from '@/features/destination/destination.repository'

export class CreateDestinationCmd implements Command<CreateDestination> {
  constructor(private readonly destinationRepository: DestinationRepository) {}

  async handle(createDestination: CreateDestination): Promise<void> {
    return this.destinationRepository.create(createDestination)
  }
}
