import {
  State,
  HouseActionType,
  HOUSE_ACTIONS,
  House,
  DirectionType,
} from './constants'
import { State as UserState } from '../user/constants'
import { createLogs } from '../../handlers/logsHandler'

export const actions = {
  setHouses: (houses: House[]): HouseActionType => ({
    type: HOUSE_ACTIONS.SET_HOUSES,
    payload: houses,
  }),
  changeCurrentHouse: (id: string, members: UserState[]): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE,
    payload: { id, members },
  }),
  changeDate: (direction: DirectionType): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_DATE,
    payload: direction,
  }),
} as const

export const reducer = (state: State, action: HouseActionType): State => {
  switch (action.type) {
    case HOUSE_ACTIONS.SET_HOUSES: {
      const houses: State['houses'] = {}
      action.payload.forEach((house) => {
        houses[house.id] = house
      })
      return { ...state, houses }
    }
    case HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE: {
      const { houses } = state
      if (!houses) return state

      const { id, members } = action.payload
      const { housework, logs, ...other } = houses[id]
      const updatedLogs = createLogs(housework, logs)
      houses[id] = { housework, logs: updatedLogs, ...other }

      const currentHouse: State['currentHouse'] = { id, members: {} }
      members.forEach((member) => {
        currentHouse.members[member.uid] = member
      })
      return { ...state, houses, currentHouse }
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
