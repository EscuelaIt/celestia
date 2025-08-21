import { GetDestinationsQry } from '@/app/use-cases/get-destinations.qry'
import { CreateDestinationCmd } from '@/app/use-cases/create-destination.cmd'
import { CalculateTripCmd } from '@/app/use-cases/calculate-trip.cmd'
import { UseCaseService } from '@/app/use-cases/use-case-service'

export const getDestinationsQry = new GetDestinationsQry()
export const createDestinationCmd = new CreateDestinationCmd()
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService()
