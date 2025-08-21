import { GetDestinationsUseCase } from '@/app/get-destinations.use-case'
import { CreateDestinationUseCase } from '@/app/create-destination.use-case'

export const getDestinationsUseCase = new GetDestinationsUseCase()
export const createDestinationUseCase = new CreateDestinationUseCase()
