'use client'
import { useCallback, useEffect, useState } from 'react'
import type { UseCase, UseCaseParams, UseCaseReturn } from '@/core/use-cases/use-case'
import type { Container } from '@/core/container/container'
import type { AnyConstructor, WithInjectionToken } from '@/core/container/with-injection-token'
import { UseCaseService } from '@/core/use-cases/use-case-service'

/**
 * State returned by the useUseCase hook.
 */
export interface UseCaseState<T extends UseCase> {
  /** Whether the use case is currently executing */
  isLoading: boolean
  /** The data returned by the use case, if any */
  data: UseCaseReturn<T> | null
  /** Function to execute the use case */
  execute: (params?: UseCaseParams<T>) => Promise<UseCaseReturn<T>>
  /** Reset the state to its initial values */
  reset: () => void
}

/**
 * Options for the useUseCase hook.
 */
export interface UseUseCaseOptions<T extends UseCase> {
  /** Whether to execute the use case immediately on mount */
  immediate?: boolean
  /** Default parameters to pass to the use case */
  defaultParams?: UseCaseParams<T>
}

/**
 * Creates a curried useUseCase hook with dependency injection.
 *
 * @param container - The container instance to inject dependencies from
 * @returns A useUseCase hook function that uses the provided container
 *
 * @example
 * // Create the curried hook with container
 * const useUseCase = createUseUseCase(container);
 *
 * // Then use it as normal
 * const getUserQuery = useUseCase(GetUserQuery);
 * const { data, isLoading, execute } = getUserQuery;
 */
export function createUseUseCase(container: Container) {
  return function useUseCase<T extends UseCase>(
    useCaseClass: WithInjectionToken<AnyConstructor<T>>,
    options: UseUseCaseOptions<T> = {},
  ): UseCaseState<T> {
    const [isLoading, setIsLoading] = useState(!!options.immediate)
    const [data, setData] = useState<UseCaseReturn<T> | null>(null)

    const execute = useCallback(
      async (params?: UseCaseParams<T>): Promise<UseCaseReturn<T>> => {
        setIsLoading(true)
        try {
          const useCaseService = container.get(UseCaseService)

          const result = await useCaseService.execute(useCaseClass, params)

          setData(result)
          return result
        } finally {
          setIsLoading(false)
        }
      },
      [useCaseClass, container],
    )

    const reset = useCallback(() => {
      setIsLoading(false)
      setData(null)
    }, [])

    // Execute on mount if requested
    useEffect(() => {
      if (options.immediate) {
        execute(options.defaultParams)
      }
    }, [options.immediate])

    return {
      isLoading,
      data,
      execute,
      reset,
    }
  }
}
