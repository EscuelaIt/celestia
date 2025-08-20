import { UseCase } from '@/app/use-case'
import { Destination } from '@/components/destination'

export class GetDestinationsUseCase implements UseCase<void, Destination[]> {
  async execute(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data = await response.json()
    return data as Destination[]
  }
}
