import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import type { UseCase } from '@/core/use-cases/use-case'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'

interface UseUseCaseReturn {
  execute: (params: unknown) => void
}

export function useUseCase(useCase: WithInjectionToken<AnyConstructor>): UseUseCaseReturn {
  const container = CelestiaContainer.getInstance()
  const useCaseService = container.get(UseCaseService)

  const useCaseInstance = container.get(useCase)

  return {
    execute: useCaseInstance.handle,
  }
}
