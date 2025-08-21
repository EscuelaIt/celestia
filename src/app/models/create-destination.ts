import type { Destination } from '@/app/models/destination'

export type CreateDestination = Omit<Destination, 'id'>
