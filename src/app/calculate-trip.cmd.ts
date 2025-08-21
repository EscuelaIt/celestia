import type { CalculateTrip } from '@/app/calculate-trip'
import type { Trip } from '@/app/trip'
import type { Command } from '@/app/command'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  async execute(calculateTrip: CalculateTrip): Promise<Trip> {
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
      throw new Error('Failed to calculate trip')
    }

    const data = await response.json()

    return data as Trip
  }
}
