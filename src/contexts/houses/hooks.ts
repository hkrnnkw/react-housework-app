import { useEffect, useReducer, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut as signOutFromFireAuth,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { House, initialState, Member } from './constants'
import { actions, reducer } from './reducer'
import {
  getHousesFromFirestore,
  getMemberFromFirestore,
  setHouseToFirestore,
  setLogToFirestore,
  setMemberToFirestore,
} from '../../handlers/firestoreHandler'
import { getUpdates } from '../../handlers/logsHandler'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHouseForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { user } = state
    if (!user) return

    const init = async () => {
      const houses = await getHousesFromFirestore(user.uid)
      if (houses.length > 0) {
        dispatch(actions.updateHouses(houses))
        await changeCurrentHouse(houses[0])
        return
      }
      const newHouse = await setHouseToFirestore(user.uid)
      dispatch(actions.initHouse(newHouse))
      await setMemberToFirestore(user)
    }
    // eslint-disable-next-line no-console
    init().catch((e) => console.error(e))
  }, [state])

  const useAuth = (): boolean => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
      () =>
        onAuthStateChanged(auth, (firebaseUser) => {
          if (!firebaseUser) {
            setUserData(null)
            return
          }
          const member: Member = {
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
            refreshToken: firebaseUser.refreshToken,
            uid: firebaseUser.uid,
          }
          setUserData(member)
          setIsLoading(false)
        }),
      []
    )

    return isLoading
  }

  const signIn = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithRedirect(auth, provider)
  }

  const signOut = async (): Promise<void> => {
    setUserData(null)
    await signOutFromFireAuth(auth)
  }

  const setUserData = (...args: Parameters<typeof actions.setUserData>) => {
    dispatch(actions.setUserData(...args))
  }

  const changeCurrentHouse = async (house: House): Promise<void> => {
    const tasks = house.memberIds.map((id) => getMemberFromFirestore(id))
    const members = await Promise.all(tasks)
    dispatch(actions.changeCurrentHouse(house.id, members))
  }

  const switchRoleStatus = async (houseworkId: string) => {
    const { currentHouse, currentDate, houses } = state
    if (!currentHouse) return
    const house = houses[currentHouse.id]
    const logs = getUpdates(currentDate, house.logs, houseworkId)
    dispatch(actions.switchRoleStatus(logs))
    try {
      await setLogToFirestore(currentHouse.id, logs)
    } catch (e) {
      dispatch(actions.switchRoleStatus(logs))
    }
  }

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args))
  }

  return {
    state,
    useAuth,
    signIn,
    signOut,
    setUserData,
    changeCurrentHouse,
    switchRoleStatus,
    changeDate,
  } as const
}

export default useHouseForContext
