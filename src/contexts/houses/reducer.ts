import { createLogs } from '../../handlers/logsHandler'
import { Year } from '../../utils/types'
import {
  State,
  HouseActionType,
  HOUSE_ACTIONS,
  House,
  DirectionType,
  Member,
} from './constants'

export const actions = {
  setUserData: (user: Member | null): HouseActionType => ({
    type: HOUSE_ACTIONS.SET_USER_DATA,
    payload: user,
  }),
  initHouse: (house: House): HouseActionType => ({
    type: HOUSE_ACTIONS.INIT_HOUSE,
    payload: house,
  }),
  updateHouses: (houses: House[]): HouseActionType => ({
    type: HOUSE_ACTIONS.UPDATE_HOUSES,
    payload: houses,
  }),
  changeCurrentHouse: (id: string, members: Member[]): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE,
    payload: { id, members },
  }),
  switchRoleStatus: (logs: Year): HouseActionType => ({
    type: HOUSE_ACTIONS.SWITCH_ROLE_STATUS,
    payload: logs,
  }),
  changeDate: (direction: DirectionType): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_DATE,
    payload: direction,
  }),
} as const

const setLogsToEachHouses = (houseArray: House[]): State['houses'] => {
  const houses: ReturnType<typeof setLogsToEachHouses> = {}
  houseArray.forEach((house: House) => {
    const logs = createLogs(house.housework, house.logs)
    houses[house.id] = { ...house, logs }
  })
  return houses
}

export const reducer = (state: State, action: HouseActionType): State => {
  switch (action.type) {
    case HOUSE_ACTIONS.SET_USER_DATA: {
      return { ...state, user: action.payload }
    }
    case HOUSE_ACTIONS.INIT_HOUSE: {
      if (!state.user) return state
      const house = action.payload
      return {
        ...state,
        houses: setLogsToEachHouses([house]),
        currentHouse: {
          id: house.id,
          members: {
            [state.user.uid]: state.user,
          },
        },
      }
    }
    case HOUSE_ACTIONS.UPDATE_HOUSES: {
      return {
        ...state,
        houses: setLogsToEachHouses(action.payload),
      }
    }
    case HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE: {
      const { id, members: memberArray } = action.payload
      const currentHouse: State['currentHouse'] = { id, members: {} }
      memberArray.forEach((member: Member) => {
        currentHouse.members[member.uid] = member
      })
      return { ...state, currentHouse }
    }
    case HOUSE_ACTIONS.SWITCH_ROLE_STATUS: {
      const { currentHouse, houses } = state
      if (!currentHouse) return state
      const logs = action.payload
      const newHouses = {
        ...houses,
        [currentHouse.id]: { ...houses[currentHouse.id], logs },
      }
      return { ...state, houses: newHouses }
    }
    case HOUSE_ACTIONS.CHANGE_DATE: {
      const dt = new Date(state.currentDate)
      dt.setDate(dt.getDate() + action.payload)
      return {
        ...state,
        currentDate: dt.getTime(),
      }
    }
    default: {
      return state
    }
  }
}
