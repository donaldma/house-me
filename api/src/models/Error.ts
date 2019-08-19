export class ArgumentError extends Error {
  parameter: string
  message: string

  constructor(parameter: string, message: string) {
    super()
    this.parameter = parameter
    this.message = message
  }
}

export class NotAuthenticationError extends Error {
  message: string

  constructor(message?: string) {
    super()
    this.message = message || `Unauthenticated request`
  }
}

export class NotFoundError extends Error {
  parameter: string
  message: string

  constructor(parameter: string, message?: string) {
    super()
    this.parameter = parameter
    this.message = message || ''
  }
}

export class NotAuthorizedError extends Error {
  message: string

  constructor(message?: string) {
    super()
    this.message = message || `Not authorized`
  }
}
