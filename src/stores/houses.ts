import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createLogs } from '../handlers/logsHandler';
import { House, Member, Role, Year } from '../utils/types';

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
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const dayOfWeek = date.getDay();
      const logs = createLogs(year, month, day, dayOfWeek, house.housework);
      Object.assign(house.logs, logs);
      const members = house.memberIds.map(
        (id) =>
          ({
            id,
            name: '',
            avatar: '',
          } as Member)
      );
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
      if (!state.currentHouse) return state;
      const date = new Date(state.currentDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      const roles: Role[] | undefined =
        state.currentHouse.logs[year][month][day];
      if (!roles) return state;
      const updates = roles.map((r) =>
        r.houseworkId !== action.payload
          ? r
          : ({ ...r, isCompleted: !r.isCompleted } as Role)
      );
      const logs: Year = {
        ...state.currentHouse.logs,
        [year]: {
          ...state.currentHouse.logs[year],
          [month]: {
            ...state.currentHouse.logs[year][month],
            [day]: updates,
          },
        },
      };
      return {
        ...state,
        currentHouse: {
          ...state.currentHouse,
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
