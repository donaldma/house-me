import currencyFormatter from 'currency-formatter'
import { Currency } from '../models/Common'

export default {
  formatCurrency: (amount: number, currency: Currency = Currency.Canada) => {
    return currencyFormatter.format(amount / 100, { code: currency })
  },

  enumToArray: (E: any) => {
    return Object.keys(E).map((k) => E[k as any])
  },

  jsonToQueryString: (json: any) => {
    return Object.keys(json)
      .filter((key) => json[key] !== undefined || null)
      .map((key) => {
        return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
      })
      .join('&')
  }
}
