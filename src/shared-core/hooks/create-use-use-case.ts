import { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import type { UseCase, UseCaseParams, UseCaseReturn } from '@/shared-core/use-cases/use-case'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import { useCallback, useEffect, useState } from 'react'
import type { Container } from '@/shared-core/dependency-injection/container'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export type UseCaseState<T extends UseCase> = [
  execute: (params?: UseCaseParams<T>, options?: UseCaseOptions) => Promise<UseCaseReturn<T>>,
  { isLoading: boolean; data: UseCaseReturn<T> | undefined },
]

export function createUseUseCase(container: Container) {
  return function useUseCase<T extends UseCase>(
    useCaseClass: WithInjectionToken<AnyConstructor<T>>,
    options?: { immediate?: boolean; defaultOptions?: UseCaseParams<T> },
  ): UseCaseState<T> {
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<UseCaseReturn<T> | undefined>(undefined)

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
      async (params?: UseCaseParams<T>, options?: UseCaseOptions): Promise<UseCaseReturn<T>> => {
        const useCaseService = container.get(UseCaseService)
        setIsLoading(true)

        const result = await useCaseService.execute(useCaseClass, params, options)

        setIsLoading(false)

        return result
      },
      [useCaseClass],
    )

    return [execute, { isLoading, data }]
  }
}
