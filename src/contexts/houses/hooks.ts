import { useReducer } from 'react'
import dayjs from 'dayjs'
import { initialState } from './constants'
import { actions, reducer } from './reducer'
import {
  createHouseToFirestore,
  getHousesFromFirestore,
  getUserFromFirestore,
  setHouseworkToFirestore,
  setLogToFirestore,
} from '../../handlers/firestoreHandler'
import { State as UserState } from '../user/constants'
import { FrequencyType, House, Task } from '../../lib/type'
import { DAY_OF_WEEK_ENUM, FREQUENCY_ENUM } from '../../lib/constant'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHouseForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const initHouses = async (uid: string) => {
    if (state.houses !== null || state.currentHouse !== null) return
    const houses = await getHousesFromFirestore(uid)
    if (houses.length > 0) {
      dispatch(actions.setHouses(houses))
      const { id, memberIds } = houses[0]
      await changeCurrentHouse(id, memberIds)
      return
    }
    const newHouse = await createHouseToFirestore(uid)
    dispatch(actions.setHouses([newHouse]))
    const { id, memberIds } = newHouse
    await changeCurrentHouse(id, memberIds)
  }

  const changeCurrentHouse = async (houseId: string, memberIds: string[]) => {
    const tasks = memberIds.map((uid) => getUserFromFirestore(uid))
    const members: UserState[] = await Promise.all(tasks)
    dispatch(actions.changeCurrentHouse(houseId, members))
  }

  const getCurrentHouseValue = (key?: keyof House) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) throw new Error('No house')

    const allValues: House = { ...houses[currentHouse.id] }
    if (key === undefined) return allValues
    return allValues[key]
  }

  const switchTaskStatus = async (
    uid: string,
    categoryId: string,
    houseworkId: string,
    prevStatus: boolean
  ) => {
    const { currentHouse, currentDate } = state
    if (!currentHouse) return

    const logs = getCurrentHouseValue('logs') as House['logs']
    const tasks = [...(logs[currentDate] ?? [])]
    const i = tasks.findIndex((t) => {
      if (t.categoryId !== categoryId) return false
      if (t.houseworkId !== houseworkId) return false
      return t.isCompleted === prevStatus
    })
    if (i === -1) return

    const done: Task = {
      memberId: uid,
      categoryId,
      houseworkId,
      isCompleted: true,
    }
    const undo: Task = {
      memberId: null,
      categoryId,
      houseworkId,
      isCompleted: false,
    }

    try {
      tasks[i] = prevStatus ? undo : done
      logs[currentDate] = [...tasks]
      dispatch(actions.updateCurrentLogs(logs))
      await setLogToFirestore(currentHouse.id, logs)
    } catch (e) {
      tasks[i] = prevStatus ? done : undo
      logs[currentDate] = [...tasks]
      dispatch(actions.updateCurrentLogs(logs))
    }
  }

  const updateCurrentHousework = async (housework: House['housework']) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) throw new Error('No house')

    try {
      dispatch(actions.updateCurrentHousework(housework))
      await setHouseworkToFirestore(currentHouse.id, housework)
    } catch (e) {
      const { housework: backup } = houses[currentHouse.id]
      dispatch(actions.updateCurrentHousework(backup))
    }
  }

  const initTimesPerDays = () => ({ times: 1, days: 1 })

  const initDaysOfWeek = () => {
    const today = dayjs()
    const dayOfWeek = today.day() as keyof typeof DAY_OF_WEEK_ENUM
    return [DAY_OF_WEEK_ENUM[dayOfWeek]]
  }

  const initSpecificDates = () => {
    const today = dayjs()
    const specificDate = { mm: today.month() + 1, dd: today.date() }
    return [specificDate]
  }

  const getInitialFrequencyValue = (
    key: FrequencyType['key']
  ): FrequencyType['values'][typeof key] => {
    const { TEMPORARY, TIMES_PER_DAYS, DAYS_OF_WEEK, SPECIFIC_DATES } =
      FREQUENCY_ENUM
    switch (key) {
      case TEMPORARY:
        return null
      case TIMES_PER_DAYS:
        return initTimesPerDays()
      case DAYS_OF_WEEK:
        return initDaysOfWeek()
      case SPECIFIC_DATES:
        return initSpecificDates()
      default:
        return undefined
    }
  }

  const changeFrequencyKey = async (
    categoryId: string,
    houseworkId: string,
    key: FrequencyType['key']
  ) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const id = `${categoryId}-${houseworkId}`
    const { frequency, ...others } = housework[id]
    const { values } = frequency
    if (!values[key] && key !== FREQUENCY_ENUM.TEMPORARY) {
      const init = { ...values, [key]: getInitialFrequencyValue(key) }
      housework[id] = { frequency: { key, values: init }, ...others }
    } else {
      housework[id] = { frequency: { key, values }, ...others }
    }
    await updateCurrentHousework(housework)
  }

  const changeFrequencyValue = async (
    categoryId: string,
    houseworkId: string,
    value: FrequencyType['values'][
      | 'temporary'
      | 'timesPerDays'
      | 'daysOfWeek'
      | 'specificDates']
  ) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const id = `${categoryId}-${houseworkId}`
    const {
      frequency: { key, values },
      ...others
    } = housework[id]
    const newValues: FrequencyType['values'] = { ...values, [key]: value }
    housework[id] = { frequency: { key, values: newValues }, ...others }
    await updateCurrentHousework(housework)
  }

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args))
  }

  return {
    state,
    initHouses,
    changeCurrentHouse,
    switchTaskStatus,
    initTimesPerDays,
    initDaysOfWeek,
    initSpecificDates,
    changeFrequencyKey,
    changeFrequencyValue,
    changeDate,
  } as const
}

export default useHouseForContext
