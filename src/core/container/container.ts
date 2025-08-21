import { GetDestinationsQry } from '@/features/destination/destination-list/get-destinations.qry'
import { CreateDestinationCmd } from '@/features/destination/destination-create/create-destination.cmd'
import { CalculateTripCmd } from '@/features/trip/calculate-trip.cmd'
import { UseCaseService } from '@/core/use-cases/use-case-service'

export const getDestinationsQry = new GetDestinationsQry()
export const createDestinationCmd = new CreateDestinationCmd()
export const calculateTripCmd = new CalculateTripCmd()
export const useCaseService = new UseCaseService()
