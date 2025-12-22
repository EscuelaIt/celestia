'use client'

import { CelestiaContainer } from '@/core/container/celestia-container'
import { EventEmitter, EventTypes } from '@/core/events/event-emitter'
import { useEffect } from 'react'
import { toast } from 'sonner'

export function useErrorListener() {
  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const eventEmitter = container.get(EventEmitter)

    const unsubscribe = eventEmitter.subscribe(EventTypes.ERROR, data => {
      toast.error(data.code, {
        description: data.message,
      })
    })

    return () => {
      unsubscribe()
    }
  }, [])
}
