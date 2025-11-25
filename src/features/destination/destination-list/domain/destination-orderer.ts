import type { Destination } from '@/features/destination/domain/destination'

export class DestinationOrderer {
  static readonly ID = 'DestinationOrderer'

  order(destinations: Destination[]): Destination[] {
    return destinations.sort((a, b) => a.name.localeCompare(b.name))
  }
}
