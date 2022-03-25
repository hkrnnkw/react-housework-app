/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs'
import {
  EveryXDaysType,
  EVERY_X_DAYS,
} from '../components/CustomDrawer/Frequency/EveryXDays'
import {
  SpecificDateType,
  SPECIFIC_DATE,
} from '../components/CustomDrawer/Frequency/SpecificDate'
import {
  DayOfWeekType,
  SPECIFIC_DAY_OF_WEEK,
} from '../components/CustomDrawer/Frequency/SpecificDayOfWeek'
import {
  XTimesPerDayType,
  X_TIMES_PER_DAY,
} from '../components/CustomDrawer/Frequency/XTimesPerDay'
import { TEMPORARY } from '../components/CustomDrawer/Frequency/Temporary'
import { House } from '../contexts/houses/constants'
import { Task, Log } from '../utils/types'

const convertDayOfWeekToNum = (dayOfWeek: DayOfWeekType): number => {
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
        const { x } = frequency as XTimesPerDayType
        addTasks(x)
        break
      }
      case EVERY_X_DAYS: {
        const { x } = frequency as EveryXDaysType
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
        const specificDaysOfWeek = frequency as DayOfWeekType[]
        specificDaysOfWeek.forEach((dow) => {
          if (convertDayOfWeekToNum(dow) === currentDate.day()) addTasks()
        })
        break
      }
      case SPECIFIC_DATE: {
        const specificDates = frequency as SpecificDateType[]
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
