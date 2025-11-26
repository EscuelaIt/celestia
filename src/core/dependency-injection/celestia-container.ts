import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/application/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/core/use-cases/middlewares/logger.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { EventEmitter } from '@/core/event-emitter/event-emitter'
import { DestinationApiRepository } from '@/features/destination/infrastructure/destination.api-repository'
import { TripApiRepository } from '@/features/trip/infrastructure/trip.api-repository'
import { HttpClient } from '@/core/http-client/http-client'
import { DestinationOrderer } from '@/features/destination/destination-list/domain/destination-orderer'
import { DateTransformer } from '@/features/destination/infrastructure/date.transformer'
import type { Container } from '@/core/dependency-injection/container'
import { type Environment, ENVIRONMENT_ID } from '../environment/environment'
import type { InjectionToken } from '@/core/dependency-injection/injection-token'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'

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
    this.register(eventEmitter)
    const emptyMiddleware = new EmptyMiddleware()
    this.register(emptyMiddleware)

    const loggerMiddleware = new LoggerMiddleware()
    this.register(loggerMiddleware)

    const errorMiddleware = new ErrorMiddleware(eventEmitter)
    this.register(errorMiddleware)

    const middlewares = [errorMiddleware, loggerMiddleware, emptyMiddleware]

    const useCaseService = new UseCaseService(middlewares, this)
    this.register(useCaseService)

    const environment: Environment = {
      NEXT_PUBLIC_BASE_API_URL: process.env['NEXT_PUBLIC_BASE_API_URL']!,
    }
    this.registerWithKey(ENVIRONMENT_ID, environment)

    const httpClient = new HttpClient(environment.NEXT_PUBLIC_BASE_API_URL)
    this.register(httpClient)
    const dateTransformer = new DateTransformer()
    this.register(dateTransformer)
  }

  private registerRepositories() {
    const httpClient = this.get(HttpClient)
    const dateTransformer = this.get(DateTransformer)
    const destinationApiRepository = new DestinationApiRepository(httpClient, dateTransformer)
    this.register(destinationApiRepository)
    const tripApiRepository = new TripApiRepository(httpClient)
    this.register(tripApiRepository)
  }

  private registerUseCases() {
    const destinationOrderer = new DestinationOrderer()
    this.register(destinationOrderer)
    const destinationApiRepository = this.get(DestinationApiRepository)
    const getDestinationsQry = new GetDestinationsQry(destinationApiRepository, destinationOrderer)
    this.register(getDestinationsQry)

    const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
    this.register(createDestinationCmd)
    const tripApiRepository = this.get(TripApiRepository)
    const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
    this.register(calculateTripCmd)
  }
}
