import type { UseCase } from '@/app/use-case'
import type { Destination } from '@/app/destination'

export type ShipType = 'classic' | 'advanced'

export interface CalculateTrip {
  destinationId: string
  shipType: ShipType
}

export interface Trip {
  destination: Destination
  shipType: ShipType
  travelTime: number
  averageSpeed: number
}

export class CalculateTripUseCase implements UseCase<CalculateTrip, Trip> {
  async execute({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
    const response = await fetch('/api/calculate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinationId,
        shipType,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to calculate trip')
    }

    const data = (await response.json()) as Trip
    return data
  }
}
