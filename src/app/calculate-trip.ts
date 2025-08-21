import type { Id } from '@/app/id'
import type { ShipType } from '@/app/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
