import { atom } from 'recoil'
import { Auth, Member } from '../type'

export type CurrentUser = Omit<Auth & Member, 'monthlyPoints'>

export const INIT_CURRENT_USER: CurrentUser = {
  displayName: null,
  email: null,
  emailVerified: false,
  photoURL: null,
  refreshToken: '',
  uid: '',
} as const

export const stateCurrentUser = atom<CurrentUser>({
  key: 'stateCurrentUser',
  default: INIT_CURRENT_USER,
})
