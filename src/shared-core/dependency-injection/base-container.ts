import type { Container } from '@/shared-core/dependency-injection/container'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'

export abstract class BaseContainer implements Container {
  private readonly registry = new Map<InjectionToken, unknown>()

  get<Instance extends WithInjectionToken<AnyConstructor>>(key: Instance): InstanceType<Instance> {
    const token = key.ID
    if (!this.registry.has(token)) {
      throw new Error(`Instance with key '${token.toString()}' not found.`)
    }
    return this.registry.get(token) as InstanceType<Instance>
  }

  register<Instance extends object>(instance: Instance): void {
    const ctor = instance.constructor as WithInjectionToken<AnyConstructor>
    if (!('ID' in ctor) || typeof ctor.ID !== 'symbol') {
      const name = 'name' in ctor ? ctor.name : 'Unknown'
      throw new Error(`Missing static ID in ${name}`)
    }
    this.registry.set(ctor.ID, instance)
  }

  registerWithKey<Instance>(key: InjectionToken, instance: Instance): void {
    this.registry.set(key, instance)
  }
}
