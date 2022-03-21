/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs'
import {
  DateObj,
  XTimesPerDay,
  X_TIMES_PER_DAY,
  EveryXDays,
  EVERY_X_DAYS,
  Task,
  SpecificDate,
  SpecificDayOfWeek,
  SPECIFIC_DATE,
  SPECIFIC_DAY_OF_WEEK,
  TEMPORARY,
  Year,
  HouseworkDetail,
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
  housework: { [id: string]: HouseworkDetail },
  logs: Year = {},
  currentDateObj: DateObj
): Year => {
  const { yyyy, mm, dd, dayOfWeek } = currentDateObj
  if (!logs[yyyy]) Object.assign(logs, { [yyyy]: {} })
  if (!logs[yyyy][mm]) Object.assign(logs[yyyy], { [mm]: {} })
  if (!logs[yyyy][mm][dd]) Object.assign(logs[yyyy][mm], { [dd]: [] })

  // @todo: do not create new tasks if it is dated before today
  const currentDate = dayjs(`${yyyy}-${mm + 1}-${dd}`)

  Object.entries(housework).forEach(([houseworkId, val]) => {
    const { frequency, frequencyType, memberId } = val
    const addTasks = (times = 1) => {
      const alreadyAdded = logs[yyyy][mm][dd].filter(
        (t) => t.houseworkId === houseworkId
      )
      for (let i = 0; i < times - alreadyAdded.length; i += 1) {
        const todoTask: Task = { memberId, houseworkId, isCompleted: false }
        logs[yyyy][mm][dd].push(todoTask)
      }
    }
    switch (frequencyType) {
      case X_TIMES_PER_DAY: {
        const { x } = frequency as XTimesPerDay
        addTasks(x)
        break
      }
      case EVERY_X_DAYS: {
        const { x } = frequency as EveryXDays
        const span = x - 1
        const max = span * 2
        const maxDate = currentDate.add(span, 'day')
        for (let i = 0; i <= max; i += 1) {
          const dt = maxDate.subtract(i, 'day')
          const y = dt.year()
          if (logs[y]) {
            const m = dt.month()
            if (logs[y][m]) {
              const d = dt.date()
              if (logs[y][m][d]) {
                const alreadyAdded = logs[y][m][d].find(
                  (t) => t.houseworkId === houseworkId
                )
                if (alreadyAdded) break
              }
            }
          }
          if (i === max) addTasks()
        }
        break
      }
      case SPECIFIC_DAY_OF_WEEK: {
        const specificDaysOfWeek = frequency as SpecificDayOfWeek[]
        specificDaysOfWeek.forEach((dow) => {
          if (convertDayOfWeekToNum(dow) === dayOfWeek) addTasks()
        })
        break
      }
      case SPECIFIC_DATE: {
        const specificDates = frequency as SpecificDate[]
        specificDates.forEach(({ month, day }) => {
          if (month === mm && day === dd) addTasks()
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
