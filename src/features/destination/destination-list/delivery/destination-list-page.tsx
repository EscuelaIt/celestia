import { DestinationSelector } from '@/features/destination/destination-list/delivery/destination-selector'
import { type FC } from 'react'
import { GetDestinationsQry } from '@/features/destination/destination-list/application/get-destinations.qry'
import { getUseCase } from '@/core/react/get-use-case'
import { Page } from '@/core/components/page'

export const DestinationListPage: FC = async () => {
  const [getDestinationsQry] = getUseCase(GetDestinationsQry)
  const destinations = await getDestinationsQry()

  return (
    <Page>
      <DestinationSelector destinations={destinations} />
    </Page>
  )
}
