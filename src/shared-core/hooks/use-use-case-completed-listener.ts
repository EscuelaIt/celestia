import { useEffect } from 'react'
import { EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import type { WithInjectionToken } from '@/shared-core/dependency-injection/with-injection-token'
import type { AnyConstructor } from '@/shared-core/types/any-constructor'
import type { UseCaseCompleted } from '@/shared-core/use-cases/middlewares/use-case-completed.middleware'

export function useUseCaseCompletedListener(
  useCaseClasses: WithInjectionToken<AnyConstructor<UseCase>>[],
  onCompleted: (useCaseCompleted: UseCaseCompleted) => void,
) {
  useEffect(() => {
    const eventEmitter = CelestiaContainer.getInstance().get(EventEmitter)

    const unsubscribe = eventEmitter.subscribe(EventType.USE_CASE_COMPLETED, data => {
      const useCaseCompleted = data as UseCaseCompleted
      if (useCaseClasses.some(useCaseClass => useCaseClass.ID === useCaseCompleted.useCaseId)) {
        onCompleted(useCaseCompleted)
      }
    })

    return () => {
      unsubscribe()
    }
  }, [useCaseClasses, onCompleted])
}
