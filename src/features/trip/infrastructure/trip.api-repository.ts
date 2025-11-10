import type { TripRepository } from '@/features/trip/domain/trip.repository'
import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import { CalculateTripError } from '@/features/trip/domain/calculate-trip.error'
import type { InjectionToken } from '@/core/container/injection-token'

export class TripApiRepository implements TripRepository {
  static readonly id: InjectionToken = Symbol('TripApiRepository')

  async create(calculateTrip: CalculateTrip): Promise<Trip> {
    const response = await fetch('/api/calculate-trip', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destinationId: calculateTrip.destinationId,
        shipType: calculateTrip.shipType,
      }),
    })

    if (!response.ok) {
      throw new CalculateTripError()
    }

    const data = await response.json()

    return data as Trip
  }
}
