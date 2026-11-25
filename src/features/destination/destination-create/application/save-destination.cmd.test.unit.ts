import { describe, expect, it } from 'vitest'
import { anything, capture, deepEqual, instance, mock, verify, when } from '@typestrong/ts-mockito'
import { SaveDestinationCmd } from '@/features/destination/destination-create/application/save-destination.cmd'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import { DestinationMother } from '@/features/destination/tests/destination.mother'
import { EventBus } from '@/shared-core/events/event-bus'
import { DestinationCreatedEvent } from '@/features/destination/domain/destination-created.event'
import { DestinationNameDuplicatedError } from '@/features/destination/domain/destination-name-duplicated.error'

describe('SaveDestinationCmd', () => {
  it('should save the destination', async () => {
    const { saveDestinationCmd, destinationRepository } = setup()

    await saveDestinationCmd.handle(DestinationMother.newSaturn())

    verify(destinationRepository.create(deepEqual(DestinationMother.newSaturn()))).once()
  })

  it('should publish that the destination was created', async () => {
    const { saveDestinationCmd, eventBus } = setup()

    await saveDestinationCmd.handle(DestinationMother.newSaturn())

    const [event] = capture(eventBus.publish).last()
    expect(event).toEqual(new DestinationCreatedEvent(DestinationMother.newSaturn(), event.occurredOn))
  })

  it('should not publish anything when the name is duplicated', async () => {
    const { saveDestinationCmd, destinationRepository, eventBus } = setup()
    when(destinationRepository.findAll()).thenResolve([{ ...DestinationMother.europe(), name: 'Saturn' }])

    const saving = saveDestinationCmd.handle(DestinationMother.newSaturn())

    await expect(saving).rejects.toBeInstanceOf(DestinationNameDuplicatedError)
    verify(eventBus.publish(anything())).never()
  })
})

function setup() {
  const destinationRepository = mock<DestinationRepository>()
  const eventBus = mock(EventBus)
  when(destinationRepository.findAll()).thenResolve([DestinationMother.europe()])
  const saveDestinationCmd = new SaveDestinationCmd(instance(destinationRepository), instance(eventBus))

  return { saveDestinationCmd, destinationRepository, eventBus }
}
