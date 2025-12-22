'use client'

import { useEffect, useState } from 'react'
import { EventEmitter, EventTypes } from '@/core/events/event-emitter'
import { CelestiaContainer } from '@/core/container/celestia-container'

export function useConfirmListener() {
  const [confirm, setConfirm] = useState<string | null>(null)
  const [eventEmitter, setEventEmitter] = useState<EventEmitter | null>(null)

  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const emitter = container.get(EventEmitter)
    setEventEmitter(emitter)

    const unsubscribe = emitter.subscribe(EventTypes.CONFIRM, data => {
      setConfirm(data)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleConfirm = () => {
    if (eventEmitter) {
      eventEmitter.dispatch(EventTypes.CONFIRMED, undefined)
      setConfirm(null)
    }
  }

  const handleCancel = () => {
    setConfirm(null)
  }

  return { confirm, handleConfirm, handleCancel }
}
