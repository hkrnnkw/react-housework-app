/* eslint-disable import/prefer-default-export */
import { House } from '../contexts/houses/constants'
import {
  DateObj,
  EveryXDays,
  EVERY_X_DAYS,
  Task,
  SpecificDate,
  SpecificDayOfWeek,
  SPECIFIC_DATE,
  SPECIFIC_DAY_OF_WEEK,
  TEMPORARY,
  Year,
} from '../utils/types'

const convertDayOfWeekToNum = (dayOfWeek: SpecificDayOfWeek): number => {
  switch (dayOfWeek) {
    case 'Sunday':
      return 0
    case 'Monday':
      return 1
    case 'Tuesday':
      return 2
    case 'Wednesday':
      return 3
    case 'Thursday':
      return 4
    case 'Friday':
      return 5
    case 'Saturday':
      return 6
    default:
      return 0
  }
}

export const getDateObj = (dateNum?: number): DateObj => {
  const date = dateNum ? new Date(dateNum) : new Date()
  return {
    yyyy: date.getFullYear(),
    mm: date.getMonth(),
    dd: date.getDate(),
    dayOfWeek: date.getDay(),
  } as DateObj
}

export const createLogs = (
  housework: House['housework'],
  existingLogs?: Year
): Year => {
  const { yyyy, mm, dd, dayOfWeek } = getDateObj()
  const logs: Year = existingLogs ? { ...existingLogs } : { [yyyy]: {} }
  const lastDayNum = new Date(yyyy, mm + 1, 0).getDate()

  const initDateObj = (monthNum: number, DayNum: number): boolean => {
    if (!logs[yyyy]) {
      Object.assign(logs, { [yyyy]: {} })
    }
    if (!logs[yyyy][monthNum]) {
      Object.assign(logs[yyyy], { [monthNum]: {} })
    }
    if (!logs[yyyy][monthNum][DayNum]) {
      Object.assign(logs[yyyy][monthNum], { [DayNum]: [] })
      return true
    }
    return false
  }

  Object.entries(housework).forEach(([houseworkId, val]) => {
    const { frequency, frequencyType, memberId } = val
    const task: Task = { memberId, houseworkId, isCompleted: false }
    switch (frequencyType) {
      case EVERY_X_DAYS: {
        const { days, times } = frequency as EveryXDays
        for (let day = dd + days - 1; day <= lastDayNum; day += days) {
          const didInit = initDateObj(mm, day)
          if (day !== dd || didInit) {
            for (let i = 0; i < times; i += 1) {
              logs[yyyy][mm][day].push(task)
            }
          }
        }
        break
      }
      case SPECIFIC_DAY_OF_WEEK: {
        const specificDaysOfWeek = frequency as SpecificDayOfWeek[]
        specificDaysOfWeek.forEach((dow) => {
          let diff = convertDayOfWeekToNum(dow) - dayOfWeek
          if (diff < 0) diff += 7
          for (let day = dd + diff; day <= lastDayNum; day += 7) {
            const didInit = initDateObj(mm, day)
            if (day !== dd || didInit) logs[yyyy][mm][day].push(task)
          }
        })
        break
      }
      case SPECIFIC_DATE: {
        const specificDates = frequency as SpecificDate[]
        specificDates.forEach(({ month, day }) => {
          if (month !== mm) return
          const didInit = initDateObj(month, day)
          if (day !== dd || didInit) logs[yyyy][month][day].push(task)
        })
        break
      }
      case TEMPORARY: {
        break
      }
      default: {
        break
      }
    }
  })
  return logs
}
