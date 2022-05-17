import dayjs from 'dayjs'
import { DATE_FORMAT } from '../../lib/constant'
import {
  DirectionType,
  House,
  HouseworkDetail,
  HouseworkId,
  Member,
  Task,
} from '../../lib/type'

export type State = {
  houses: {
    [id: string]: House
  } | null
  currentHouse: {
    id: string
    members: {
      [uid: string]: Member
    }
  } | null
  currentDate: string
}

export const initialState: State = {
  houses: null,
  currentHouse: null,
  currentDate: dayjs().format(DATE_FORMAT),
} as const

export const HOUSE_ACTIONS = {
  SET_HOUSES: 'HouseActions:setHouses',
  CHANGE_CURRENT_HOUSE: 'HouseActions:changeCurrentHouse',
  CHANGE_DATE: 'HouseActions:changeDate',
  UPDATE_CURRENT_LOGS: 'HouseActions:updateCurrentLogs',
  UPDATE_CURRENT_HOUSEWORK: 'updateCurrentHousework',
  UPDATE_HOUSEWORK_DETAIL: 'updateHouseworkDetail',
} as const

export type HouseActionType =
  | {
      type: typeof HOUSE_ACTIONS.SET_HOUSES
      payload: House[]
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE
      payload: { id: string; members: Member[] }
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_DATE
      payload: DirectionType
    }
  | {
      type: typeof HOUSE_ACTIONS.UPDATE_CURRENT_LOGS
      payload: Task[]
    }
  | {
      type: typeof HOUSE_ACTIONS.UPDATE_CURRENT_HOUSEWORK
      payload: House['housework']
    }
  | {
      type: typeof HOUSE_ACTIONS.UPDATE_HOUSEWORK_DETAIL
      payload: {
        houseworkId: HouseworkId
        key: keyof HouseworkDetail
        value: HouseworkDetail[keyof HouseworkDetail]
      }
    }
