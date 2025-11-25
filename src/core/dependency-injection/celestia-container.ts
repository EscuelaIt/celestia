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

const globalForCelestia = globalThis as unknown as {
  celestia?: Container
}

export class CelestiaContainer implements Container {
  private readonly registry = new Map<string, unknown>()

  static getInstance(): Container {
    // Reuse global instance if it exists
    if (!globalForCelestia.celestia) {
      globalForCelestia.celestia = new CelestiaContainer()
    }
    return globalForCelestia.celestia!
  }

  constructor() {
    this.registerArtifacts()
    this.registerRepositories()
    this.registerUseCases()
  }

  get<Instance>(key: string): Instance {
    const instance = this.registry.get(key)

    if (instance === undefined) {
      throw new Error(`Instance for key ${key} is missing`)
    }

    return instance as Instance
  }

  register(key: string, instance: unknown): void {
    this.registry.set(key, instance)
  }

  private registerArtifacts() {
    const eventEmitter = new EventEmitter()
    this.register(EventEmitter.ID, eventEmitter)
    const middlewares = [new ErrorMiddleware(eventEmitter), new LoggerMiddleware(), new EmptyMiddleware()]

    const useCaseService = new UseCaseService(middlewares)
    this.register(UseCaseService.ID, useCaseService)

    const environment: Environment = {
      NEXT_PUBLIC_BASE_API_URL: process.env['NEXT_PUBLIC_BASE_API_URL']!,
    }
    this.register(ENVIRONMENT_ID, environment)

    const httpClient = new HttpClient(environment.NEXT_PUBLIC_BASE_API_URL)
    this.register(HttpClient.ID, httpClient)
    const dateTransformer = new DateTransformer()
    this.register(DateTransformer.ID, dateTransformer)
  }

  private registerRepositories() {
    const httpClient = this.get<HttpClient>(HttpClient.ID)
    const dateTransformer = this.get<DateTransformer>(DateTransformer.ID)
    const destinationApiRepository = new DestinationApiRepository(httpClient, dateTransformer)
    this.register(DestinationApiRepository.ID, destinationApiRepository)
    const tripApiRepository = new TripApiRepository(httpClient)
    this.register(TripApiRepository.ID, tripApiRepository)
  }

  private registerUseCases() {
    const destinationOrderer = new DestinationOrderer()
    this.register(DestinationOrderer.ID, destinationOrderer)
    const destinationApiRepository = this.get<DestinationApiRepository>(DestinationApiRepository.ID)
    const getDestinationsQry = new GetDestinationsQry(destinationApiRepository, destinationOrderer)
    this.register(GetDestinationsQry.ID, getDestinationsQry)

    const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
    this.register(CreateDestinationCmd.ID, createDestinationCmd)
    const tripApiRepository = this.get<TripApiRepository>(TripApiRepository.ID)
    const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
    this.register(CalculateTripCmd.ID, calculateTripCmd)
  }
}
