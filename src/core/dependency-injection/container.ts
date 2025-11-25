import type { InjectionToken } from '@/core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'

export interface Container {
  register<Instance extends WithInjectionToken<AnyConstructor>>(instance: Instance): void
  registerWithKey<Instance extends WithInjectionToken<AnyConstructor>>(key: InjectionToken, instance: Instance): void
  get<Instance extends WithInjectionToken<AnyConstructor>>(key: Instance): InstanceType<Instance>
}
