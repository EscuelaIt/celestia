import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { Command } from '@/core/use-cases/command'
import type { TripRepository } from '@/features/trip/domain/trip.repository'

export class CalculateTripCmd implements Command<CalculateTrip, Trip> {
  static readonly ID = 'CalculateTripCmd'

  constructor(private readonly tripRepository: TripRepository) {}

  async handle({ destinationId, shipType }: CalculateTrip): Promise<Trip> {
    return this.tripRepository.calculateTrip({ destinationId, shipType })
  }
}
