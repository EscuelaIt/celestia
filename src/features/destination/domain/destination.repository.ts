import type { Destination } from '@/features/destination/domain/destination'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { FindableAll } from '@/core/repositories/findable-all'
import type { Creatable } from '@/core/repositories/creatable'

export interface DestinationRepository extends FindableAll<Destination>, Creatable<CreateDestination> {}
