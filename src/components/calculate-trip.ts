import type { Id } from '@/app/id'
import type { ShipType } from '@/components/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
