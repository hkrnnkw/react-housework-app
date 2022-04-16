import {
  DAY_OF_WEEK_ENUM,
  DIRECTION_TYPE_ENUM,
  FREQUENCY_ENUM,
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
  logs: {
    [date: string]: Task[]
  }
  memberIds: string[]
  housework: {
    [id: string]: HouseworkDetail
  }
  categories: Category
}
export type DirectionType =
  typeof DIRECTION_TYPE_ENUM[keyof typeof DIRECTION_TYPE_ENUM]

type TimesPerDaysType = {
  times: number
  days: number
}

export type SpecificDateType = {
  mm: number
  dd: number
} | null

export type DayOfWeekType =
  typeof DAY_OF_WEEK_ENUM[keyof typeof DAY_OF_WEEK_ENUM]

export type FrequencyType = {
  key: typeof FREQUENCY_ENUM[keyof typeof FREQUENCY_ENUM]
  values: {
    readonly temporary: null
    timesPerDays?: TimesPerDaysType
    daysOfWeek?: DayOfWeekType[]
    specificDates?: SpecificDateType[]
  }
}

export type Task = {
  memberId: string | null
  categoryId: string
  taskId: string
  isCompleted?: boolean
}

export type HouseworkDetail = Task & {
  points: 1 | 2 | 3 | 4 | 5
  frequency: FrequencyType
  title: string
  description?: string
}

export type Category = {
  [id: string]: string
}
