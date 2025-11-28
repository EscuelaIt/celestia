import { useEffect } from 'react'
import { EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'
import { toast } from 'sonner'

export function useSuccessListener() {
  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const eventEmitter = container.get(EventEmitter)

    const unsubscribe = eventEmitter.subscribe(EventType.SUCCESS, data => {
      toast.success(data as string)
    })

    return () => {
      unsubscribe()
    }
  }, [])
}
