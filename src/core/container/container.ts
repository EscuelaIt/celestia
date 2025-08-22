import { GetDestinationsQry } from '@/features/destination/destination-list/get-destinations.qry'
import { CreateDestinationCmd } from '@/features/destination/destination-create/create-destination.cmd'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LogMiddleware } from '@/core/use-cases/middlewares/log.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'
import { DestinationApiRepository } from '@/features/destination/destination.api-repository'

export const destinationApiRepository = new DestinationApiRepository()
export const getDestinationsQry = new GetDestinationsQry(destinationApiRepository)
export const createDestinationCmd = new CreateDestinationCmd(destinationApiRepository)
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService([new EmptyMiddleware(), new ErrorMiddleware(), new LogMiddleware()])
