import { useReducer } from 'react'
import { initialState } from './constants'
import { actions, reducer } from './reducer'
import {
  createHouseToFirestore,
  getHousesFromFirestore,
  getUserFromFirestore,
  updateHouseworkOnFirestore,
  setLogToFirestore,
} from '../../handlers/firestoreHandler'
import {
  CategoryId,
  Editing,
  House,
  HouseworkDetail,
  HouseworkId,
  Member,
  Task,
  TaskId,
} from '../../lib/type'
import { EDITING_STATUS_ENUM } from '../../lib/constant'
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
    const members: Member[] = await Promise.all(tasks)
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
    categoryId: CategoryId,
    taskId: TaskId,
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
      dispatch(actions.updateCurrentLogs([...tasks]))
      await setLogToFirestore(currentHouse.id, currentDate, [...tasks])
    } catch (e) {
      tasks[i] = prevStatus ? done : undo
      dispatch(actions.updateCurrentLogs([...tasks]))
    }
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

  const updateHouseworkDetail = async (
    editing: Editing,
    key: keyof HouseworkDetail,
    value: HouseworkDetail[keyof HouseworkDetail]
  ) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) throw new Error('No house')

    const { editingStatus, houseworkId } = editing
    const { categoryId, taskId } = houseworkId
    const housework = getCurrentHouseValue('housework') as House['housework']
    const detail = housework[categoryId].taskDetails[taskId]
    if (!detail) throw new Error('No taskId')
    const backup: typeof value = detail[key]

    dispatch(actions.updateHouseworkDetail(houseworkId, key, value))
    if (editingStatus !== EDITING_STATUS_ENUM.SAVE) return

    try {
      await updateHouseworkOnFirestore(currentHouse.id, houseworkId, key, value)
    } catch (e) {
      dispatch(actions.updateHouseworkDetail(houseworkId, key, backup))
    }
  }

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args))
  }

  return {
    state,
    initHouses,
    changeCurrentHouse,
    switchTaskStatus,
    createNewHousework,
    deleteHousework,
    updateHouseworkDetail,
    changeDate,
  } as const
}

export default useHouseForContext
