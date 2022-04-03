import { useReducer } from 'react'
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
import { FrequencyKey, House, Task } from '../../lib/type'

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

  const changeHouseworkFrequency = async (
    houseworkId: string,
    frequencyKey: FrequencyKey,
    value?: string
  ) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) return

    const { housework } = { ...houses[currentHouse.id] }
    const { frequency } = housework[houseworkId]

    switch (frequencyKey) {
      case 'xTimesPerDay': {
        if (value) {
          frequency.xTimesPerDay = Number(value)
        } else if (!frequency.xTimesPerDay) {
          frequency.xTimesPerDay = 1
        }
        break
      }
      default:
        break
    }
    frequency.temporary = false

    try {
      dispatch(actions.updateCurrentHousework(housework))
      await setHouseworkToFirestore(currentHouse.id, housework)
    } catch (e) {
      const { housework: backup } = houses[currentHouse.id]
      dispatch(actions.updateCurrentHousework(backup))
    }
  }

  const switchTemporaryStatus = async (houseworkId: string) => {
    const { currentHouse, houses } = state
    if (!currentHouse || !houses) return

    const { housework } = { ...houses[currentHouse.id] }
    const { frequency } = housework[houseworkId]
    frequency.temporary = !frequency.temporary

    try {
      dispatch(actions.updateCurrentHousework(housework))
      await setHouseworkToFirestore(currentHouse.id, housework)
    } catch (e) {
      const { housework: backup } = houses[currentHouse.id]
      dispatch(actions.updateCurrentHousework(backup))
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
    changeHouseworkFrequency,
    switchTemporaryStatus,
    changeDate,
  } as const
}

export default useHouseForContext
