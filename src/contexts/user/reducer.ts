import { initialState, State, UserActionType, USER_ACTIONS } from './constants'

export const actions = {
  initUserData: (): UserActionType => ({
    type: USER_ACTIONS.SET_USER_DATA,
    payload: initialState,
  }),
  setUserData: (user: State): UserActionType => ({
    type: USER_ACTIONS.SET_USER_DATA,
    payload: user,
  }),
  setHouseIds: (houseIds: State['houseIds']): UserActionType => ({
    type: USER_ACTIONS.SET_HOUSE_IDS,
    payload: houseIds,
  }),
} as const

export const reducer = (state: State, action: UserActionType): State => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER_DATA: {
      return {
        ...action.payload,
      }
    }
    case USER_ACTIONS.SET_HOUSE_IDS: {
      return {
        ...state,
        houseIds: action.payload,
      }
    }
    default:
      return state
  }
}
