import { DomainError } from '@/shared-core/error/domain-error'

export class GetDestinationsError extends DomainError {
  constructor() {
    super('DESTINATIONS_NOT_FOUND', 'No destinations found.')
  }
}
