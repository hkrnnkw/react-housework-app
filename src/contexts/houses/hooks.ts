import { useReducer } from 'react'
import { initialState } from './constants'
import { actions, reducer } from './reducer'
import {
  createHouseToFirestore,
  getHousesFromFirestore,
  getUserFromFirestore,
  setLogToFirestore,
} from '../../handlers/firestoreHandler'
import { getDateObj } from '../../handlers/logsHandler'
import { State as UserState } from '../user/constants'
import { Task, Year } from '../../utils/types'

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

    const logs: Year = { ...houses[currentHouse.id].logs }
    const { yyyy, mm, dd } = getDateObj(currentDate)
    const tasks = [...(logs[yyyy][mm][dd] ?? [])]
    const i = tasks.findIndex(
      (t) => t.houseworkId === houseworkId && t.isCompleted === prevStatus
    )
    if (i === -1) return

    const done: Task = { memberId: uid, houseworkId, isCompleted: true }
    const undo: Task = { memberId: null, houseworkId, isCompleted: false }

    try {
      tasks[i] = prevStatus ? undo : done
      logs[yyyy][mm][dd] = [...tasks]
      dispatch(actions.updateCurrentLogs(logs))
      const completedTasks = tasks.filter((t) => t.isCompleted)
      const newLogs: Year = { [yyyy]: { [mm]: { [dd]: completedTasks } } }
      await setLogToFirestore(currentHouse.id, newLogs)
    } catch (e) {
      tasks[i] = prevStatus ? done : undo
      logs[yyyy][mm][dd] = [...tasks]
      dispatch(actions.updateCurrentLogs(logs))
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
    changeDate,
  } as const
}

export default useHouseForContext
