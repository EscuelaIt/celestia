import type { Destination } from '@/features/destination/domain/destination'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class DestinationOrderer {
  static readonly ID: InjectionToken = Symbol('DestinationOrderer')

  order(destinations: Destination[]): Destination[] {
    return destinations.sort((a, b) => a.name.localeCompare(b.name))
  }
}
