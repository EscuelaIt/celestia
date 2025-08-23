import { CreateDestinationCmd } from '@/app/create-destination.cmd'
import { GetDestinationsQry } from '@/app/get-destinations.qry'
import { CalculateTripUseCase } from '@/app/calculate-trip.use-case'

export const createDestinationUseCase = new CreateDestinationCmd()
export const getDestinationsUseCase = new GetDestinationsQry()
export const calculateTripUseCase = new CalculateTripUseCase()
