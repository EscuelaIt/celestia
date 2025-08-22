import { DomainError } from '@/core/errors/domain-error'

export class CalculateTripError extends DomainError {
  constructor() {
    super('TRIP_CALCULATE_ERROR', 'Failed to calculate trip')
  }
}
