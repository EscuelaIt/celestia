import { CreateDestinationCmd } from '@/app/create-destination.cmd'
import { GetDestinationsQry } from '@/app/get-destinations.qry'
import { CalculateTripCmd } from '@/app/calculate-trip.cmd'

export const createDestinationUseCase = new CreateDestinationCmd()
export const getDestinationsUseCase = new GetDestinationsQry()
export const calculateTripUseCase = new CalculateTripCmd()
