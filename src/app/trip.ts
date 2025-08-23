import type { Destination } from '@/app/destination'
import type { ShipType } from '@/app/calculate-trip.use-case'

export interface Trip {
  destination: Destination
  shipType: ShipType
  travelTime: number
  averageSpeed: number
}
