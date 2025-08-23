import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'
import type { Command } from '@/use-cases/command'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  async handle({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
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
