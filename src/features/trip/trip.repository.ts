import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'

export interface TripRepository {
  create(calculateTrip: CalculateTrip): Promise<Trip>
}
