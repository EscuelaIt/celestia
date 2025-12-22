import { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import type { UseCase, UseCaseParams, UseCaseReturn } from '@/shared-core/use-cases/use-case'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import type { Container } from '@/shared-core/dependency-injection/container'
import type { UseCaseOptions } from '@/shared-core/use-cases/use-case-options'

export type UseCaseState<T extends UseCase> = [
  execute: (params?: UseCaseParams<T>, options?: UseCaseOptions) => Promise<UseCaseReturn<T>>,
]

export function createGetUseCase(container: Container) {
  return function getUseCase<T extends UseCase>(useCaseClass: WithInjectionToken<AnyConstructor<T>>): UseCaseState<T> {
    return [
      (params?: UseCaseParams<T>, options?: UseCaseOptions) => {
        const useCaseService = container.get(UseCaseService)
        return useCaseService.execute(useCaseClass, params, options)
      },
    ]
  }
}
