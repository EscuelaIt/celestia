import type { Destination } from '@/features/destination/destination'
import type { DestinationRepository } from '@/features/destination/destination.repository'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'
import type { HttpClient } from '@/core/http-client/http-client'

export class DestinationApiRepository implements DestinationRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async findAll(): Promise<Destination[]> {
    return this.httpClient.get<Destination[]>('destinations')
  }

  async create(createDestination: CreateDestination): Promise<void> {
    return this.httpClient.post<CreateDestination>('destinations', createDestination)
  }
}
