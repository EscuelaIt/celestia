import type { UseCase } from '@/app/use-case'
import type { CalculateTrip } from '@/components/calculate-trip'
import type { Trip } from '@/components/trip'

export class CalculateTripUseCase implements UseCase<CalculateTrip, Trip> {
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
