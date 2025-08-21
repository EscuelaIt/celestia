import type { Destination } from '@/app/models/destination'
import type { ShipType } from '@/app/models/ship-type'

export interface Trip {
  destination: Destination
  shipType: ShipType
  travelTime: number
  averageSpeed: number
}
