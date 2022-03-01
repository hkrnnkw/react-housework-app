import { useEffect, useReducer, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut as signOutFromFireAuth,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { initialState, State } from './constants'
import { actions, reducer } from './reducer'
import {
  createHouseToFirestore,
  createUserToFirestore,
  getHouseIdsFromFirestore,
} from '../../handlers/firestoreHandler'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const { uid } = state
    if (!uid.length) return

    const init = async () => {
      const houseIds = await getHouseIdsFromFirestore(uid)
      if (houseIds.length > 0) {
        dispatch(actions.setHouseIds(houseIds))
        return
      }
      const newHouse = await createHouseToFirestore(uid)
      dispatch(actions.setHouseIds([newHouse.id]))
      const newUser: State = { ...state, houseIds: [newHouse.id] }
      await createUserToFirestore(newUser)
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
            dispatch(actions.initUserData())
            return
          }
          const user: State = {
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            emailVerified: firebaseUser.emailVerified,
            photoURL: firebaseUser.photoURL,
            refreshToken: firebaseUser.refreshToken,
            uid: firebaseUser.uid,
            houseIds: [],
          }
          dispatch(actions.setUserData(user))
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
    dispatch(actions.initUserData())
    await signOutFromFireAuth(auth)
  }

  return {
    state,
    useAuth,
    signIn,
    signOut,
  } as const
}

export default useUserForContext
