import { createUseUseCase } from '@/core/react/create-use-use-case'
import { CelestiaContainer } from '@/core/container/celestia-container'

export const useUseCase = createUseUseCase(CelestiaContainer.getInstance())
