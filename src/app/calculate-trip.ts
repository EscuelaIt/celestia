import type { Id } from '@/app/id'
import type { ShipType } from '@/app/calculate-trip.use-case'

export interface CalculateTrip {
  destinationId: Id
  shipType: ShipType
}
