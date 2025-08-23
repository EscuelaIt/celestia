import type { Id } from '@/types/id'

import type { ShipType } from '@/features/trip/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
