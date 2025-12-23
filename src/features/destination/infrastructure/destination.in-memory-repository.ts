import type { Destination } from '@/features/destination/domain/destination'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import { DestinationMother } from '@/features/destination/tests/destination.mother'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { Id } from '@/shared-core/types/id'

export class DestinationInMemoryRepository implements DestinationRepository {
  data = [DestinationMother.europe()]
  async findAll(): Promise<Destination[]> {
    return this.data
  }

  async create(createDestination: CreateDestination): Promise<void> {
    this.data.push({ ...createDestination, id: (Math.random() * 1000).toString() })
  }

  async delete(id: Id): Promise<void> {
    const newDestinations = this.data.filter(x => x.id !== id)
    this.data = newDestinations
  }
}
