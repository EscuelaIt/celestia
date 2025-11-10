import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { Command } from '@/core/use-cases/command'
import type { TripRepository } from '@/features/trip/domain/trip.repository'
import type { InjectionToken } from '@/core/container/injection-token'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  static readonly id: InjectionToken = Symbol('CalculateTripCmd')

  constructor(private readonly tripRepository: TripRepository) {}

  async handle(calculateTrip: CalculateTrip): Promise<Trip> {
    return this.tripRepository.create(calculateTrip)
  }
}
