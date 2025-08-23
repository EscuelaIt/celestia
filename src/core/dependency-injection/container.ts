import { CreateDestinationCmd } from '@/features/destination/create-destination.cmd'
import { GetDestinationsQry } from '@/features/destination/get-destinations.qry'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'

export const createDestinationCmd = new CreateDestinationCmd()
export const getDestinationsQry = new GetDestinationsQry()
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService()
