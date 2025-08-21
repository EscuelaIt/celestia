import type { Destination } from '@/features/destination/destination'

export type CreateDestination = Omit<Destination, 'id'>
