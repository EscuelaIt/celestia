import type { Destination } from '@/features/destination/domain/destination'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import { GetDestinationsError } from '@/features/destination/destination-list/domain/get-destinations.error'
import { CreateDestinationError } from '@/features/destination/destination-create/domain/create-destination.error'

export class DestinationApiRepository implements DestinationRepository {
  async findAll(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new GetDestinationsError()
    }
    const data = (await response.json()) as Destination[]
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
      throw new CreateDestinationError('Error creating destination: ' + errorData.message)
    }

    return
  }
}
