'use client'

import { CelestiaContainer } from '@/core/container/celestia-container'
import { EventEmitter, EventType } from '@/core/events/event-emitter'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function useSuccessListener() {
  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const eventEmitter = container.get(EventEmitter)

    const unsubscribe = eventEmitter.subscribe(EventType.SUCCESS, data => {
      console.log({ data })
      toast.success(data as string)
    })

    return () => {
      unsubscribe()
    }
  }, [])
}
