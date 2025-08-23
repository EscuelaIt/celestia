import type { Destination } from '@/models/destination'
import type { Query } from '@/use-cases/query'

export class GetDestinationsQry implements Query<Destination[]> {
  async handle(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data: Destination[] = await response.json()
    return data
  }
}
