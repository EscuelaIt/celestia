import type { Destination } from '@/app/destination'
import type { Query } from '@/app/query'

export class GetDestinationsQry implements Query<Destination[]> {
  async execute(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new Error('Failed to fetch destinations')
    }
    const data: Destination[] = await response.json()
    return data
  }
}
