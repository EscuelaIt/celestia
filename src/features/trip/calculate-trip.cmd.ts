import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'
import type { Command } from '@/core/use-cases/command'
import { CalculateTripError } from '@/features/trip/calculate-trip.error'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  async handle(calculateTrip: CalculateTrip): Promise<Trip> {
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
