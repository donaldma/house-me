import moment from 'moment'
import { ErrorService } from '../services/ErrorService'

// example: `hello` => `Hello`
export const capitalizeFirstLetter = (value: string) => value.charAt(0).toUpperCase() + value.slice(1)

// example: `thisIsAnExample` => `This Is An Example`
export const apiResponseToDisplayString = (value: string) => {
  const split = value.split(/(?=[A-Z])/).map((x) => capitalizeFirstLetter(x))

  return split.join(' ')
}

// example: 5000 => `$50.00`
export const apiPricesToDisplayString = (price: number) => `$${(price / 100).toFixed(2)}`

export const apiPricesToFixed2 = (price: number) => (price / 100).toFixed(2)

export const apiDatesToDisplayString = (date: moment.MomentInput) => moment(date).format('LL')

/**
 * example:
 * const json = { a: 'a', b: 'b' }
 * jsonToQueryString(json) => `a=a&b=b`
 */
export const jsonToQueryString = (json: any) => {
  return Object.keys(json)
    .filter((key) => json[key] !== undefined || null)
    .map((key) => {
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
    .join('&')
}

export const formatDate = (date: moment.MomentInput) => moment(date).format('YYYY-MM-DD')

export const formatRequestPrice = (price: any) => parseInt((price * 100).toFixed(0))
