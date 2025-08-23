import { CreateDestinationCmd } from '@/features/destination/destination-create/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/destination-list/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { EmptyMiddleware } from '@/core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/core/use-cases/middlewares/logger.middleware'
import { TimerMiddleware } from '@/core/use-cases/middlewares/timer.middleware'
import { TimeoutMiddleware } from '@/core/use-cases/middlewares/timeout.middleware'
import { ErrorMiddleware } from '@/core/use-cases/middlewares/error.middleware'

export const createDestinationCmd = new CreateDestinationCmd()
export const getDestinationsQry = new GetDestinationsQry()
export const calculateTripCmd = new CalculateTripCmd()

const middlewaresProduction = [new TimeoutMiddleware(500), new TimerMiddleware(), new EmptyMiddleware()]
const middlewaresDevelopment = [new ErrorMiddleware(), new LoggerMiddleware(), new EmptyMiddleware()]

export const useCaseService = new UseCaseService(
  process.env.NODE_ENV === 'development' ? middlewaresDevelopment : middlewaresProduction,
)
