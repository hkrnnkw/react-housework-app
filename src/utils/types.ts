export type XTimesPerDay = {
  x: number
}

export type EveryXDays = {
  x: number
}

export type SpecificDayOfWeek =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'

export type SpecificDate = {
  month: number
  day: number
}

export type Task = {
  memberId: string | null
  houseworkId: string
  isCompleted?: boolean
}

export type Log = {
  [date: string]: Task[]
}

export const X_TIMES_PER_DAY = 'XTimesPerDay'
export const EVERY_X_DAYS = 'EveryXDays'
export const SPECIFIC_DAY_OF_WEEK = 'SpecificDayOfWeek'
export const SPECIFIC_DATE = 'SpecificDate'
export const TEMPORARY = 'Temporary'

export type HouseworkDetail = Task & {
  points: 1 | 2 | 3 | 4 | 5
  frequency:
    | XTimesPerDay
    | EveryXDays
    | SpecificDayOfWeek[]
    | SpecificDate[]
    | typeof TEMPORARY
    | null
  frequencyType:
    | typeof X_TIMES_PER_DAY
    | typeof EVERY_X_DAYS
    | typeof SPECIFIC_DAY_OF_WEEK
    | typeof SPECIFIC_DATE
    | typeof TEMPORARY
    | null
  categoryId: string
  title: string
  description?: string
}

export type Category = {
  [id: string]: string
}
