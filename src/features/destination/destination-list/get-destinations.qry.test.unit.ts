import { describe, expect, it } from 'vitest'
import { GetDestinationsQry } from './get-destinations.qry'
import type { DestinationRepository } from '@/features/destination/destination.repository'
import { DestinationMother } from '@/features/destination/destination.mother'
import { instance, mock, when } from '@typestrong/ts-mockito'

describe('GetDestinationsQry', () => {
  it('should get destinations', async () => {
    const { getDestinationsQry, destinationRepository } = setup()
    when(destinationRepository.findAll()).thenResolve([DestinationMother.europe()])

    const result = await getDestinationsQry.handle()

    expect(result).toEqual([DestinationMother.europe()])
  })

  it('should get empty array if there are no destinations', async () => {
    const { getDestinationsQry, destinationRepository } = setup()
    when(destinationRepository.findAll()).thenResolve([])

    const result = await getDestinationsQry.handle()

    expect(result).toEqual([])
  })
})

function setup() {
  const destinationRepository = mock<DestinationRepository>()
  const getDestinationsQry = new GetDestinationsQry(instance(destinationRepository))

  return { destinationRepository, getDestinationsQry }
}
