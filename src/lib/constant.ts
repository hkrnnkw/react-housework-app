export const DIRECTION_ENUM = {
  PREV: -1,
  NEXT: 1,
} as const

export const DAY_OF_WEEK_ENUM = [0, 1, 2, 3, 4, 5, 6] as const

export const JPN_LOCALIZED_DAY_OF_WEEK_ENUM = {
  0: '日',
  1: '月',
  2: '火',
  3: '水',
  4: '木',
  5: '金',
  6: '土',
} as const

export const FREQUENCY_ENUM = {
  TEMPORARY: 'temporary',
  TIMES_PER_DAYS: 'timesPerDays',
  DAYS_OF_WEEK: 'daysOfWeek',
  SPECIFIC_DATES: 'specificDates',
} as const

export const POINT_ENUM = {
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
} as const

export const EDITING_STATUS_ENUM = {
  DRAFT: 'draft',
  SAVE: 'save',
} as const
