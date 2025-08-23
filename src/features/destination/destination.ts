import type { Id } from '@/core/types/id'

export interface Destination {
  id: Id
  name: string
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  emoji: string
}
