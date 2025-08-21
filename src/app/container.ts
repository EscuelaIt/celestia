import { GetDestinationsUseCase } from '@/app/get-destinations.use-case'
import { CreateDestinationUseCase } from '@/app/create-destination.use-case'
import { CalculateTripUseCase } from '@/app/calculate-trip.use-case'

export const getDestinationsUseCase = new GetDestinationsUseCase()
export const createDestinationUseCase = new CreateDestinationUseCase()
export const calculateTripUseCase = new CalculateTripUseCase()
