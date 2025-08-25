import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'

export interface TripRepository {
  calculateTrip(calculateTrip: CalculateTrip): Promise<Trip>
}
