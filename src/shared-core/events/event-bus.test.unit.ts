import { describe, expect, it } from 'vitest'
import { anything, instance, mock, verify, when } from '@typestrong/ts-mockito'
import { EventBus } from '@/shared-core/events/event-bus'
import { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import type { DomainEvent } from '@/shared-core/events/domain-event'
import type { EventHandler } from '@/shared-core/events/event-handler'
import type { Container } from '@/shared-core/dependency-injection/container'
import type { Middleware } from '@/shared-core/use-cases/middlewares/middleware'
import type { UseCase } from '@/shared-core/use-cases/use-case'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'

describe('EventBus', () => {
  it('should run every handler subscribed to the event through the use case service', async () => {
    const { eventBus, useCaseService } = setup()
    eventBus.subscribe(PlanetDiscovered.NAME, SendNewsletterHandler)
    eventBus.subscribe(PlanetDiscovered.NAME, UpdateStarMapHandler)
    const planetDiscovered = new PlanetDiscovered()

    await eventBus.publish(planetDiscovered)

    verify(useCaseService.execute(SendNewsletterHandler, planetDiscovered)).once()
    verify(useCaseService.execute(UpdateStarMapHandler, planetDiscovered)).once()
  })

  it('should not run handlers subscribed to other events', async () => {
    const { eventBus, useCaseService } = setup()
    eventBus.subscribe('PlanetDestroyed', SendNewsletterHandler)

    await eventBus.publish(new PlanetDiscovered())

    verify(useCaseService.execute(anything(), anything())).never()
  })

  it('should keep running the other handlers when one fails', async () => {
    const { eventBus, useCaseService } = setup()
    eventBus.subscribe(PlanetDiscovered.NAME, SendNewsletterHandler)
    eventBus.subscribe(PlanetDiscovered.NAME, UpdateStarMapHandler)
    const planetDiscovered = new PlanetDiscovered()
    when(useCaseService.execute(SendNewsletterHandler, planetDiscovered)).thenReject(new Error('Mail server down'))

    const publishing = eventBus.publish(planetDiscovered)

    await expect(publishing).resolves.toBeUndefined()
    verify(useCaseService.execute(UpdateStarMapHandler, planetDiscovered)).once()
  })

  it('should run handlers through the use case middlewares', async () => {
    const recordingMiddleware = new RecordingMiddleware()
    const container = mock<Container>()
    when(container.get(SendNewsletterHandler)).thenReturn(new SendNewsletterHandler())
    when(container.get(EmptyMiddleware)).thenReturn(new EmptyMiddleware())
    const eventBus = new EventBus(new UseCaseService([recordingMiddleware], instance(container)))
    eventBus.subscribe(PlanetDiscovered.NAME, SendNewsletterHandler)
    const planetDiscovered = new PlanetDiscovered()

    await eventBus.publish(planetDiscovered)

    expect(recordingMiddleware.interceptedParams).toEqual([planetDiscovered])
  })
})

class PlanetDiscovered implements DomainEvent {
  static readonly NAME = 'PlanetDiscovered'
  readonly name = PlanetDiscovered.NAME
  readonly occurredOn = new Date('2025-01-01')
}

class SendNewsletterHandler implements EventHandler<PlanetDiscovered> {
  static readonly ID = Symbol('SendNewsletterHandler')

  async handle(): Promise<void> {}
}

class UpdateStarMapHandler implements EventHandler<PlanetDiscovered> {
  static readonly ID = Symbol('UpdateStarMapHandler')

  async handle(): Promise<void> {}
}

class RecordingMiddleware implements Middleware {
  readonly interceptedParams: unknown[] = []

  intercept(params: unknown, useCase: UseCase): Promise<unknown> {
    this.interceptedParams.push(params)
    return useCase.handle(params)
  }
}

function setup() {
  const useCaseService = mock(UseCaseService)
  const eventBus = new EventBus(instance(useCaseService))

  return { eventBus, useCaseService }
}
