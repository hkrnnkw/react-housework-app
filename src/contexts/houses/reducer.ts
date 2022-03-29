import dayjs from 'dayjs'
import { State, HouseActionType, HOUSE_ACTIONS } from './constants'
import { State as UserState } from '../user/constants'
import { createLogs } from '../../handlers/logsHandler'
import { DirectionType, House, Log } from '../../lib/type'

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
  updateCurrentLogs: (logs: Log): HouseActionType => ({
    type: HOUSE_ACTIONS.UPDATE_CURRENT_LOGS,
    payload: logs,
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
      const { currentDate, houses } = state
      if (!houses) return state

      const { id, members } = action.payload
      const { housework, logs, ...other } = houses[id]
      const updatedLogs = createLogs(housework, { ...logs }, currentDate)
      houses[id] = { housework, logs: updatedLogs, ...other }

      const currentHouse: State['currentHouse'] = { id, members: {} }
      members.forEach((member) => {
        currentHouse.members[member.uid] = member
      })
      return { ...state, houses, currentHouse }
    }
    case HOUSE_ACTIONS.CHANGE_DATE: {
      const { currentHouse, currentDate, houses } = state
      const dt = dayjs(currentDate)
        .add(action.payload, 'day')
        .format('YYYY/MM/DD')
      if (currentHouse && houses) {
        const { housework, logs, ...other } = houses[currentHouse.id]
        const updatedLogs = createLogs(housework, { ...logs }, dt)
        houses[currentHouse.id] = { housework, logs: updatedLogs, ...other }
      }
      return { ...state, houses, currentDate: dt }
    }
    case HOUSE_ACTIONS.UPDATE_CURRENT_LOGS: {
      const { houses, currentHouse } = state
      if (!houses || !currentHouse) return state

      const updates: House = { ...houses[currentHouse.id] }
      updates.logs = action.payload
      const updatedHouses: State['houses'] = {
        ...houses,
        [currentHouse.id]: updates,
      }
      return { ...state, houses: updatedHouses }
    }
    default: {
      return state
    }
  }
}
