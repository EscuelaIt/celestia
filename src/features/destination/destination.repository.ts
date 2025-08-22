import type { Destination } from '@/features/destination/destination'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'

export interface DestinationRepository {
  findAll(): Promise<Destination[]>
  create(createDestination: CreateDestination): Promise<void>
}
