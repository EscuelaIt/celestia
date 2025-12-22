import { createGetUseCase } from '@/shared-core/hooks/create-get-use-case'
import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'

export const getUseCase = createGetUseCase(CelestiaContainer.getInstance())
