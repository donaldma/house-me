import moment from 'moment'
import { ArgumentError } from '../models/Error'

const isDateBeforeNow = (date: string) => moment(date).isBefore(moment(), 'day')

const isDateSameOrBefore = (date1: string, date2: string) =>
  moment(date2).isSameOrBefore(moment(date1), 'day')

const getNightsBetweenDates = (startDate: string, endDate: string): number =>
  moment(endDate).diff(moment(startDate), 'days')

const getFormattedDate = (date: moment.MomentInput = new Date(), daysToAdd: number = 0) =>
  moment(date)
    .add(daysToAdd, 'days')
    .format('YYYY-MM-DD')

export default {
  getNightsBetweenDates: getNightsBetweenDates,

  isDateBeforeNow: isDateBeforeNow,

  isDateSameOrBefore: isDateSameOrBefore,

  isDateAfterToday: (date: string) => {
    return moment().isAfter(moment(date))
  },

  isTodayBetweenDates: (date1: string, date2: string) => {
    const startDate = moment(date1)
    const endDate = moment(date2)
    return moment().isBetween(startDate, endDate)
  },

  getDaysUntilDate: (date: string) => {
    const today = moment().toISOString()
    return getNightsBetweenDates(today, date)
  },

  getUserFormattedDate: (date: string) => moment(date).format('LL'),

  getFormattedDate: getFormattedDate,

  getNowString: () => moment().toISOString(),

  getDatesBetweenAsStrings: (date1: string, date2: string) => {
    const dateArray: string[] = []
    let tempDate = date1
    while (isDateSameOrBefore(date2, tempDate)) {
      dateArray.push(getFormattedDate(tempDate))
      tempDate = getFormattedDate(tempDate, 1)
    }

    return dateArray
  },

  validateStartEndDates: (date1: string, date2: string) => {
    if (isDateBeforeNow(date1)) {
      throw new ArgumentError('startDate', 'Start date cannot be in the past')
    }
    if (isDateSameOrBefore(date1, date2)) {
      throw new ArgumentError('endDate', 'End date cannot be the same or before start date')
    }
  }
}
