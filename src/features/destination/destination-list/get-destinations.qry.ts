import type { Destination } from '@/features/destination/destination'
import type { Query } from '@/core/use-cases/query'
import { GetDestinationsError } from '@/features/destination/destination-list/get-destinations.error'

export class GetDestinationsQry implements Query<Destination[]> {
  async handle(): Promise<Destination[]> {
    const response = await fetch('/api/destinations')
    if (!response.ok) {
      throw new GetDestinationsError()
    }
    const data = await response.json()
    return data as Destination[]
  }
}
