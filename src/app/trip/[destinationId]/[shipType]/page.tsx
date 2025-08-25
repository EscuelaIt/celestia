'use client'

import { useParams } from 'next/navigation'
import type { ShipType } from '@/features/trip/domain/ship-type'
import type { NextPage } from 'next'
import { TripResultsPage } from '@/features/trip/trip-results.page'

const Page: NextPage = () => {
  const params = useParams()
  const destinationId = params['destinationId'] as string
  const shipType = params['shipType'] as ShipType
  return <TripResultsPage calculateTrip={{ destinationId, shipType }} />
}
export default Page
