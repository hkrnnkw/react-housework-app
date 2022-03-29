import {
  DAY_OF_WEEK_ENUM,
  DIRECTION_TYPE_ENUM,
  EVERY_X_DAYS,
  SPECIFIC_DATE,
  SPECIFIC_DAY_OF_WEEK,
  TEMPORARY,
  X_TIMES_PER_DAY,
} from './constant'

export type Auth = {
  emailVerified: boolean
  refreshToken: string
}

export type Member = {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

export type House = {
  id: string
  logs: Log
  memberIds: string[]
  housework: {
    [id: string]: HouseworkDetail
  }
  categories: Category
}
export type DirectionType =
  typeof DIRECTION_TYPE_ENUM[keyof typeof DIRECTION_TYPE_ENUM]

export type SpecificDateType = {
  month: number
  day: number
}

export type EveryXDaysType = {
  x: number
}

export type DayOfWeekType =
  typeof DAY_OF_WEEK_ENUM[keyof typeof DAY_OF_WEEK_ENUM]

export type XTimesPerDayType = {
  x: number
}

export type Task = {
  memberId: string | null
  houseworkId: string
  isCompleted?: boolean
}

export type Log = {
  [date: string]: Task[]
}

export type HouseworkDetail = Task & {
  points: 1 | 2 | 3 | 4 | 5
  frequency:
    | XTimesPerDayType
    | EveryXDaysType
    | DayOfWeekType[]
    | SpecificDateType[]
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
