import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { TripRepository } from '@/features/trip/domain/trip.repository'
import type { HttpClient } from '@/shared-core/http-client/http-client'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class TripApiRepository implements TripRepository {
  static readonly ID: InjectionToken = Symbol('TripApiRepository')

  constructor(private readonly httpClient: HttpClient) {}

  async calculateTrip({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
    return this.httpClient.post<CalculateTrip, Trip>('calculate-trip', {
      destinationId,
      shipType,
    })
  }
}
