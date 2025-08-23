import type { Destination } from '@/models/destination'

import type { ShipType } from '@/models/ship-type'

export interface Trip {
  destination: Destination
  shipType: ShipType
  travelTime: number
  averageSpeed: number
}
