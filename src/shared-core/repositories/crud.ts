import type { Creatable } from '@/shared-core/repositories/creatable'
import type { UpdatableOne } from '@/shared-core/repositories/updatable-one'
import type { Findable } from '@/shared-core/repositories/findable-one'
import type { FindableAll } from '@/shared-core/repositories/findable-all'
import type { Deletable } from '@/shared-core/repositories/deletable'

export interface CrudRepository<Entity>
  extends Creatable<Entity>,
    Findable<Entity>,
    FindableAll<Entity>,
    UpdatableOne<Entity>,
    Deletable {}
