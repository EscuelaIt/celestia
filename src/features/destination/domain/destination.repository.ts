import type { Destination } from '@/features/destination/domain/destination'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'
import type { FindableAll } from '@/shared-core/repositories/findable-all'
import type { Creatable } from '@/shared-core/repositories/creatable'
import type { Deletable } from '@/shared-core/repositories/deletable'

export interface DestinationRepository extends FindableAll<Destination>, Creatable<CreateDestination>, Deletable {}
