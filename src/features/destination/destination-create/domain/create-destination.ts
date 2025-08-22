import type { Destination } from '@/features/destination/domain/destination'

export type CreateDestination = Omit<Destination, 'id'>
