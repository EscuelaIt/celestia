import type { Destination } from '@/app/models/destination'
import type { Query } from '@/app/use-cases/query'

export class GetDestinationsQry implements Query<Destination[]> {
  async execute(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data = await response.json()
    return data as Destination[]
  }
}
