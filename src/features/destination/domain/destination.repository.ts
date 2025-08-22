import type { Destination } from '@/features/destination/domain/destination'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { Creatable } from '@/core/repositories/creatable'
import type { FindableAll } from '@/core/repositories/findable-all'

export interface DestinationRepository extends Creatable<CreateDestination>, FindableAll<Destination> {}
