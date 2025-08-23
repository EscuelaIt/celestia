import { CreateDestinationUseCase } from '@/app/create-destination.use-case'
import { GetDestinationsUseCase } from '@/app/get-destinations.use-case'
import { CalculateTripUseCase } from '@/app/calculate-trip.use-case'

export const createDestinationUseCase = new CreateDestinationUseCase()
export const getDestinationsUseCase = new GetDestinationsUseCase()
export const calculateTripUseCase = new CalculateTripUseCase()
