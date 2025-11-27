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
import type { AnyConstructor, WithInjectionToken } from '@/core/container/with-injection-token'
import { EventEmitter } from '@/core/events/event-emitter'
import { SuccessMiddleware } from '@/core/use-cases/middlewares/success.middleware'
import { ConfirmMiddleware } from '@/core/use-cases/middlewares/confirm.middleware'

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

    this.register(destinationApiRepository)
    this.register(tripApiRepository)
    this.register(getDestinationsQry)
    this.register(createDestinationCmd)
    this.register(calculateTripCmd)
  }

  /**
   * Register all middlewares, logger, event emitter, etc.
   */
  private registerArtifacts(): void {
    const eventEmitter = new EventEmitter()

    const emptyMiddleware = new EmptyMiddleware()
    const errorMiddleware = new ErrorMiddleware()
    const logMiddleware = new LogMiddleware()
    const successMiddleware = new SuccessMiddleware(eventEmitter)
    const confirmMiddleware = new ConfirmMiddleware(eventEmitter)
    this.register(emptyMiddleware)
    this.register(errorMiddleware)
    this.register(logMiddleware)
    this.register(successMiddleware)
    this.register(confirmMiddleware)
    this.register(eventEmitter)

    const useCaseService = new UseCaseService(
      [emptyMiddleware, confirmMiddleware, errorMiddleware, logMiddleware, successMiddleware],
      this,
    )
    this.register(useCaseService)
  }

  /**
   * Register an instance in the container with an explicit key.
   * @param instance - The instance to register
   */
  register<Instance extends object>(instance: Instance): void {
    const ctor = instance.constructor as WithInjectionToken<AnyConstructor>
    if (!('id' in ctor) || typeof ctor.id !== 'symbol') {
      const name = 'name' in ctor ? ctor.name : 'Unknown'
      throw new Error('Missing static id in ' + name)
    }
    this.instances.set(ctor.id, instance)
  }

  /**
   * Get an instance from the container by class (strongly typed).
   * @param key - The class with a static injection token to get the instance
   * @returns The instance typed as the class instance
   */
  get<Instance extends WithInjectionToken<AnyConstructor>>(key: Instance): InstanceType<Instance> {
    const token = key.id
    if (!this.instances.has(token)) {
      throw new Error(`Instance with key '${token.toString()}' not found.`)
    }
    return this.instances.get(token) as InstanceType<Instance>
  }
}
