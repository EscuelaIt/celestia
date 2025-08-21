import type { Destination } from '@/components/destination'

export type CreateDestination = Omit<Destination, 'id'>
