export const DIRECTION_ENUM = {
  PREV: -1,
  NEXT: 1,
} as const

export const DAY_OF_WEEK_ENUM = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
} as const

export const FREQUENCY_ENUM = {
  TEMPORARY: 'temporary',
  TIMES_PER_DAYS: 'timesPerDays',
  DAYS_OF_WEEK: 'daysOfWeek',
  SPECIFIC_DATES: 'specificDates',
} as const
