import { useEffect, useReducer } from 'react';
import { getAuth, GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import { House, initialState } from './constants';
import { actions, reducer } from './reducer';
import {
  getHousesFromFirestore,
  getMemberFromFirestore,
  setHouseToFirestore,
  setLogToFirestore,
  setMemberToFirestore,
} from '../../handlers/firestoreHandler';
import { getUpdates } from '../../handlers/logsHandler';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useHouseForContext = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const { user } = state;
    if (!user) return;

    const init = async () => {
      const houses = await getHousesFromFirestore(user.uid);
      if (houses.length > 0) {
        dispatch(actions.updateHouses(houses));
        await changeCurrentHouse(houses[0]);
        return;
      }
      // @todo move init-function to backend
      const newHouse = await setHouseToFirestore(user.uid);
      dispatch(actions.initHouse(newHouse));
      await setMemberToFirestore(user);
    };
    // eslint-disable-next-line no-console
    init().catch((e) => console.error(e));
  }, [state]);

  const signIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
  };

  const setUserData = (...args: Parameters<typeof actions.setUserData>) => {
    dispatch(actions.setUserData(...args));
  };

  const changeCurrentHouse = async (house: House): Promise<void> => {
    const tasks = house.memberIds.map((id) => getMemberFromFirestore(id));
    const members = await Promise.all(tasks);
    dispatch(actions.changeCurrentHouse({ id: house.id, members }));
  };

  const switchRoleStatus = async (houseworkId: string) => {
    const { currentHouse, currentDate, houses } = state;
    if (!currentHouse) return;
    const house = houses[currentHouse.id];
    const logs = getUpdates(currentDate, house.logs, houseworkId);
    dispatch(actions.switchRoleStatus(logs));
    try {
      await setLogToFirestore(currentHouse.id, logs);
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
    changeCurrentHouse,
    switchRoleStatus,
    changeDate,
  } as const;
};

export default useHouseForContext;
