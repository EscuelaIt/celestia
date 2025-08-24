import type { Destination } from '@/features/destination/destination'
import type { DestinationRepository } from '@/features/destination/destination.repository'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'

export class DestinationApiRepository implements DestinationRepository {
  async findAll(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data: Destination[] = await response.json()
    return data
  }

  async create(createDestination: CreateDestination): Promise<void> {
    const response = await fetch('/api/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createDestination),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to create destination')
    }
  }
}
