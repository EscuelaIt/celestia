import type { Destination } from '@/features/destination/domain/destination'
import type { CreateDestination } from '@/features/destination/destination-create/domain/create-destination'

export class DestinationMother {
  static europe(): Destination {
    return {
      id: 'europa',
      name: 'Europa',
      creationDate: new Date('2023-01-01'),
      distance: 628,
      description: "Jupiter's moon with oceans beneath its frozen surface",
      travelTime: {
        classic: 580,
        advanced: 300,
      },
      emoji: '🧊',
    }
  }

  static newSaturn(): CreateDestination {
    return {
      name: 'Saturn',
      creationDate: new Date('2025-01-01'),
      distance: 1275,
      description: 'The ringed giant with beautiful ice formations',
      travelTime: {
        classic: 900,
        advanced: 450,
      },
      emoji: '🪐',
    }
  }
}
