import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'
import type { TripRepository } from '@/features/trip/trip.repository'

export class TripApiRepository implements TripRepository {
  async calculateTrip({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
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
