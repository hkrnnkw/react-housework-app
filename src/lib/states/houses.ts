import { atom } from 'recoil'
import { House, Member } from '../type'

export type AllHouses = {
  [id: string]: House
}

export type Members = {
  [uid: string]: Member
}

export const stateAllHouses = atom<AllHouses | null>({
  key: 'stateAllHouses',
  default: null,
})

export const stateHouseId = atom<string | null>({
  key: 'stateHouseId',
  default: null,
})

export const stateMembers = atom<Members | null>({
  key: 'stateMembers',
  default: null,
})
