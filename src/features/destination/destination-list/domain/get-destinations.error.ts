import { DomainError } from '@/core/errors/domain-error'

export class GetDestinationsError extends DomainError {
  constructor() {
    super('DESTINATION_LIST_GET_DESTINATIONS_ERROR', 'Failed to get destinations')
  }
}
