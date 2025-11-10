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

// Extend globalThis to hold the singleton instance
const globalForCelestia = globalThis as unknown as {
  celestia?: Container
}

/**
 * Container for managing all instances in the application.
 */
export class CelestiaContainer implements Container {
  private readonly instances: Map<string, unknown> = new Map()

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
    return globalForCelestia.celestia
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

    this.registerWithKey('DestinationApiRepository', destinationApiRepository)
    this.registerWithKey('TripApiRepository', tripApiRepository)
    this.registerWithKey('GetDestinationsQry', getDestinationsQry)
    this.registerWithKey('CreateDestinationCmd', createDestinationCmd)
    this.registerWithKey('CalculateTripCmd', calculateTripCmd)
  }

  /**
   * Register all middlewares, logger, event emitter, etc.
   */
  private registerArtifacts(): void {
    const useCaseService = new UseCaseService([new EmptyMiddleware(), new ErrorMiddleware(), new LogMiddleware()])
    this.registerWithKey('UseCaseService', useCaseService)
  }

  /**
   * Register an instance in the container with an explicit key.
   * @param key - The key to register the instance under
   * @param instance - The instance to register
   */
  registerWithKey<T>(key: string, instance: T): void {
    this.instances.set(key, instance)
  }

  /**
   * Get an instance from the container.
   * @param key - The key of the instance to get
   * @returns The instance
   */
  get<T>(key: string): T {
    if (!this.instances.has(key)) {
      throw new Error(`Instance with key '${key}' not found.`)
    }
    return this.instances.get(key) as T
  }
}
