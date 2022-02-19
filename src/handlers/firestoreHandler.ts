import {
  collection,
  doc,
  DocumentData,
  DocumentReference,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { Member, Year } from '../utils/types';
import { defaultCategories, defaultHousework } from '../constants/defaults';
import { House } from '../contexts/houses/constants';

export const setMemberToFirestore = async (
  uid: string,
  name = '',
  avatar = ''
): Promise<Member> => {
  const db = getFirestore();
  const memberRef: DocumentReference<DocumentData> = doc(db, 'members', uid);
  const member: Member = {
    id: uid,
    name,
    avatar,
  };
  await setDoc(memberRef, member, { merge: true });
  return member;
};

export const getMemberFromFirestore = async (uid: string): Promise<Member> => {
  const db = getFirestore();
  const docRef: DocumentReference<DocumentData> = doc(db, 'members', uid);
  const docSnap = await getDoc(docRef);
  return docSnap.data() as Member;
};

export const setHouseToFirestore = async (uid: string): Promise<House> => {
  const db = getFirestore();
  const newHouseRef: DocumentReference<DocumentData> = doc(
    collection(db, 'houses')
  );
  const newHouse: House = {
    id: newHouseRef.id,
    logs: {},
    housework: defaultHousework,
    memberIds: [uid],
    categories: defaultCategories,
  };
  await setDoc(newHouseRef, newHouse, { merge: true });
  return newHouse;
};

export const getHousesFromFirestore = async (uid: string): Promise<House[]> => {
  const db = getFirestore();
  const q = query(
    collection(db, 'houses'),
    where('memberIds', 'array-contains', uid)
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((qDoc) => qDoc.data() as House);
};

export const setLogToFirestore = async (
  houseId: string,
  logs: Year
): Promise<void> => {
  const db = getFirestore();
  const houseRef = doc(db, 'houses', houseId);
  await setDoc(houseRef, { logs }, { merge: true });
};
