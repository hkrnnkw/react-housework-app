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
import { DayOfWeekType, House, SpecificDateType, Task } from '../../lib/type'

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

  const switchTaskStatus = async (
    uid: string,
    houseworkId: string,
    prevStatus: boolean
  ) => {
    const { currentHouse, currentDate, houses } = state
    if (!currentHouse || !houses) return

    const logs: House['logs'] = { ...houses[currentHouse.id].logs }
    const tasks = [...(logs[currentDate] ?? [])]
    const i = tasks.findIndex(
      (t) => t.houseworkId === houseworkId && t.isCompleted === prevStatus
    )
    if (i === -1) return

    const done: Task = { memberId: uid, houseworkId, isCompleted: true }
    const undo: Task = { memberId: null, houseworkId, isCompleted: false }

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

  const getCurrentHouseValue = (key?: keyof House) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) throw new Error('No house')

    const allValues: House = { ...houses[currentHouse.id] }
    if (key === undefined) return allValues
    return allValues[key]
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

  const changeXTimesPerDay = async (houseworkId: string, value?: string) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency } = housework[houseworkId]
    if (value) {
      frequency.xTimesPerDay = Number(value)
    } else if (!frequency.xTimesPerDay) {
      frequency.xTimesPerDay = 1
    }
    frequency.temporary = false
    await updateCurrentHousework(housework)
  }

  const changeEveryXDays = async (houseworkId: string, value?: string) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency } = housework[houseworkId]
    if (value) {
      frequency.everyXDays = Number(value)
    } else if (!frequency.everyXDays) {
      frequency.everyXDays = 1
    }
    frequency.temporary = false
    await updateCurrentHousework(housework)
  }

  const changeDaysOfWeek = async (
    houseworkId: string,
    value?: DayOfWeekType[]
  ) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency } = housework[houseworkId]
    if (value) {
      frequency.daysOfWeek = value
    } else if (!frequency.daysOfWeek) {
      const today = dayjs()
      // @todo: convert today.day() to DayOfWeekType
      const day = 'Sunday'
      frequency.daysOfWeek = [day]
    }
    frequency.temporary = false
    await updateCurrentHousework(housework)
  }

  const changeSpecificDate = async (
    houseworkId: string,
    value?: SpecificDateType[]
  ) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency } = housework[houseworkId]
    if (value) {
      frequency.specificDates = value
    } else if (!frequency.specificDates) {
      frequency.specificDates = [null]
    }
    frequency.temporary = false
    await updateCurrentHousework(housework)
  }

  const switchTemporaryStatus = async (houseworkId: string) => {
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency } = housework[houseworkId]
    frequency.temporary = !frequency.temporary
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
    getCurrentHouseValue,
    changeXTimesPerDay,
    changeEveryXDays,
    changeDaysOfWeek,
    changeSpecificDate,
    switchTemporaryStatus,
    changeDate,
  } as const
}

export default useHouseForContext
