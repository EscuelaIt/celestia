import type { Container } from '@/core/container/container'
import { DestinationApiRepository } from '@/features/destination/infrastructure/destination.api-repository'
import { TripApiRepository } from '@/features/trip/infrastructure/trip.api-repository'
import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { CalculateTripCmd } from '@/features/trip/application/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { LogMiddleware } from '@/core/use-cases/middlewares/log.middleware'
import type { InjectionToken } from '@/core/container/injection-token'
import type { WithInjectionToken } from '@/core/container/with-injection-token'

// Extend globalThis to hold the singleton instance
const globalForCelestia = globalThis as unknown as {
  celestia?: Container
}

/**
 * Container for managing all instances in the application.
 */
export class CelestiaContainer implements Container {
  private readonly instances: Map<InjectionToken, unknown> = new Map()

  private constructor() {
    this.registerArtifacts()
    this.registerUseCases()
  }

  /**
   * Get the singleton instance of the container.
   */
  static getInstance(): Container {
    // Reuse global instance if it exists
    if (!globalForCelestia.celestia) {
      globalForCelestia.celestia = new CelestiaContainer()
    }
    return globalForCelestia.celestia!
  }

  /**
   * Register all use cases in the container.
   */
  private registerUseCases(): void {
    const destinationApiRepository = new DestinationApiRepository()
    const tripApiRepository = new TripApiRepository()
    const getDestinationsQry = new GetDestinationsQry(destinationApiRepository)
    const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
    const calculateTripCmd = new CalculateTripCmd(tripApiRepository)

    this.registerWithKey(DestinationApiRepository.id, destinationApiRepository)
    this.registerWithKey(TripApiRepository.id, tripApiRepository)
    this.registerWithKey(GetDestinationsQry.id, getDestinationsQry)
    this.registerWithKey(CreateDestinationCmd.id, createDestinationCmd)
    this.registerWithKey(CalculateTripCmd.id, calculateTripCmd)
  }

  /**
   * Register all middlewares, logger, event emitter, etc.
   */
  private registerArtifacts(): void {
    // Register middlewares so they can be resolved via container.get(SomeMiddleware)
    const empty = new EmptyMiddleware()
    const error = new ErrorMiddleware()
    const log = new LogMiddleware()
    this.registerWithKey(EmptyMiddleware.id, empty)
    this.registerWithKey(ErrorMiddleware.id, error)
    this.registerWithKey(LogMiddleware.id, log)

    const useCaseService = new UseCaseService([empty, error, log], this)
    this.registerWithKey(UseCaseService.id, useCaseService)
  }

  /**
   * Register an instance in the container with an explicit key.
   * @param key - The key to register the instance under
   * @param instance - The instance to register
   */
  registerWithKey<T>(key: InjectionToken, instance: T): void {
    this.instances.set(key, instance)
  }

  /**
   * Get an instance from the container by class (strongly typed).
   * @param key - The class with a static injection token to get the instance
   * @returns The instance typed as the class instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get<C extends WithInjectionToken<abstract new (...args: any) => any>>(key: C): InstanceType<C> {
    const token = key.id
    if (!this.instances.has(token)) {
      throw new Error(`Instance with key '${token.toString()}' not found.`)
    }
    return this.instances.get(token) as InstanceType<C>
  }
}
