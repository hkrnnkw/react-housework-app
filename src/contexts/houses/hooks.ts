import { useReducer } from 'react'
import { initialState } from './constants'
import { actions, reducer } from './reducer'
import { getHouseFromFirestore, setLogToFirestore } from '../../handlers/firestoreHandler'
import { createLogs, getUpdates } from '../../handlers/logsHandler'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHouseForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const changeCurrentHouse = async (houseId: string) => {
    const house = await getHouseFromFirestore(houseId)
    const logs = createLogs(house.housework, house.logs)
    dispatch(actions.changeCurrentHouse({ ...house, logs }))
  }

  const switchRoleStatus = async (houseworkId: string) => {
    const { currentHouse, currentDate } = state
    if (!currentHouse) return
    const logs = getUpdates(currentDate, currentHouse.logs, houseworkId)
    await setLogToFirestore(currentHouse.id, logs)
  }

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args))
  }

  return {
    state,
    changeCurrentHouse,
    switchRoleStatus,
    changeDate,
  } as const
}

export default useHouseForContext
