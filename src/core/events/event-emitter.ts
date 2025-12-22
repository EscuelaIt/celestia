import type { InjectionToken } from '@/core/container/injection-token'
import type { DomainError } from '@/core/errors/domain-error'

export const EventTypes = {
  SUCCESS: 'success',
  CONFIRM: 'confirm',
  CONFIRMED: 'confirmed',
  ERROR: 'error',
} as const

export type EventType = (typeof EventTypes)[keyof typeof EventTypes]

type EventPayloads = {
  success: string
  confirm: string
  confirmed: undefined
  error: DomainError
}

type EventHandler<T extends EventType> = (data: EventPayloads[T]) => void

export class EventEmitter {
  static readonly id: InjectionToken = Symbol('EventEmitter')

  private readonly listeners: {
    [K in EventType]?: EventHandler<K>[]
  } = {}

  subscribe<T extends EventType>(event: T, handler: EventHandler<T>): () => void {
    const handlers: EventHandler<T>[] = (this.listeners[event] ??= [])
    handlers.push(handler)

    return () => {
      const index = handlers.indexOf(handler)
      if (index !== -1) handlers.splice(index, 1)
    }
  }

  dispatch<T extends EventType>(event: T, data: EventPayloads[T]): void {
    this.listeners[event]?.forEach(handler => handler(data))
  }
}
