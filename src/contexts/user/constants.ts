type Auth = {
  emailVerified: boolean
  refreshToken: string
}

export type Member = {
  displayName: string | null
  email: string | null
  photoURL: string | null
  uid: string
}

export type State = Auth &
  Member & {
    houseIds: string[] | readonly []
  }

export const initialState: State = {
  displayName: null,
  email: null,
  emailVerified: false,
  photoURL: null,
  refreshToken: '',
  uid: '',
  houseIds: [],
} as const

export const USER_ACTIONS = {
  SET_USER_DATA: 'UserActions:setUserData',
  SET_HOUSE_IDS: 'UserActions:setHouseIds',
} as const

export type UserActionType =
  | {
      type: typeof USER_ACTIONS.SET_USER_DATA
      payload: State
    }
  | {
      type: typeof USER_ACTIONS.SET_HOUSE_IDS
      payload: State['houseIds']
    }
