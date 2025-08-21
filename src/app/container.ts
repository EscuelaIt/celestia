import { GetDestinationsQry } from '@/app/get-destinations.qry'
import { CreateDestinationCmd } from '@/app/create-destination.cmd'
import { CalculateTripCmd } from '@/app/calculate-trip.cmd'
import { UseCaseService } from '@/app/use-case-service'

export const getDestinationsQry = new GetDestinationsQry()
export const createDestinationCmd = new CreateDestinationCmd()
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService()
