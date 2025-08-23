import type { Id } from '@/models/id'

import type { ShipType } from '@/models/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
