import {
  DAY_OF_WEEK_ENUM,
  DIRECTION_ENUM,
  FREQUENCY_ENUM,
  POINT_ENUM,
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
    [categoryId: string]: {
      category: string
      taskDetails: {
        [taskId: string]: HouseworkDetail
      }
    }
  }
}
export type DirectionType = typeof DIRECTION_ENUM[keyof typeof DIRECTION_ENUM]

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

export type HouseworkId = {
  categoryId: string
  taskId: string
}

export type Task = HouseworkId & {
  memberId: string | null
  isCompleted: boolean
}

export type HouseworkDetail = {
  memberId: string | null
  point: typeof POINT_ENUM[keyof typeof POINT_ENUM]
  frequency: FrequencyType
  title: string
  description?: string
}
