import type { Destination } from '@/app/destination'

export type CreateDestination = Omit<Destination, 'id'>
