import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores';
import {
  getHousesFromFirestore,
  getMemberFromFirestore,
  setHouseToFirestore,
  setMemberToFirestore,
} from '../handlers/firestoreHandler';
import {
  updateHouseOnDisplay,
  updateHousesStatus,
  updateMembersStatus,
} from '../stores/houses';
import { House, Member } from '../utils/types';
import SignIn from '../components/SignIn';
import Calendar from '../components/Calendar';
import StyledPaper from '../components/atoms/StyledPaper';
import TodoList from '../components/TodoList';

const Home: React.FC = () => {
  const { uid } = useSelector((rootState: RootState) => rootState.auth);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!uid.length) return;
    const init = async () => {
      const housesFromFirestore: House[] = await getHousesFromFirestore(uid);
      if (housesFromFirestore.length > 0) {
        dispatch(updateHousesStatus(housesFromFirestore));
        const allMemberIds: string[] = housesFromFirestore.flatMap(
          (house) => house.memberIds
        );
        const allMemberIdsSet = new Set(allMemberIds);
        const tasks = Array.from(allMemberIdsSet).map((id) =>
          getMemberFromFirestore(id)
        );
        const membersFromFirestore = await Promise.all(tasks);
        dispatch(updateMembersStatus(membersFromFirestore));
        dispatch(updateHouseOnDisplay(housesFromFirestore[0]));
      } else {
        const newHouse: House = await setHouseToFirestore(uid);
        dispatch(updateHousesStatus([newHouse]));
        const newUser: Member = await setMemberToFirestore(uid);
        dispatch(updateMembersStatus([newUser]));
        dispatch(updateHouseOnDisplay(newHouse));
      }
    };
    // eslint-disable-next-line no-console
    init().catch((error) => console.error(error));
  }, [dispatch, uid]);

  if (!uid.length) return <SignIn />;
  return (
    <StyledPaper>
      <Calendar />
      <TodoList uid={uid} />
    </StyledPaper>
  );
};

export default Home;
