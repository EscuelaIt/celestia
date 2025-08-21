export interface Destination {
  id: string
  name: string
  distance: number // in million km
  description: string
  travelTime: {
    classic: number // in days
    advanced: number // in days
  }
  emoji: string
}
