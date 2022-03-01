import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getFirestore,
  setDoc,
} from 'firebase/firestore'
import { Year } from '../utils/types'
import { defaultCategories, defaultHousework } from '../constants/defaults'
import { House } from '../contexts/houses/constants'
import { State as UserState } from '../contexts/user/constants'

export const createUserToFirestore = async (user: UserState): Promise<void> => {
  const db = getFirestore()
  const { uid } = user
  const newUserRef: DocumentReference<DocumentData> = doc(db, 'users', uid)
  await setDoc(newUserRef, user, { merge: true })
}

export const getHouseIdsFromFirestore = async (uid: string): Promise<string[]> => {
  const db = getFirestore()
  const docRef: DocumentReference<DocumentData> = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.data()?.houseIds as string[] ?? []
}

export const createHouseToFirestore = async (uid: string): Promise<House> => {
  const db = getFirestore()
  const newHouseRef: DocumentReference<DocumentData> = doc(
    collection(db, 'houses')
  )
  const newHouse: House = {
    id: newHouseRef.id,
    logs: {},
    housework: defaultHousework,
    memberIds: [uid],
    categories: defaultCategories,
  }
  await setDoc(newHouseRef, newHouse, { merge: true })
  return newHouse
}

export const getHouseFromFirestore = async (houseId: string): Promise<House> => {
  const db = getFirestore()
  const docRef: DocumentReference<DocumentData> = doc(db, 'houses', houseId)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as House
}

export const setLogToFirestore = async (
  houseId: string,
  logs: Year
): Promise<void> => {
  const db = getFirestore()
  const houseRef = doc(db, 'houses', houseId)
  await setDoc(houseRef, { logs }, { merge: true })
}
