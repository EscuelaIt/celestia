'use client'

import { TripResultsPage } from '@/features/trip/delivery/trip-results.page'
import type { NextPage } from 'next'
import { useParams } from 'next/navigation'
import type { Id } from '@/core/types/id'
import type { ShipType } from '@/features/trip/domain/ship-type'

const Page: NextPage = () => {
  const params = useParams()

  const destinationId = params['destinationId'] as Id
  const shipType = params['shipType'] as ShipType

  return <TripResultsPage calculateTrip={{ destinationId, shipType }}></TripResultsPage>
}
export default Page
