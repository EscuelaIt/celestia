import { CreateDestinationCmd } from '@/features/destination/destination-create/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/destination-list/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/core/use-cases/middlewares/logger.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { EventEmitter } from '@/core/event-emitter/event-emitter'
import { DestinationApiRepository } from '@/features/destination/destination.api-repository'
import { TripApiRepository } from '@/features/trip/trip.api-repository'
import { HttpClient } from '@/core/http-client/http-client'
import { DestinationOrderer } from '@/features/destination/destination-list/destination-orderer'
import { DateTransformer } from '@/features/destination/date.transformer'

export const httpClient = new HttpClient(process.env['NEXT_PUBLIC_BASE_API_URL']!)
export const dateTransformer = new DateTransformer()
export const destinationApiRepository = new DestinationApiRepository(httpClient, dateTransformer)
export const tripApiRepository = new TripApiRepository(httpClient)

export const destinationOrderer = new DestinationOrderer()
export const getDestinationsQry = new GetDestinationsQry(destinationApiRepository, destinationOrderer)

export const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
export const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
export const eventEmitter = new EventEmitter()

const middlewares = [new ErrorMiddleware(eventEmitter), new LoggerMiddleware(), new EmptyMiddleware()]

export const useCaseService = new UseCaseService(middlewares)
