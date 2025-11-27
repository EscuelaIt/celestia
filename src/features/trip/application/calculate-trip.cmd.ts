import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { Command } from '@/shared-core/use-cases/command'
import type { TripRepository } from '@/features/trip/domain/trip.repository'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  static readonly ID: InjectionToken = Symbol('CalculateTripCmd')

  constructor(private readonly tripRepository: TripRepository) {}

  async handle({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
    return this.tripRepository.calculateTrip({ destinationId, shipType })
  }
}
