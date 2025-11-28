import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export enum EventType {
  ERROR = 'error',
  SUCCESS = 'success',
  CONFIRM = 'confirm',
  CONFIRMED = 'confirmed',
}

type EventHandler = (data: unknown) => void

export class EventEmitter {
  static readonly ID: InjectionToken = Symbol('EventEmitter')

  private listeners: Map<EventType, EventHandler[]> = new Map()

  subscribe(event: EventType, handler: EventHandler): () => void {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }

    const handlers = this.listeners.get(event)!
    handlers.push(handler)

    // Return unsubscribe function
    return () => {
      const index = handlers.indexOf(handler)
      if (index !== -1) {
        handlers.splice(index, 1)
      }
    }
  }

  dispatch(event: EventType, data?: unknown): void {
    const handlers = this.listeners.get(event)
    if (handlers) {
      handlers.forEach(handler => handler(data))
    }
  }
}
