import { CreateDestinationUseCase } from '@/app/create-destination.use-case'
import { GetDestinationsQry } from '@/app/get-destinations.qry'
import { CalculateTripUseCase } from '@/app/calculate-trip.use-case'

export const createDestinationUseCase = new CreateDestinationUseCase()
export const getDestinationsUseCase = new GetDestinationsQry()
export const calculateTripUseCase = new CalculateTripUseCase()
