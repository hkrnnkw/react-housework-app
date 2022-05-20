/* eslint-disable import/prefer-default-export */
import dayjs from 'dayjs'
import { DATE_FORMAT, FREQUENCY_ENUM } from '../lib/constant'
import { CategoryId, House, Task, TaskId } from '../lib/type'

export const createLogs = (
  housework: House['housework'],
  logs: House['logs'] = {},
  currentDateStr: string
): House['logs'] => {
  const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
    FREQUENCY_ENUM
  const currentDate = dayjs(currentDateStr)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
  const today = dayjs().hour(0).minute(0).second(0).millisecond(0)
  if (currentDate.isBefore(today)) return logs
  if (!logs[currentDateStr]) Object.assign(logs, { [currentDateStr]: [] })

  const addTasks = (
    categoryId: CategoryId,
    taskId: TaskId,
    memberId: string | null,
    times = 1
  ) => {
    const alreadyAdded = logs[currentDateStr].filter(
      (t) => t.categoryId === categoryId && t.taskId === taskId
    )
    for (let i = 0; i < times - alreadyAdded.length; i += 1) {
      const todoTask: Task = {
        memberId,
        categoryId,
        taskId,
        isCompleted: false,
      }
      logs[currentDateStr].push(todoTask)
    }
  }

  Object.entries(housework).forEach(([categoryKey, { taskDetails }]) => {
    const categoryId = categoryKey as CategoryId
    Object.entries(taskDetails).forEach(([taskKey, detail]) => {
      const taskId = taskKey as TaskId
      const { memberId, frequency } = detail
      const { key, values } = frequency
      const { timesPerDays, daysOfWeek, specificDates } = values
      if (key === TEMPORARY) return
      if (key === TIMES_PER_DAYS && !!timesPerDays) {
        const { times, days } = timesPerDays
        const span = days - 1
        const max = span * 2
        const maxDate = currentDate.add(span, 'day')
        for (let i = 0; i <= max; i += 1) {
          const dt = maxDate.subtract(i, 'day').format(DATE_FORMAT)
          if (logs[dt]) {
            const alreadyAdded = logs[dt].find(
              (t) => t.categoryId === categoryId && t.taskId === taskId
            )
            if (alreadyAdded) break
          }
          if (i === max) addTasks(categoryId, taskId, memberId, times)
        }
      } else if (key === DAYS_OF_WEEK && !!daysOfWeek) {
        daysOfWeek.forEach((dow) => {
          if (dow === currentDate.day()) addTasks(categoryId, taskId, memberId)
        })
      } else if (key === SPECIFIC_DATES && !!specificDates) {
        specificDates.forEach((date) => {
          if (date === null) return
          const mm = currentDate.month() + 1
          const dd = currentDate.date()
          if (date.mm === mm && date.dd === dd)
            addTasks(categoryId, taskId, memberId)
        })
      }
    })
  })
  return logs
}

export const sortTasks = (tasks: Task[]): Task[] => {
  const res = tasks.sort((a, b) => {
    const categoryA = a.categoryId.toLowerCase()
    const categoryB = b.categoryId.toLowerCase()
    if (categoryA < categoryB) return -1
    if (categoryA > categoryB) return 1
    const taskA = a.taskId.toLowerCase()
    const taskB = b.taskId.toLowerCase()
    if (taskA < taskB) return -1
    if (taskA > taskB) return 1
    return 0
  })
  return res
}
