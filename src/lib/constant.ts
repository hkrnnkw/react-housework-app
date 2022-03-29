export const DIRECTION_TYPE_ENUM = {
  PREV: -1,
  NEXT: 1,
} as const

export const DAY_OF_WEEK_ENUM = {
  SUN: 'Sunday',
  MON: 'Monday',
  TUE: 'Tuesday',
  WED: 'Wednesday',
  THU: 'Thursday',
  FRI: 'Friday',
  SAT: 'Saturday',
} as const

export const EVERY_X_DAYS = 'EveryXDays'

export const SPECIFIC_DATE = 'SpecificDate'

export const SPECIFIC_DAY_OF_WEEK = 'SpecificDayOfWeek'

export const TEMPORARY = 'Temporary'

export const X_TIMES_PER_DAY = 'XTimesPerDay'
