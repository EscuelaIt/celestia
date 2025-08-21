import type { Destination } from '@/components/destination'
import type { ShipType } from '@/components/ship-type'

export interface Trip {
  destination: Destination
  shipType: ShipType
  travelTime: number
  averageSpeed: number
}
