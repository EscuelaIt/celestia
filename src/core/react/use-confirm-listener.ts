'use client'

import { useEffect, useState } from 'react'
import { EventEmitter, EventType } from '@/core/events/event-emitter'
import { CelestiaContainer } from '@/core/container/celestia-container'

export interface ConfirmOptions {
  confirm: string
}

export function useConfirmListener() {
  const [confirmOptions, setConfirmOptions] = useState<ConfirmOptions | null>(null)
  const [eventEmitter, setEventEmitter] = useState<EventEmitter | null>(null)

  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const emitter = container.get(EventEmitter)
    setEventEmitter(emitter)

    const unsubscribe = emitter.subscribe(EventType.CONFIRM, data => {
      setConfirmOptions(data as ConfirmOptions)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  const handleConfirm = () => {
    if (eventEmitter) {
      eventEmitter.dispatch(EventType.CONFIRMED, {})
      setConfirmOptions(null)
    }
  }

  const handleCancel = () => {
    if (eventEmitter) {
      eventEmitter.dispatch(EventType.CONFIRM_CANCELLED, {})
    }
    setConfirmOptions(null)
  }

  return { confirmOptions, handleConfirm, handleCancel }
}
