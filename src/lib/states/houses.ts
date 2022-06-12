import { atom } from 'recoil'
import { House, Member } from '../type'

export type AllHouses = {
  [id: string]: House
}

export type CurrentHouse = {
  id: string
  members: {
    [uid: string]: Member
  }
}

export const stateAllHouses = atom<AllHouses | null>({
  key: 'stateAllHouses',
  default: null,
})

export const stateCurrentHouse = atom<CurrentHouse | null>({
  key: 'stateCurrentHouse',
  default: null,
})
