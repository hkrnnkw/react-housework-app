import {
  State,
  HouseActionType,
  HOUSE_ACTIONS,
  House,
  DirectionType,
} from './constants'

export const actions = {
  changeCurrentHouse: (house: House): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE,
    payload: house,
  }),
  changeDate: (direction: DirectionType): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_DATE,
    payload: direction,
  }),
} as const

export const reducer = (state: State, action: HouseActionType): State => {
  switch (action.type) {
    case HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE: {
      return { ...state, currentHouse: action.payload }
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
