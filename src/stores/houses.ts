import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createLogs, getUpdates } from '../handlers/logsHandler';
import { House, Member, Year } from '../utils/types';

type HousesState = {
  houses: House[];
  currentHouse: House | null;
  members: Member[];
  currentDate: number;
};

const initialState: HousesState = {
  houses: [],
  currentHouse: null,
  members: [],
  currentDate: new Date().getTime(),
};

const slice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    initHousesStatus: (state: HousesState, action: PayloadAction<House>) => {
      const house = action.payload;
      const logs = createLogs(house.housework);
      Object.assign(house.logs, logs);
      const members = house.memberIds.map((id) => {
        const member: Member = {
          id,
          name: '',
          avatar: '',
        };
        return member;
      });
      return {
        ...state,
        houses: [house],
        currentHouse: house,
        members,
      };
    },
    updateHousesStatus: (
      state: HousesState,
      action: PayloadAction<House[]>
    ) => {
      action.payload.forEach((house) => {
        state.houses.push(house);
      });
    },
    switchRoleStatus: (state: HousesState, action: PayloadAction<string>) => {
      const { currentHouse, currentDate } = state;
      if (!currentHouse) return state;
      const logs: Year = getUpdates(
        currentDate,
        currentHouse.logs,
        action.payload
      );
      return {
        ...state,
        currentHouse: {
          ...currentHouse,
          logs,
        },
      };
    },
    updateMembersStatus: (
      state: HousesState,
      action: PayloadAction<Member[]>
    ) => {
      action.payload.forEach((member) => {
        state.members.push(member);
      });
    },
    changeDate: (
      state: HousesState,
      action: PayloadAction<'prev' | 'next'>
    ) => {
      const dt = new Date(state.currentDate);
      dt.setDate(dt.getDate() + (action.payload === 'prev' ? -1 : 1));
      return {
        ...state,
        currentDate: dt.getTime(),
      };
    },
  },
});

export default slice;

export const {
  initHousesStatus,
  switchRoleStatus,
  updateHousesStatus,
  updateMembersStatus,
  changeDate,
} = slice.actions;
