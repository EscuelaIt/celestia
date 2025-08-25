import type { Id } from '@/core/types/id'

import type { ShipType } from '@/features/trip/domain/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
