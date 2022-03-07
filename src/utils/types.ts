export type EveryXDays = {
  times: number
  days: number
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
  isCompleted: boolean
}

export type Day = {
  [day: number]: Task[]
}

export type Month = {
  [month: number]: Day
}

export type Year = {
  [year: number]: Month
}

export const EVERY_X_DAYS = 'EveryXDays'
export const SPECIFIC_DAY_OF_WEEK = 'SpecificDayOfWeek'
export const SPECIFIC_DATE = 'SpecificDate'
export const TEMPORARY = 'Temporary'

export type Housework = {
  id: string
  points: 1 | 2 | 3 | 4 | 5
  frequency:
    | EveryXDays
    | SpecificDayOfWeek[]
    | SpecificDate[]
    | typeof TEMPORARY
    | null
  frequencyType:
    | typeof EVERY_X_DAYS
    | typeof SPECIFIC_DAY_OF_WEEK
    | typeof SPECIFIC_DATE
    | typeof TEMPORARY
    | null
  categoryId: string
  title: string
  description?: string
  memberId: string | null
}

export type Category = {
  [id: string]: string
}

export type DateObj = {
  yyyy: number
  mm: number
  dd: number
  dayOfWeek: number
}
