import { useEffect, useReducer } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { initialState } from './constants';
import { actions, reducer } from './reducer';
import {
  getHousesFromFirestore,
  getMemberFromFirestore,
  setHouseToFirestore,
  setLogToFirestore,
  setMemberToFirestore,
} from '../../handlers/firestoreHandler';
import { Member } from '../../utils/types';
import { getUpdates } from '../../handlers/logsHandler';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHouseForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (!state.user) return;
    const init = async (uid: string) => {
      const houses = await getHousesFromFirestore(uid);
      if (houses.length > 0) {
        dispatch(actions.updateHouses(houses));
        return;
      }
      const newHouse = await setHouseToFirestore(uid);
      dispatch(actions.updateHouses([newHouse]));
      await setMemberToFirestore(uid);
    };
    // eslint-disable-next-line no-console
    init(state.user.uid).catch((e) => console.error(e));
  }, [state.user]);

  const signIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const setUserData = (...args: Parameters<typeof actions.setUserData>) => {
    dispatch(actions.setUserData(...args));
  };

  const fetchMembers = async (): Promise<Member[]> => {
    const houseId = state.currentHouseId;
    if (!houseId) return [];
    const allMemberIds = state.houses[houseId]?.memberIds ?? [];
    const tasks = allMemberIds.map((id) => getMemberFromFirestore(id));
    const membersFromFirestore = await Promise.all(tasks);
    return membersFromFirestore;
  };

  const changeCurrentHouse = (
    ...args: Parameters<typeof actions.changeCurrentHouse>
  ) => {
    dispatch(actions.changeCurrentHouse(...args));
  };

  const switchRoleStatus = async (houseworkId: string) => {
    const { currentHouseId, currentDate, houses } = state;
    if (!currentHouseId) return;
    const house = houses[currentHouseId];
    const logs = getUpdates(currentDate, house.logs, houseworkId);
    dispatch(actions.switchRoleStatus(logs));
    try {
      await setLogToFirestore(currentHouseId, logs);
    } catch (e) {
      dispatch(actions.switchRoleStatus(logs));
    }
  };

  const changeDate = (...args: Parameters<typeof actions.changeDate>) => {
    dispatch(actions.changeDate(...args));
  };

  return {
    state,
    signIn,
    setUserData,
    fetchMembers,
    changeCurrentHouse,
    switchRoleStatus,
    changeDate,
  } as const;
};

export default useHouseForContext;
