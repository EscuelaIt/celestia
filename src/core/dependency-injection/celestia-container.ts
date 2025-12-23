import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/application/calculate-trip.cmd'
import { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/shared-core/use-cases/middlewares/logger.middleware'
import { ErrorMiddleware } from '@/shared-core/use-cases/middlewares/error.middleware'
import { EventEmitter } from '@/shared-core/event-emitter/event-emitter'
import { DestinationApiRepository } from '@/features/destination/infrastructure/destination.api-repository'
import { TripApiRepository } from '@/features/trip/infrastructure/trip.api-repository'
import { HttpClient } from '@/shared-core/http-client/http-client'
import { DestinationOrderer } from '@/features/destination/destination-list/domain/destination-orderer'
import { DateTransformer } from '@/features/destination/infrastructure/date.transformer'
import type { Container } from '@/shared-core/dependency-injection/container'
import { type Environment, ENVIRONMENT_ID } from '@/core/environment/environment'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import { SuccessMiddleware } from '@/shared-core/use-cases/middlewares/success.middleware'
import { ConfirmMiddleware } from '@/shared-core/use-cases/middlewares/confirm.middleware'
import { DestinationDeleteCmd } from '@/features/destination/destination-delete/application/destination-delete.cmd'

const globalForCelestia = globalThis as unknown as {
  celestia?: Container
}

export class CelestiaContainer implements Container {
  private readonly registry = new Map<InjectionToken, unknown>()

  static getInstance(): Container {
    // Reuse global instance if it exists
    if (!globalForCelestia.celestia) {
      globalForCelestia.celestia = new CelestiaContainer()
    }
    return globalForCelestia.celestia!
  }

  private constructor() {
    this.registerArtifacts()
    this.registerRepositories()
    this.registerUseCases()
  }

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

  private registerArtifacts() {
    const eventEmitter = new EventEmitter()
    const emptyMiddleware = new EmptyMiddleware()
    const loggerMiddleware = new LoggerMiddleware()
    const errorMiddleware = new ErrorMiddleware(eventEmitter)
    const successMiddleware = new SuccessMiddleware(eventEmitter)
    const confirmMiddleware = new ConfirmMiddleware(eventEmitter)

    const middlewares = [confirmMiddleware, errorMiddleware, loggerMiddleware, successMiddleware]

    const useCaseService = new UseCaseService(middlewares, this)
    const environment: Environment = {
      NEXT_PUBLIC_BASE_API_URL: process.env['NEXT_PUBLIC_BASE_API_URL']!,
    }
    const httpClient = new HttpClient(environment.NEXT_PUBLIC_BASE_API_URL)
    const dateTransformer = new DateTransformer()

    this.register(eventEmitter)
    this.register(emptyMiddleware)
    this.register(loggerMiddleware)
    this.register(errorMiddleware)
    this.register(confirmMiddleware)
    this.register(successMiddleware)
    this.register(useCaseService)
    this.register(httpClient)
    this.register(dateTransformer)

    this.registerWithKey(ENVIRONMENT_ID, environment)
  }

  private registerRepositories() {
    const httpClient = this.get(HttpClient)
    const dateTransformer = this.get(DateTransformer)
    const destinationApiRepository = new DestinationApiRepository(httpClient, dateTransformer)
    const tripApiRepository = new TripApiRepository(httpClient)

    this.register(destinationApiRepository)
    this.register(tripApiRepository)
  }

  private registerUseCases() {
    const destinationOrderer = new DestinationOrderer()
    const destinationApiRepository = this.get(DestinationApiRepository)
    const getDestinationsQry = new GetDestinationsQry(destinationApiRepository, destinationOrderer)
    const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
    const tripApiRepository = this.get(TripApiRepository)
    const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
    const destinationDeleteCmd = new DestinationDeleteCmd(destinationApiRepository)

    this.register(destinationOrderer)
    this.register(getDestinationsQry)
    this.register(createDestinationCmd)
    this.register(calculateTripCmd)
    this.register(destinationDeleteCmd)
  }
}

export const container = CelestiaContainer.getInstance()
