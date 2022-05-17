/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useRecoilCallback, useRecoilValue } from 'recoil'
import { signOut as signOutFromFireAuth, User } from 'firebase/auth'
import { auth } from '../../../firebase'
import { CurrentUser, stateCurrentUser } from '../../states/currentUser'
import { setUserToFirestore } from '../../../handlers/firestoreHandler'

export const useUser = () => {
  const currentUser = useRecoilValue(stateCurrentUser)
  return { ...currentUser }
}

export const useDispatchUser = () => {
  const setCurrentUser = useRecoilCallback(
    ({ set, reset }) =>
      async (firebaseUser: User | null) => {
        if (!firebaseUser) {
          reset(stateCurrentUser)
          return
        }
        const currentUser: CurrentUser = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          emailVerified: firebaseUser.emailVerified,
          photoURL: firebaseUser.photoURL,
          refreshToken: firebaseUser.refreshToken,
          uid: firebaseUser.uid,
        }
        set(stateCurrentUser, currentUser)
        await setUserToFirestore(currentUser)
      }
  )

  const signOut = useRecoilCallback(({ reset }) => async () => {
    reset(stateCurrentUser)
    await signOutFromFireAuth(auth)
  })

  return {
    setCurrentUser,
    signOut,
  }
}
