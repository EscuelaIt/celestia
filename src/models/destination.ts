import type { Id } from '@/models/id'

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
