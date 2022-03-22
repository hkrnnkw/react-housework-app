/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs'
import { House } from '../contexts/houses/constants'
import {
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
  Log,
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

const japaneseLocalizeDayOfWeek = (dayOfWeek: SpecificDayOfWeek): string => {
  switch (dayOfWeek) {
    case 'Sunday':
      return '日'
    case 'Monday':
      return '月'
    case 'Tuesday':
      return '火'
    case 'Wednesday':
      return '水'
    case 'Thursday':
      return '木'
    case 'Friday':
      return '金'
    case 'Saturday':
      return '土'
    default:
      return ''
  }
}

export const makeFrequencyText = (
  frequency: HouseworkDetail['frequency'],
  frequencyType: HouseworkDetail['frequencyType']
): string => {
  switch (frequencyType) {
    case X_TIMES_PER_DAY: {
      const { x } = frequency as XTimesPerDay
      return `1日に${x}回`
    }
    case EVERY_X_DAYS: {
      const { x } = frequency as EveryXDays
      return `${x}日ごと`
    }
    case SPECIFIC_DAY_OF_WEEK: {
      const specificDaysOfWeek = frequency as SpecificDayOfWeek[]
      return specificDaysOfWeek
        .map((dow) => japaneseLocalizeDayOfWeek(dow))
        .join(', ')
    }
    case SPECIFIC_DATE: {
      const specificDates = frequency as SpecificDate[]
      return specificDates.map(({ month, day }) => `${month}/${day}`).join(', ')
    }
    case TEMPORARY: {
      return '不定期'
    }
    default: {
      return ''
    }
  }
}

export const createLogs = (
  housework: House['housework'],
  logs: Log = {},
  currentDateStr: string
): Log => {
  const currentDate = dayjs(currentDateStr)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0)
  if (currentDate.isBefore(today)) return logs
  if (!logs[currentDateStr]) Object.assign(logs, { [currentDateStr]: [] })

  Object.entries(housework).forEach(([houseworkId, val]) => {
    const { frequency, frequencyType, memberId } = val
    const addTasks = (times = 1) => {
      const alreadyAdded = logs[currentDateStr].filter(
        (t) => t.houseworkId === houseworkId
      )
      for (let i = 0; i < times - alreadyAdded.length; i += 1) {
        const todoTask: Task = { memberId, houseworkId, isCompleted: false }
        logs[currentDateStr].push(todoTask)
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
          const dt = maxDate.subtract(i, 'day').format('YYYY/MM/DD')
          if (logs[dt]) {
            const alreadyAdded = logs[dt].find(
              (t) => t.houseworkId === houseworkId
            )
            if (alreadyAdded) break
          }
          if (i === max) addTasks()
        }
        break
      }
      case SPECIFIC_DAY_OF_WEEK: {
        const specificDaysOfWeek = frequency as SpecificDayOfWeek[]
        specificDaysOfWeek.forEach((dow) => {
          if (convertDayOfWeekToNum(dow) === currentDate.day()) addTasks()
        })
        break
      }
      case SPECIFIC_DATE: {
        const specificDates = frequency as SpecificDate[]
        specificDates.forEach(({ month, day }) => {
          const mm = currentDate.month() + 1
          const dd = currentDate.date()
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
