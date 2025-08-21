import type { Id } from '@/app/models/id'
import type { ShipType } from '@/app/models/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
