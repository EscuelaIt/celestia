import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import { UseCaseService } from '@/core/use-cases/use-case-service'
import type { UseCase, UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { WithInjectionToken } from '@/core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/core/types/any-constructor'
import { useCallback, useEffect, useState } from 'react'

export type UseCaseState<T extends UseCase> = [
  execute: (params?: UseCaseParams<T>) => Promise<UseCaseReturn<T>>,
  { isLoading: boolean; data: UseCaseReturn<T> | undefined },
]

export function useUseCase<T extends UseCase>(
  useCaseClass: WithInjectionToken<AnyConstructor<T>>,
  options?: { immediate?: boolean; defaultOptions?: UseCaseParams<T> },
): UseCaseState<T> {
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<UseCaseReturn<T> | undefined>(undefined)
  const container = CelestiaContainer.getInstance()

  useEffect(() => {
    async function executeImmediately() {
      const result = await execute(options?.defaultOptions)
      setData(result)
    }

    if (options?.immediate) {
      executeImmediately()
    }
  }, [])

  const execute = useCallback(
    async (params?: UseCaseParams<T>): Promise<UseCaseReturn<T>> => {
      const useCaseService = container.get(UseCaseService)
      setIsLoading(true)

      const result = await useCaseService.execute(useCaseClass, params)

      setIsLoading(false)

      return result
    },
    [useCaseClass],
  )

  return [execute, { isLoading, data }]
}
