import type { CalculateTrip } from '@/features/trip/domain/calculate-trip'
import type { Trip } from '@/features/trip/domain/trip'
import type { Creatable } from '@/core/repositories/creatable'

export type TripRepository = Creatable<CalculateTrip, Trip>
