import type { Destination } from '@/features/destination/domain/destination'
import type { Query } from '@/core/use-cases/query'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import { DestinationOrderer } from '@/features/destination/destination-list/domain/destination-orderer'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'

export class GetDestinationsQry implements Query<Destination[]> {
  static readonly ID: InjectionToken = Symbol('GetDestinationsQry')

  constructor(
    private readonly destinationRepository: DestinationRepository,
    private readonly destinationOrderer: DestinationOrderer,
  ) {}

  async handle(): Promise<Destination[]> {
    return this.destinationOrderer.order(await this.destinationRepository.findAll())
  }
}
