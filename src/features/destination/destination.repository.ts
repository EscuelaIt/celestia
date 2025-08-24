import type { Destination } from '@/features/destination/destination'

export interface DestinationRepository {
  findAll(): Promise<Destination[]>
  // create(createDestination: CreateDestination): Promise<void>
}
