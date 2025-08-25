export interface DestinationDto {
  id: string
  name: string
  creationDate: string
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  emoji: string
}
