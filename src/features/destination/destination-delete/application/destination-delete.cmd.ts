import type { Command } from '@/shared-core/use-cases/command'
import type { Id } from '@/shared-core/types/id'
import type { DestinationRepository } from '@/features/destination/domain/destination.repository'
import type { InjectionToken } from '@/shared-core/dependency-injection/injection-token'

export class DestinationDeleteCmd implements Command<Id> {
  static readonly ID: InjectionToken = Symbol('DestinationDeleteCmd')

  constructor(private readonly destinationRepository: DestinationRepository) {}

  handle(id: Id): Promise<void> {
    return this.destinationRepository.delete(id)
  }
}
