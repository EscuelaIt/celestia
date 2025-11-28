import { useEffect, useState } from 'react'
import { EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { CelestiaContainer } from '@/core/dependency-injection/celestia-container'

export function useConfirmListener() {
  const [confirmOptions, setConfirmOptions] = useState<string | undefined>(undefined)

  useEffect(() => {
    const container = CelestiaContainer.getInstance()
    const eventEmitter = container.get(EventEmitter)

    const unsubscribe = eventEmitter.subscribe(EventType.CONFIRM, data => {
      setConfirmOptions(data as string)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  function handleConfirmed() {
    const container = CelestiaContainer.getInstance()
    const eventEmitter = container.get(EventEmitter)

    eventEmitter.dispatch(EventType.CONFIRMED)
    setConfirmOptions(undefined)
  }

  function handleCancel() {
    setConfirmOptions(undefined)
  }

  return {
    confirm: confirmOptions,
    handleCancel,
    handleConfirmed,
  }
}
