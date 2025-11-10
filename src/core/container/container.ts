/**
 * Container interface for managing all instances in the application.
 */
export interface Container {
  /**
   * Register an instance in the container with a specific key.
   * @param key - The key to register the instance under
   * @param instance - The instance to register
   */
  registerWithKey<T>(key: string, instance: T): void

  /**
   * Get an instance from the container.
   * @param key - The key of the instance to get
   * @returns The instance
   */
  get<T>(key: string): T
}
