import { DomainError } from '@/shared-core/error/domain-error'

export class DestinationNameDuplicatedError extends DomainError {
  constructor() {
    super('DESTINATION_DUPLICATED_NAME', `Can't duplicate destination name.`)
  }
}
