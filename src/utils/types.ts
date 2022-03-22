import {
  EveryXDaysType,
  EVERY_X_DAYS,
} from '../components/CustomDrawer/Frequency/EveryXDays'
import {
  SpecificDateType,
  SPECIFIC_DATE,
} from '../components/CustomDrawer/Frequency/SpecificDate'
import {
  SpecificDayOfWeekType,
  SPECIFIC_DAY_OF_WEEK,
} from '../components/CustomDrawer/Frequency/SpecificDayOfWeek'
import {
  XTimesPerDayType,
  X_TIMES_PER_DAY,
} from '../components/CustomDrawer/Frequency/XTimesPerDay'

export type Task = {
  memberId: string | null
  houseworkId: string
  isCompleted?: boolean
}

export type Log = {
  [date: string]: Task[]
}

export const TEMPORARY = 'Temporary'

export type HouseworkDetail = Task & {
  points: 1 | 2 | 3 | 4 | 5
  frequency:
    | XTimesPerDayType
    | EveryXDaysType
    | SpecificDayOfWeekType[]
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
