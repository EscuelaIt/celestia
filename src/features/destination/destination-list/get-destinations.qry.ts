import type { Destination } from '@/features/destination/destination'
import type { Query } from '@/core/use-cases/query'
import type { DestinationRepository } from '@/features/destination/destination.repository'

export class GetDestinationsQry implements Query<Destination[]> {
  constructor(private readonly destinationRepository: DestinationRepository) {}

  async handle(): Promise<Destination[]> {
    return this.destinationRepository.findAll()
  }
}
