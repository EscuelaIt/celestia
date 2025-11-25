'use client'

import { useEffect, useState } from 'react'
import { eventEmitter } from '../dependency-injection/app-container'
import { EventType } from '../event-emitter/event-emitter'

export function useErrorListener() {
  const [error, setError] = useState<Error | null>(null)

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
