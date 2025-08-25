import type { Destination } from '@/features/destination/domain/destination'

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
}
