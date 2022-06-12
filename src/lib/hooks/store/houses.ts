/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRecoilCallback, useRecoilValue } from 'recoil'
import {
  createHouseToFirestore,
  getHousesFromFirestore,
  getUserFromFirestore,
} from '../../../handlers/firestoreHandler'
import { createLogs } from '../../../handlers/logsHandler'
import { stateCurrentDate } from '../../states/currentDate'
import {
  AllHouses,
  CurrentHouse,
  stateAllHouses,
  stateCurrentHouse,
} from '../../states/houses'
import { House, Member } from '../../type'

export const useHouses = () => {
  const allHouses = useRecoilValue(stateAllHouses)
  const currentHouse = useRecoilValue(stateCurrentHouse)

  return {
    allHouses,
    currentHouse,
  }
}

export const useDispatchHouses = () => {
  const getMembers = useRecoilCallback(() => async (memberIds: string[]) => {
    const tasks = memberIds.map((uid) => getUserFromFirestore(uid))
    const memberArray: Member[] = await Promise.all(tasks)
    const members: CurrentHouse['members'] = {}
    memberArray.forEach((member) => {
      members[member.uid] = member
    })
    return members
  })

  const initHouses = useRecoilCallback(
    ({ set, snapshot }) =>
      async (uid: string) => {
        const res = await getHousesFromFirestore(uid)
        const house = res.shift() ?? (await createHouseToFirestore(uid))

        const { id, logs: prevLogs, memberIds, housework } = { ...house }
        const members = await getMembers(memberIds)
        set(stateCurrentHouse, { id, members })

        const currentDate = snapshot.getLoadable(stateCurrentDate).getValue()
        const logs = createLogs(housework, { ...prevLogs }, currentDate)
        const allHouses: AllHouses = { [id]: { ...house, logs } }
        res.forEach((h: House) => {
          allHouses[h.id] = h
        })
        set(stateAllHouses, allHouses)
      }
  )

  const updateHouseOnAll = useRecoilCallback(
    ({ set, snapshot }) =>
      (updatedHouse: House) => {
        const allHouses = snapshot.getLoadable(stateAllHouses).getValue()
        const updatedAllHouses: AllHouses = {
          ...allHouses,
          [updatedHouse.id]: updatedHouse,
        }
        set(stateAllHouses, updatedAllHouses)
      }
  )

  return {
    initHouses,
    updateHouseOnAll,
  }
}
