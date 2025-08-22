import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LogMiddleware } from '@/core/use-cases/middlewares/log.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { DestinationApiRepository } from '@/features/destination/infrastructure/destination.api-repository'
import { TripApiRepository } from '@/features/trip/trip.api-repository'

export const destinationApiRepository = new DestinationApiRepository()
export const tripApiRepository = new TripApiRepository()
export const getDestinationsQry = new GetDestinationsQry(destinationApiRepository)
export const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
export const calculateTripCmd = new CalculateTripCmd(tripApiRepository)
export const useCaseService = new UseCaseService([new EmptyMiddleware(), new ErrorMiddleware(), new LogMiddleware()])
