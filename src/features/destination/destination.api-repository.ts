import type { Destination } from '@/features/destination/destination'
import type { DestinationRepository } from '@/features/destination/destination.repository'

export class DestinationApiRepository implements DestinationRepository {
  async findAll(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data: Destination[] = await response.json()
    return data
  }

  // create(createDestination: CreateDestination): Promise<void> {}
}
