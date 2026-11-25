'use client'

import type { FC } from 'react'
import { useRouter } from 'next/navigation'
import { useUseCaseCompletedListener } from '@/shared-core/hooks/use-use-case-completed-listener'
import { CreateDestinationCmd } from '@/features/destination/destination-create/application/create-destination.cmd'
import { DestinationDeleteCmd } from '@/features/destination/destination-delete/application/destination-delete.cmd'

const DESTINATION_CHANGES = [CreateDestinationCmd, DestinationDeleteCmd]

// Whoever creates or deletes a destination does not need to know this list has to refresh
export const DestinationListRefresher: FC = () => {
  const router = useRouter()

  useUseCaseCompletedListener(DESTINATION_CHANGES, () => router.refresh())

  return null
}
