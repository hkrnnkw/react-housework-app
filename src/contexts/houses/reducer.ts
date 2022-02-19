import { User } from 'firebase/auth';
import { createLogs } from '../../handlers/logsHandler';
import { Year } from '../../utils/types';
import {
  State,
  HouseActionType,
  HOUSE_ACTIONS,
  House,
  DirectionType,
} from './constants';

export const actions = {
  setUserData: (user: User | null): HouseActionType => ({
    type: HOUSE_ACTIONS.SET_USER_DATA,
    payload: user,
  }),
  updateHouses: (houses: House[]): HouseActionType => ({
    type: HOUSE_ACTIONS.UPDATE_HOUSES,
    payload: houses,
  }),
  changeCurrentHouse: (houseId: string): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE,
    payload: houseId,
  }),
  switchRoleStatus: (logs: Year): HouseActionType => ({
    type: HOUSE_ACTIONS.SWITCH_ROLE_STATUS,
    payload: logs,
  }),
  changeDate: (direction: DirectionType): HouseActionType => ({
    type: HOUSE_ACTIONS.CHANGE_DATE,
    payload: direction,
  }),
} as const;

export const reducer = (state: State, action: HouseActionType): State => {
  switch (action.type) {
    case HOUSE_ACTIONS.SET_USER_DATA: {
      const user = action.payload ?? null;
      return { ...state, user };
    }
    case HOUSE_ACTIONS.UPDATE_HOUSES: {
      const houses: State['houses'] = {};
      action.payload.forEach((house: House) => {
        const logs = createLogs(house.housework, house.logs);
        houses[house.id] = { ...house, logs };
      });
      return {
        ...state,
        houses,
        currentHouseId: action.payload[0].id,
      };
    }
    case HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE: {
      return { ...state, currentHouseId: action.payload };
    }
    case HOUSE_ACTIONS.SWITCH_ROLE_STATUS: {
      const { currentHouseId, houses } = state;
      if (!currentHouseId) return state;
      const logs = action.payload;
      const newHouses = {
        ...houses,
        [currentHouseId]: { ...houses[currentHouseId], logs },
      };
      return { ...state, houses: newHouses };
    }
    case HOUSE_ACTIONS.CHANGE_DATE: {
      const dt = new Date(state.currentDate);
      dt.setDate(dt.getDate() + action.payload);
      return {
        ...state,
        currentDate: dt.getTime(),
      };
    }
    default: {
      return state;
    }
  }
  return state;
};
