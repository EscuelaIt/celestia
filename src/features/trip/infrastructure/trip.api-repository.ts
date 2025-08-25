import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { TripRepository } from '@/features/trip/domain/trip.repository'
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
