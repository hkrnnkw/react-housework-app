/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs'
import { DayOfWeekType, House, Task } from '../lib/type'

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
  logs: House['logs'] = {},
  currentDateStr: string
): House['logs'] => {
  const currentDate = dayjs(currentDateStr)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0)
  if (currentDate.isBefore(today)) return logs
  if (!logs[currentDateStr]) Object.assign(logs, { [currentDateStr]: [] })

  Object.values(housework).forEach((value) => {
    const { categoryId, houseworkId, frequency, memberId } = value
    const addTasks = (times = 1) => {
      const alreadyAdded = logs[currentDateStr].filter(
        (t) => t.categoryId === categoryId && t.houseworkId === houseworkId
      )
      for (let i = 0; i < times - alreadyAdded.length; i += 1) {
        const todoTask: Task = {
          memberId,
          categoryId,
          houseworkId,
          isCompleted: false,
        }
        logs[currentDateStr].push(todoTask)
      }
    }
    const { xTimesPerDay, everyXDays, daysOfWeek, specificDates } = frequency
    if (xTimesPerDay !== undefined) {
      addTasks(xTimesPerDay)
    }
    if (everyXDays !== undefined) {
      const span = everyXDays - 1
      const max = span * 2
      const maxDate = currentDate.add(span, 'day')
      for (let i = 0; i <= max; i += 1) {
        const dt = maxDate.subtract(i, 'day').format('YYYY/MM/DD')
        if (logs[dt]) {
          const alreadyAdded = logs[dt].find(
            (t) => t.categoryId === categoryId && t.houseworkId === houseworkId
          )
          if (alreadyAdded) break
        }
        if (i === max) addTasks()
      }
    }
    if (daysOfWeek !== undefined) {
      daysOfWeek.forEach((dow) => {
        if (convertDayOfWeekToNum(dow) === currentDate.day()) addTasks()
      })
    }
    if (specificDates !== undefined) {
      specificDates.forEach((date) => {
        if (date === null) return
        const mm = currentDate.month() + 1
        const dd = currentDate.date()
        if (date.mm === mm && date.dd === dd) addTasks()
      })
    }
  })
  return logs
}
