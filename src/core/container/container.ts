import type { AnyConstructor, WithInjectionToken } from '@/core/container/with-injection-token'

/**
 * Container interface for managing all instances in the application.
 */
export interface Container {
  /**
   * Register an instance in the container with a specific key.
   * @param instance - The instance to register
   */
  register<Instance extends WithInjectionToken<AnyConstructor>>(instance: Instance): void

  /**
   * Get an instance from the container.
   * @param key - The class with a static injection token to get the instance
   * @returns The instance typed as the class instance
   */
  get<Instance extends WithInjectionToken<AnyConstructor>>(key: Instance): InstanceType<Instance>
}
