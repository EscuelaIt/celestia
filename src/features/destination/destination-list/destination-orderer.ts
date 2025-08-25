import type { Destination } from '@/features/destination/destination'

export class DestinationOrderer {
  order(destinations: Destination[]): Destination[] {
    return destinations.sort((a, b) => a.name.localeCompare(b.name))
  }
}
