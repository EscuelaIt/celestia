import type { Destination } from '@/features/destination/destination'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'
import type { FindableAll } from '@/core/repositories/findable-all'
import type { Creatable } from '@/core/repositories/creatable'

export interface DestinationRepository extends FindableAll<Destination>, Creatable<CreateDestination> {}
