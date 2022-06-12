/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dayjs from 'dayjs'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { DATE_FORMAT } from '../../constant'
import { stateCurrentDate } from '../../states/currentDate'
import { DirectionType } from '../../type'

// eslint-disable-next-line import/prefer-default-export
export const useDate = () => {
  const currentDate = useRecoilValue(stateCurrentDate)

  return {
    currentDate,
  }
}

export const useDispatchDate = () => {
  const changeDate = useRecoilCallback(
    ({ set, snapshot }) =>
      (direction: DirectionType): string => {
        const currentDate = snapshot.getLoadable(stateCurrentDate).getValue()
        const newDate = dayjs(currentDate)
          .add(direction, 'day')
          .format(DATE_FORMAT)
        set(stateCurrentDate, newDate)
        return newDate
      }
  )

  return {
    changeDate,
  }
}
