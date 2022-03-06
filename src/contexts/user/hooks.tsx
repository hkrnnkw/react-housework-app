import { useEffect, useReducer, useState } from 'react'
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut as signOutFromFireAuth,
  User,
} from 'firebase/auth'
import { auth } from '../../firebase'
import { initialState, State } from './constants'
import { actions, reducer } from './reducer'
import { setUserToFirestore } from '../../handlers/firestoreHandler'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useUserForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleUser = async (firebaseUser: User) => {
    const user: State = {
      displayName: firebaseUser.displayName,
      email: firebaseUser.email,
      emailVerified: firebaseUser.emailVerified,
      photoURL: firebaseUser.photoURL,
      refreshToken: firebaseUser.refreshToken,
      uid: firebaseUser.uid,
    }
    dispatch(actions.setUserData(user))
    await setUserToFirestore(user)
  }

  const useAuth = (): boolean => {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (!firebaseUser) {
          dispatch(actions.initUserData())
          return
        }
        handleUser(firebaseUser)
          .then(() => setIsLoading(false))
          // eslint-disable-next-line no-console
          .catch((e) => console.error(e))
      })
      return () => unsubscribe()
    }, [])

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
