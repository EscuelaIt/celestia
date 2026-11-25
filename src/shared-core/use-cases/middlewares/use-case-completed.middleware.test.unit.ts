import { describe, expect, it } from 'vitest'
import { anything, capture, instance, mock, verify } from '@typestrong/ts-mockito'
import { UseCaseCompletedMiddleware } from '@/shared-core/use-cases/middlewares/use-case-completed.middleware'
import { EventEmitter, EventType } from '@/shared-core/event-emitter/event-emitter'
import { UseCaseHandler } from '@/shared-core/use-cases/use-case-handler'
import { EmptyMiddleware } from '@/shared-core/use-cases/middlewares/empty.middleware'
import type { Command } from '@/shared-core/use-cases/command'

describe('UseCaseCompletedMiddleware', () => {
  it('should announce which use case completed', async () => {
    const { useCaseCompletedMiddleware, eventEmitter } = setup()

    await useCaseCompletedMiddleware.intercept('Saturn', wrap(new LaunchRocketCmd()))

    const [eventType, useCaseCompleted] = capture(eventEmitter.dispatch).last()
    expect([eventType, useCaseCompleted]).toEqual([
      EventType.USE_CASE_COMPLETED,
      { useCaseId: LaunchRocketCmd.ID, params: 'Saturn', result: 'Launched to Saturn' },
    ])
  })

  it('should not announce anything when the use case fails', async () => {
    const { useCaseCompletedMiddleware, eventEmitter } = setup()

    const intercepting = useCaseCompletedMiddleware.intercept('Saturn', new AbortLaunchCmd())

    await expect(intercepting).rejects.toThrow('Launch aborted')
    verify(eventEmitter.dispatch(anything(), anything())).never()
  })
})

class LaunchRocketCmd implements Command<string, string> {
  static readonly ID = Symbol('LaunchRocketCmd')

  async handle(destination: string): Promise<string> {
    return `Launched to ${destination}`
  }
}

class AbortLaunchCmd implements Command<string> {
  static readonly ID = Symbol('AbortLaunchCmd')

  async handle(): Promise<void> {
    throw new Error('Launch aborted')
  }
}

function wrap(useCase: Command<string, string>) {
  return UseCaseHandler.create({ useCase, middleware: new EmptyMiddleware(), options: {} })
}

function setup() {
  const eventEmitter = mock(EventEmitter)
  const useCaseCompletedMiddleware = new UseCaseCompletedMiddleware(instance(eventEmitter))

  return { useCaseCompletedMiddleware, eventEmitter }
}
