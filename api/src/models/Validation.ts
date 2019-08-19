import { ValidationError, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator'
import { validateSync } from 'class-validator'
import { ArgumentError } from './Error'
import _ from 'lodash'
import moment from 'moment'

export const validateWithThrow = (object: any): void => {
  const validations = validateSync(object, { skipMissingProperties: true })
  const errorMessage = getErrorMessageFromValidation(validations)
  if (errorMessage) {
    throw new ArgumentError('validationError', errorMessage)
  }
  return
}

export const getErrorMessageFromValidation = (validations: ValidationError[]): string | null => {
  for (const validation of validations) {
    const errorMessage = validateSingularError(validation)
    if (errorMessage) {
      return errorMessage
    }
  }

  return null
}

const validateSingularError = (validation: ValidationError): string | null => {
  const constraints = validation.constraints
  for (const key in constraints) {
    if (constraints[key]) {
      return constraints[key]
    }
  }
  for (const child of validation.children) {
    const errorMessage = validateSingularError(child)
    if (errorMessage) {
      return errorMessage
    }
  }
  return null
}

export const isUpdateRequired = (request: any): boolean => {
  return !Object.values(request).every((x) => x === undefined)
}

export const isNumber = (value: any): boolean => _.isFinite(parseInt(value))

@ValidatorConstraint({ name: 'latitude' })
export class ValidLatitude implements ValidatorConstraintInterface {
  validate(latitude: string) {
    const latRegExp = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/

    return latRegExp.test(latitude)
  }

  defaultMessage() {
    return 'Invalid latitiude, valid example: 49.2827'
  }
}

@ValidatorConstraint({ name: 'longitude' })
export class ValidLongitude implements ValidatorConstraintInterface {
  validate(longitude: string) {
    const lngRegExp = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/

    return lngRegExp.test(longitude)
  }

  defaultMessage() {
    return 'Invalid longitude, valid example: -123.1207'
  }
}

@ValidatorConstraint({ name: 'startDate' })
export class ValidStartDate implements ValidatorConstraintInterface {
  validate(startDate: string) {
    return moment(startDate, 'YYYY-MM-DD', true).isValid()
  }

  defaultMessage() {
    return 'Invalid start date'
  }
}

@ValidatorConstraint({ name: 'endDate' })
export class ValidEndDate implements ValidatorConstraintInterface {
  validate(endDate: string) {
    return moment(endDate, 'YYYY-MM-DD', true).isValid()
  }

  defaultMessage() {
    return 'Invalid end date'
  }
}
