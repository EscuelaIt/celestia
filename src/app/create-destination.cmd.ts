import type { CreateDestination } from '@/app/create-destination'
import type { Command } from '@/app/command'

export class CreateDestinationCmd implements Command<CreateDestination> {
  async execute(createDestination: CreateDestination): Promise<void> {
    const response = await fetch('/api/destinations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(createDestination),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Failed to add destination')
    }
  }
}
