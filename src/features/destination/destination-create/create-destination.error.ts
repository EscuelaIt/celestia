import { DomainError } from '@/core/errors/domain-error'

export class CreateDestinationError extends DomainError {
  constructor(message: string) {
    super('DESTINATION_CREATE_ERROR', `Failed to create destination: ${message}`)
  }
}
