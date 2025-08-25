import type { Destination } from '@/features/destination/destination'
import type { Query } from '@/core/use-cases/query'
import type { DestinationRepository } from '@/features/destination/destination.repository'
import { DestinationOrderer } from '@/features/destination/destination-list/destination-orderer'

export class GetDestinationsQry implements Query<Destination[]> {
  constructor(
    private readonly destinationRepository: DestinationRepository,
    private readonly destinationOrderer: DestinationOrderer,
  ) {}

  async handle(): Promise<Destination[]> {
    return this.destinationOrderer.order(await this.destinationRepository.findAll())
  }
}
