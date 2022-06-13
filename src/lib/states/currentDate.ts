import dayjs from 'dayjs'
import { atom } from 'recoil'
import { DATE_FORMAT } from '../constant'

// eslint-disable-next-line import/prefer-default-export
export const stateCurrentDate = atom<string>({
  key: 'stateCurrentDate',
  default: dayjs()
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .format(DATE_FORMAT),
})
