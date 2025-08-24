import { CreateDestinationCmd } from '@/features/destination/destination-create/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/destination-list/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/core/use-cases/middlewares/logger.middleware'
import { TimerMiddleware } from '@/core/use-cases/middlewares/timer.middleware'
import { TimeoutMiddleware } from '@/core/use-cases/middlewares/timeout.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { EventEmitter } from '@/core/event-emitter/event-emitter'
import { DestinationApiRepository } from '@/features/destination/destination.api-repository'
import { TripApiRepository } from '@/features/trip/trip.api-repository'
import { HttpClient } from '@/core/http-client/http-client'

export const httpClient = new HttpClient(process.env['NEXT_PUBLIC_BASE_API_URL']!)
export const destinationApiRepository = new DestinationApiRepository(httpClient)
export const tripApiRepository = new TripApiRepository(httpClient)

export const getDestinationsQry = new GetDestinationsQry(destinationApiRepository)

export const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
export const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
export const eventEmitter = new EventEmitter()

const middlewaresProduction = [new TimeoutMiddleware(500), new TimerMiddleware(), new EmptyMiddleware()]
const middlewaresDevelopment = [new ErrorMiddleware(eventEmitter), new LoggerMiddleware(), new EmptyMiddleware()]

export const useCaseService = new UseCaseService(
  process.env.NODE_ENV === 'development' ? middlewaresDevelopment : middlewaresProduction,
)
