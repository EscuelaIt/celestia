import type { InjectionToken } from '@/core/container/injection-token'
import type { AnyConstructor, WithInjectionToken } from '@/core/container/with-injection-token'

/**
 * Container interface for managing all instances in the application.
 */
export interface Container {
  /**
   * Register an instance in the container with a specific key.
   * @param key - The key to register the instance under
   * @param instance - The instance to register
   */
  registerWithKey<T>(key: InjectionToken, instance: T): void

  /**
   * Get an instance from the container.
   * @param key - The class with a static injection token to get the instance
   * @returns The instance typed as the class instance
   */
  get<C extends WithInjectionToken<AnyConstructor>>(key: C): InstanceType<C>
}
