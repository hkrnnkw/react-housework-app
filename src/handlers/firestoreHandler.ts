import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore'
import {
  House,
  HouseworkDetail,
  HouseworkId,
  Invitation,
  Member,
  Task,
} from '../lib/type'
import defaultHousework from '../lib/housework'
import { CurrentUser } from '../lib/states/currentUser'

export const setUserToFirestore = async (user: CurrentUser): Promise<void> => {
  const db = getFirestore()
  const { uid } = user
  const newUserRef: DocumentReference<DocumentData> = doc(db, 'users', uid)
  await setDoc(newUserRef, user, { merge: true })
}

export const getMemberFromFirestore = async (uid: string): Promise<Member> => {
  const db = getFirestore()
  const docRef: DocumentReference<DocumentData> = doc(db, 'users', uid)
  const docSnap = await getDoc(docRef)
  return docSnap.data() as Member
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
    invitations: {},
  }
  await setDoc(newHouseRef, newHouse, { merge: true })
  return newHouse
}

export const getHousesFromFirestore = async (uid: string): Promise<House[]> => {
  const db = getFirestore()
  const q = query(
    collection(db, 'houses'),
    where('memberIds', 'array-contains', uid)
  )
  const querySnapshot = await getDocs(q)
  return querySnapshot.docs.map((qDoc) => qDoc.data() as House)
}

export const setLogToFirestore = async (
  houseId: string,
  currentDate: string,
  tasks: Task[]
): Promise<void> => {
  const db = getFirestore()
  const houseRef = doc(db, 'houses', houseId)
  const path = `logs.${currentDate}`
  await updateDoc(houseRef, { [path]: tasks })
}

export const updateHouseworkOnFirestore = async (
  houseId: string,
  houseworkId: HouseworkId,
  key: keyof HouseworkDetail,
  value: HouseworkDetail[keyof HouseworkDetail]
): Promise<void> => {
  const db = getFirestore()
  const houseRef = doc(db, 'houses', houseId)
  const { categoryId, taskId } = houseworkId
  const path = `housework.${categoryId}.taskDetails.${taskId}.${key}`
  await updateDoc(houseRef, { [path]: value })
}

export const addInvitationToFirestore = async (
  houseId: string,
  invitation: Invitation
): Promise<void> => {
  const db = getFirestore()
  const houseRef = doc(db, 'houses', houseId)
  const email = invitation.inviteeEmail.replace(/\./g, '_')
  const path = `invitations.${email}`
  await updateDoc(houseRef, { [path]: invitation })
}

export const joinToHouseOnFirestore = async (
  houseId: string,
  uid: string,
  email: string
): Promise<House | null> => {
  const db = getFirestore()
  const houseRef = doc(db, 'houses', houseId)
  const docSnap = await getDoc(houseRef)
  if (!docSnap.exists()) return null
  const house = docSnap.data() as House
  const isMember = house.memberIds.includes(uid)
  if (isMember) return house
  const key = email.replace(/\./g, '_')
  const invitation = house.invitations[key]
  if (!invitation) return null
  if (invitation.status !== 'invited') return house
  await updateDoc(houseRef, {
    memberIds: arrayUnion(uid),
    invitations: { ...invitation, status: 'accepted' },
  })
  return house
}
