import {
  DAY_OF_WEEK_ENUM,
  DIRECTION_ENUM,
  EDITING_STATUS_ENUM,
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
  monthlyPoints: number
}

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

export type CategoryId = `c00${Digit}` | 'c010'

export type TaskId = `t${Digit}${Digit}${Digit}`

export type Invitation = {
  inviteeEmail: Member['email']
  inviterId: Member['uid']
}

export type House = {
  id: string
  logs: {
    [date: string]: Task[]
  }
  memberIds: string[]
  housework: {
    [categoryId in CategoryId]: {
      categoryName: string
      taskDetails: {
        [taskId in TaskId]?: HouseworkDetail
      }
    }
  }
  invitations: Invitation[]
}
export type DirectionType = typeof DIRECTION_ENUM[keyof typeof DIRECTION_ENUM]

export type TimesPerDaysType = {
  times: number
  days: number
}

export type SpecificDateType = {
  mm: number
  dd: number
} | null

export type DayOfWeekType = typeof DAY_OF_WEEK_ENUM[number]

type Specified = Partial<{
  timesPerDays: TimesPerDaysType
  daysOfWeek: DayOfWeekType[]
  specificDates: SpecificDateType[]
}>

type Unspecified = { readonly temporary: null }

export type FrequencyType = {
  key: typeof FREQUENCY_ENUM[keyof typeof FREQUENCY_ENUM]
  values: Specified & Unspecified
}

export type FrequencyValue = NonNullable<Specified[keyof Specified]>

export type Editing = {
  houseworkId: HouseworkId
  editingStatus: EditingStatus
}

export type EditingStatus =
  typeof EDITING_STATUS_ENUM[keyof typeof EDITING_STATUS_ENUM]

export type HouseworkId = {
  categoryId: CategoryId
  taskId: TaskId
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
