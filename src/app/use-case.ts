export interface UseCase<In, Out> {
  execute(input: In): Promise<Out>
}

type CreateDestination = {
  name: string
  distance: number
  description: string
  travelTime: {
    classic: number
    advanced: number
  }
  emoji: string
}

export class CreateDestinationUseCase implements UseCase<CreateDestination, void> {
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
