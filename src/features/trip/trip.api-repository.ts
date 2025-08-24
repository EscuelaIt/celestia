import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'
import type { TripRepository } from '@/features/trip/trip.repository'
import type { HttpClient } from '@/core/http-client/http-client'

export class TripApiRepository implements TripRepository {
  constructor(private readonly httpClient: HttpClient) {}

  async calculateTrip({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
    return this.httpClient.post<CalculateTrip, Trip>('calculate-trip', {
      destinationId,
      shipType,
    })
  }
}
