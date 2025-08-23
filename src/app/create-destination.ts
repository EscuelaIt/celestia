export interface CreateDestination {
  name: string
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  emoji: string
}
