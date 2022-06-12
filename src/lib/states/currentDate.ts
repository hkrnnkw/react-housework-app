import dayjs from 'dayjs'
import { atom } from 'recoil'
import { DATE_FORMAT } from '../constant'

// eslint-disable-next-line import/prefer-default-export
export const stateCurrentDate = atom<string>({
  key: 'stateCurrentDate',
  default: dayjs().format(DATE_FORMAT),
})
