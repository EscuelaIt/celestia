import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import type { UseCase, UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'
import { useCallback } from 'react'

export interface UseCaseState<T extends UseCase> {
  /** Function to execute the use case */
  execute: (params?: UseCaseParams<T>) => Promise<UseCaseReturn<T>>
}

export function useUseCase<T extends UseCase>(useCaseClass: WithInjectionToken<AnyConstructor<T>>): UseCaseState<T> {
  const container = CelestiaContainer.getInstance()

  const execute = useCallback(
    async (params?: UseCaseParams<T>): Promise<UseCaseReturn<T>> => {
      const useCaseService = container.get(UseCaseService)

      const result = await useCaseService.execute(useCaseClass, params)

      return result
    },
    [useCaseClass],
  )
  return {
    execute,
  }
}
