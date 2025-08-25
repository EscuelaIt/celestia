import type { Creatable } from '@/core/repositories/creatable'
import type { UpdatableOne } from '@/core/repositories/updatable-one'
import type { Findable } from '@/core/repositories/findable-one'
import type { FindableAll } from '@/core/repositories/findable-all'
import type { Deletable } from '@/core/repositories/deletable'

export interface CrudRepository<Entity>
  extends Creatable<Entity>,
    Findable<Entity>,
    FindableAll<Entity>,
    UpdatableOne<Entity>,
    Deletable {}
