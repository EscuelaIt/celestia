import type { Destination } from '@/features/destination/destination'
import type { CreateDestination } from '@/features/destination/destination-create/create-destination'
import type { Creatable } from '@/core/repositories/creatable'
import type { FindableAll } from '@/core/repositories/findable-all'

export interface DestinationRepository extends Creatable<CreateDestination>, FindableAll<Destination> {}
