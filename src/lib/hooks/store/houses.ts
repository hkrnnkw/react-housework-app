/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import dayjs from 'dayjs'
import { useRecoilCallback, useRecoilValue } from 'recoil'
import {
  createHouseToFirestore,
  getHousesFromFirestore,
  getMemberFromFirestore,
} from '../../../handlers/firestoreHandler'
import { createLogs } from '../../../handlers/logsHandler'
import { stateCurrentDate } from '../../states/currentDate'
import {
  AllHouses,
  Members,
  stateAllHouses,
  stateHouseId,
  stateMembers,
} from '../../states/houses'
import { House, Member } from '../../type'

export const useHouses = () => {
  const allHouses = useRecoilValue(stateAllHouses)
  const houseId = useRecoilValue(stateHouseId)
  const members = useRecoilValue(stateMembers)

  return {
    allHouses,
    houseId,
    members,
  }
}

export const useDispatchHouses = () => {
  const getMembers = useRecoilCallback(() => async (memberIds: string[]) => {
    const tasks = memberIds.map((uid) => getMemberFromFirestore(uid))
    const memberArray: Member[] = await Promise.all(tasks)
    const members: Members = {}
    memberArray.forEach((member) => {
      members[member.uid] = member
    })
    return members
  })

  const getTwoDigits = (num: number): string => {
    const res = num > 9 ? `${num}` : `0${num}`
    return res
  }

  const setMonthlyPointsToEachMembers = (
    currentDate: string,
    argLogs: House['logs'],
    housework: House['housework'],
    argMembers: Members
  ) => {
    const theDate = dayjs(currentDate)
    const yyyy = theDate.year()
    const mm = theDate.month() + 1
    const days = theDate.daysInMonth()

    const logs: House['logs'] = { ...argLogs }
    const members: Members = { ...argMembers }
    for (let i = 1; i <= days; i += 1) {
      const date = `${yyyy}${getTwoDigits(mm)}${getTwoDigits(i)}`
      if (!logs[date]) Object.assign(logs, { [date]: [] })

      logs[date].forEach((task) => {
        const { categoryId, taskId, memberId, isCompleted } = task
        const detail = housework[categoryId].taskDetails[taskId]
        if (!memberId || !isCompleted || !detail) return

        const prev: number = members[memberId].monthlyPoints ?? 0
        const monthlyPoints = prev + detail.point
        members[memberId] = { ...members[memberId], monthlyPoints }
      })
    }
    return members
  }

  const initHouses = useRecoilCallback(
    ({ set, snapshot }) =>
      async (uid: string) => {
        const res = await getHousesFromFirestore(uid)
        const house = res.shift() ?? (await createHouseToFirestore(uid))
        const { id, logs: prevLogs, memberIds, housework } = { ...house }
        set(stateHouseId, id)

        const currentDate = snapshot.getLoadable(stateCurrentDate).getValue()
        const logs = createLogs(housework, { ...prevLogs }, currentDate)
        const allHouses: AllHouses = { [id]: { ...house, logs } }
        res.forEach((h: House) => {
          allHouses[h.id] = h
        })
        set(stateAllHouses, allHouses)

        const members = await getMembers(memberIds)
        const withPoints = setMonthlyPointsToEachMembers(
          currentDate,
          logs,
          housework,
          members
        )
        set(stateMembers, withPoints)
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
