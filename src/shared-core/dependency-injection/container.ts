import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'

export interface Container {
  register<Instance extends WithInjectionToken<AnyConstructor>>(instance: Instance): void
  registerWithKey<Instance extends WithInjectionToken<AnyConstructor>>(key: InjectionToken, instance: Instance): void
  get<Instance extends WithInjectionToken<AnyConstructor>>(key: Instance): InstanceType<Instance>
}
