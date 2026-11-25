import { BaseContainer } from '@/shared-core/dependency-injection/base-container'
import type { Container } from '@/shared-core/dependency-injection/container'
import { EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'
import { LoggerMiddleware } from '@/shared-core/use-cases/middlewares/logger.middleware'
import { ErrorMiddleware } from '@/shared-core/use-cases/middlewares/error.middleware'
import { UseCaseService } from '@/shared-core/use-cases/use-case-service'
import { EventBus } from '@/shared-core/events/event-bus'
import { DateTransformer } from '@/features/destination/infrastructure/date.transformer'
import { DestinationFileRepository } from '@/features/destination/infrastructure/destination.file-repository'
import { SaveDestinationCmd } from '@/features/destination/destination-create/application/save-destination.cmd'
import { DestinationCreatedEvent } from '@/features/destination/domain/destination-created.event'
import { ConsoleNotifier } from '@/features/notification/infrastructure/console.notifier'
import { NotifyCrewOnDestinationCreatedHandler } from '@/features/notification/application/notify-crew-on-destination-created.handler'

const globalForCelestia = globalThis as unknown as {
  celestiaServer?: Container
}

// Only API routes import this container, so server only pieces like the file system never reach the browser bundle
export class CelestiaServerContainer extends BaseContainer {
  static getInstance(): Container {
    if (!globalForCelestia.celestiaServer) {
      globalForCelestia.celestiaServer = new CelestiaServerContainer()
    }
    return globalForCelestia.celestiaServer
  }

  private constructor() {
    super()
    this.registerArtifacts()
    this.registerRepositories()
    this.registerUseCases()
    this.registerEventSubscriptions()
  }

  private registerArtifacts() {
    const eventEmitter = new EventEmitter()
    const emptyMiddleware = new EmptyMiddleware()
    const errorMiddleware = new ErrorMiddleware(eventEmitter)
    const loggerMiddleware = new LoggerMiddleware()
    const useCaseService = new UseCaseService([errorMiddleware, loggerMiddleware], this)
    const eventBus = new EventBus(useCaseService)
    const dateTransformer = new DateTransformer()

    eventEmitter.subscribe(EventType.ERROR, error => console.error('Use case failed:', error))

    this.register(eventEmitter)
    this.register(emptyMiddleware)
    this.register(errorMiddleware)
    this.register(loggerMiddleware)
    this.register(useCaseService)
    this.register(eventBus)
    this.register(dateTransformer)
  }

  private registerRepositories() {
    const destinationFileRepository = new DestinationFileRepository(this.get(DateTransformer))
    const consoleNotifier = new ConsoleNotifier()

    this.register(destinationFileRepository)
    this.register(consoleNotifier)
  }

  private registerUseCases() {
    const saveDestinationCmd = new SaveDestinationCmd(this.get(DestinationFileRepository), this.get(EventBus))

    const notifyCrewOnDestinationCreatedHandler = new NotifyCrewOnDestinationCreatedHandler(this.get(ConsoleNotifier))

    this.register(saveDestinationCmd)
    this.register(notifyCrewOnDestinationCreatedHandler)
  }

  // The destination feature publishes without knowing who listens; this is the one place that connects them
  private registerEventSubscriptions() {
    const eventBus = this.get(EventBus)

    eventBus.subscribe(DestinationCreatedEvent.NAME, NotifyCrewOnDestinationCreatedHandler)
  }
}
