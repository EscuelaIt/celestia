import type { CalculateTrip } from '@/features/trip/calculate-trip'
import type { Trip } from '@/features/trip/trip'
import type { Creatable } from '@/core/repositories/creatable'

export type TripRepository = Creatable<CalculateTrip, Trip>
