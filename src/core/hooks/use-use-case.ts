import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import { createUseUseCase } from '@/shared-core/hooks/create-use-use-case'

export const useUseCase = createUseUseCase(CelestiaContainer.getInstance())
