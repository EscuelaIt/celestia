export abstract class DomainError extends Error {
  protected constructor(
    readonly code: string,
    message: string,
  ) {
    super(message)
  }
}
