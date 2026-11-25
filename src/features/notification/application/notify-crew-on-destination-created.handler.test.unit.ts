import { describe, it } from 'vitest'
import { instance, mock, verify } from '@typestrong/ts-mockito'
import { NotifyCrewOnDestinationCreatedHandler } from '@/features/notification/application/notify-crew-on-destination-created.handler'
import type { Notifier } from '@/features/notification/domain/notifier'
import { DestinationCreatedEvent } from '@/features/destination/domain/destination-created.event'
import { DestinationMother } from '@/features/destination/tests/destination.mother'

describe('NotifyCrewOnDestinationCreatedHandler', () => {
  it('should tell the crew the new destination is open for trips', async () => {
    const { notifyCrewOnDestinationCreatedHandler, notifier } = setup()

    await notifyCrewOnDestinationCreatedHandler.handle(new DestinationCreatedEvent(DestinationMother.newSaturn()))

    verify(notifier.notify('🪐 Saturn is now open for trips')).once()
  })
})

function setup() {
  const notifier = mock<Notifier>()
  const notifyCrewOnDestinationCreatedHandler = new NotifyCrewOnDestinationCreatedHandler(instance(notifier))

  return { notifyCrewOnDestinationCreatedHandler, notifier }
}
