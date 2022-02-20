import { User } from 'firebase/auth';
import { Category, Housework, Year } from '../../utils/types';

export const DIRECTION_TYPE_ENUM = {
  PREV: -1,
  NEXT: 1,
} as const;
export type DirectionType =
  typeof DIRECTION_TYPE_ENUM[keyof typeof DIRECTION_TYPE_ENUM];

export type House = {
  id: string;
  logs: Year;
  memberIds: string[];
  housework: Housework;
  categories: Category;
};

export type State = {
  user: User | null;
  houses: {
    [key: string]: House;
  };
  currentHouse: {
    id: string;
    members: User[] | readonly [];
  } | null;
  currentDate: number;
};

export const initialState: State = {
  user: null,
  houses: {},
  currentHouse: null,
  currentDate: new Date().getTime(),
} as const;

export const HOUSE_ACTIONS = {
  SET_USER_DATA: 'HouseActions:setUserData',
  UPDATE_HOUSES: 'HouseActions:updateHouses',
  CHANGE_CURRENT_HOUSE: 'HouseActions:changeCurrentHouse',
  SWITCH_ROLE_STATUS: 'HouseActions:switchRoleStatus',
  CHANGE_DATE: 'HouseActions:changeDate',
} as const;

export type HouseActionType =
  | {
      type: typeof HOUSE_ACTIONS.SET_USER_DATA;
      payload: User | null;
    }
  | {
      type: typeof HOUSE_ACTIONS.UPDATE_HOUSES;
      payload: House[];
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_CURRENT_HOUSE;
      payload: State['currentHouse'];
    }
  | {
      type: typeof HOUSE_ACTIONS.SWITCH_ROLE_STATUS;
      payload: Year;
    }
  | {
      type: typeof HOUSE_ACTIONS.CHANGE_DATE;
      payload: DirectionType;
    };
