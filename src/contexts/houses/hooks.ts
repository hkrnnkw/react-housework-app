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
import {
  DayOfWeekType,
  EditingStatus,
  FrequencyType,
  House,
  HouseworkDetail,
  HouseworkId,
  Task,
} from '../../lib/type'
import { EDITING_STATUS_ENUM, FREQUENCY_ENUM } from '../../lib/constant'
import { initialHousework } from '../../lib/housework'

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
    taskId: string,
    prevStatus: boolean
  ) => {
    const { currentHouse, currentDate } = state
    if (!currentHouse) return

    const logs = getCurrentHouseValue('logs') as House['logs']
    const tasks = [...(logs[currentDate] ?? [])]
    const i = tasks.findIndex((t) => {
      if (t.categoryId !== categoryId) return false
      if (t.taskId !== taskId) return false
      return t.isCompleted === prevStatus
    })
    if (i === -1) return

    const done: Task = {
      memberId: uid,
      categoryId,
      taskId,
      isCompleted: true,
    }
    const undo: Task = {
      memberId: null,
      categoryId,
      taskId,
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

  const changeTitle = async (
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    title: string
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { title: old, ...others } = housework[categoryId].taskDetails[taskId]
    housework[categoryId].taskDetails[taskId] = { title, ...others }
    await updateCurrentHousework(editingStatus, housework)
  }

  const changeDescription = async (
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    description: string | undefined
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { description: old, ...others } =
      housework[categoryId].taskDetails[taskId]
    housework[categoryId].taskDetails[taskId] = { description, ...others }
    await updateCurrentHousework(editingStatus, housework)
  }

  const changeMemberId = async (
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    memberId: HouseworkDetail['memberId']
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { memberId: old, ...others } =
      housework[categoryId].taskDetails[taskId]
    housework[categoryId].taskDetails[taskId] = { memberId, ...others }
    await updateCurrentHousework(editingStatus, housework)
  }

  const changePoint = async (
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    point: HouseworkDetail['point']
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { point: old, ...others } = housework[categoryId].taskDetails[taskId]
    housework[categoryId].taskDetails[taskId] = { point, ...others }
    await updateCurrentHousework(editingStatus, housework)
  }

  const createNewHousework = (houseworkId: HouseworkId) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    housework[categoryId].taskDetails[taskId] = initialHousework
    dispatch(actions.updateCurrentHousework(housework))
  }

  const deleteHousework = (houseworkId: HouseworkId) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const deleted = delete housework[categoryId].taskDetails[taskId]
    if (!deleted) return
    dispatch(actions.updateCurrentHousework(housework))
  }

  const updateCurrentHousework = async (
    editingStatus: EditingStatus,
    housework: House['housework']
  ) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) throw new Error('No house')
    const { housework: backup } = houses[currentHouse.id]
    dispatch(actions.updateCurrentHousework(housework))
    if (editingStatus !== EDITING_STATUS_ENUM.SAVE) return

    try {
      await setHouseworkToFirestore(currentHouse.id, housework)
    } catch (e) {
      dispatch(actions.updateCurrentHousework(backup))
    }
  }

  const initTimesPerDays = () => ({ times: 1, days: 1 })

  const initDaysOfWeek = () => {
    const dayOfWeek = dayjs().day() as DayOfWeekType
    return [dayOfWeek]
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
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    key: FrequencyType['key']
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency, ...others } = housework[categoryId].taskDetails[taskId]
    const { values } = frequency
    if (!values[key] && key !== FREQUENCY_ENUM.TEMPORARY) {
      const init = { ...values, [key]: getInitialFrequencyValue(key) }
      housework[categoryId].taskDetails[taskId] = {
        frequency: { key, values: init },
        ...others,
      }
    } else {
      housework[categoryId].taskDetails[taskId] = {
        frequency: { key, values },
        ...others,
      }
    }
    await updateCurrentHousework(editingStatus, housework)
  }

  const changeFrequencyValue = async (
    editingStatus: EditingStatus,
    houseworkId: HouseworkId,
    value: FrequencyType['values'][
      | 'temporary'
      | 'timesPerDays'
      | 'daysOfWeek'
      | 'specificDates']
  ) => {
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const { frequency, ...others } = housework[categoryId].taskDetails[taskId]
    const { key, values } = frequency
    const newValues: FrequencyType['values'] = { ...values, [key]: value }
    housework[categoryId].taskDetails[taskId] = {
      frequency: { key, values: newValues },
      ...others,
    }
    await updateCurrentHousework(editingStatus, housework)
  }

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args))
  }

  return {
    state,
    initHouses,
    changeCurrentHouse,
    switchTaskStatus,
    changeTitle,
    changeDescription,
    changeMemberId,
    changePoint,
    createNewHousework,
    deleteHousework,
    updateCurrentHousework,
    initTimesPerDays,
    initDaysOfWeek,
    initSpecificDates,
    changeFrequencyKey,
    changeFrequencyValue,
    changeDate,
  } as const
}

export default useHouseForContext
