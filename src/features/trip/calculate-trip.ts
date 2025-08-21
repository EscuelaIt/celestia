import type { Id } from '@/app/models/id'
import type { ShipType } from '@/features/trip/ship-type'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
