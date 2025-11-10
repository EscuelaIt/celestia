import type { Destination } from '@/features/destination/domain/destination'
import type { Query } from '@/core/use-cases/query'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import type { InjectionToken } from '@/core/container/injection-token'

export class GetDestinationsQry implements Query<Destination[]> {
  static readonly id: InjectionToken = Symbol('GetDestinationsQry')

  constructor(private readonly destinationRepository: DestinationRepository) {}

  async handle(): Promise<Destination[]> {
    return this.destinationRepository.findAll()
  }
}
