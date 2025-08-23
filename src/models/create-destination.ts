import type { Destination } from '@/models/destination'

export type CreateDestination = Omit<Destination, 'id'>
