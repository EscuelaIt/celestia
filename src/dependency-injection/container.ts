import { CreateDestinationCmd } from '@/use-cases/create-destination.cmd'
import { GetDestinationsQry } from '@/use-cases/get-destinations.qry'
import { CalculateTripCmd } from '@/use-cases/calculate-trip.cmd'
import { UseCaseService } from '@/use-cases/use-case-service'

export const createDestinationCmd = new CreateDestinationCmd()
export const getDestinationsQry = new GetDestinationsQry()
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService()
