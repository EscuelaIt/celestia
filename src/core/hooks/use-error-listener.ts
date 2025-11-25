'use client'

import { useEffect, useState } from 'react'
import { EventEmitter, EventType } from '../event-emitter/event-emitter'
import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'

export function useErrorListener() {
  const [error, setError] = useState<Error | null>(null)
  const eventEmitter = CelestiaContainer.getInstance().get<EventEmitter>(EventEmitter.ID)

  useEffect(() => {
    const unsubscribe = eventEmitter.subscribe(EventType.ERROR, data => {
      setError(data as Error)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const clearError = () => {
    setError(null)
  }

  return { error, clearError }
}
