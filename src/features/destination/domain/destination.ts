import type { Id } from '@/shared-core/types/id'

export interface Destination {
  id: Id
  name: string
  creationDate: Date
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  emoji: string
}
