import { Category, Housework, Year } from '../../utils/types'
import { State as UserState } from '../user/constants'

export const DIRECTION_TYPE_ENUM = {
  PREV: -1,
  NEXT: 1,
} as const
export type DirectionType =
  typeof DIRECTION_TYPE_ENUM[keyof typeof DIRECTION_TYPE_ENUM]

export type House = {
  id: string
  logs: Year
  memberIds: string[]
  housework: { [id: string]: Housework }
  categories: Category
}

export type State = {
  houses: {
    [id: string]: House
  } | null
  currentHouse: {
    id: string
    members: {
      [uid: string]: UserState
    }
  } | null
  currentDate: number
}

export const initialState: State = {
  houses: null,
  currentHouse: null,
  currentDate: new Date().getTime(),
} as const

export const HOUSE_ACTIONS = {
  SET_HOUSES: 'HouseActions:setHouses',
  CHANGE_CURRENT_HOUSE: 'HouseActions:changeCurrentHouse',
  CHANGE_DATE: 'HouseActions:changeDate',
} as const

export type HouseActionType =
  | {
      type: typeof HOUSE_ACTIONS.SET_HOUSES
      payload: House[]
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE
      payload: { id: string; members: UserState[] }
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_DATE
      payload: DirectionType
    }
