import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { House, Member } from '../utils/types';

type HousesState = {
  houses: House[];
  houseOnDisplay: House | null;
  members: Member[];
  selectingDate: number | null;
};

const initialState: HousesState = {
  houses: [],
  houseOnDisplay: null,
  members: [],
  selectingDate: new Date().getTime(),
};

const slice = createSlice({
  name: 'houses',
  initialState,
  reducers: {
    updateHousesStatus: (
      state: HousesState,
      action: PayloadAction<House[]>
    ) => {
      action.payload.forEach((house) => {
        state.houses.push(house);
      });
    },
    updateHouseOnDisplay: (
      state: HousesState,
      action: PayloadAction<House>
    ) => ({
      ...state,
      houseOnDisplay: action.payload,
    }),
    updateMembersStatus: (
      state: HousesState,
      action: PayloadAction<Member[]>
    ) => {
      action.payload.forEach((member) => {
        state.members.push(member);
      });
    },
    setSelectingDate: (
      state: HousesState,
      action: PayloadAction<number | null>
    ) => ({
      ...state,
      selectingDate: action.payload,
    }),
  },
});

export default slice;

export const {
  updateHousesStatus,
  updateHouseOnDisplay,
  updateMembersStatus,
  setSelectingDate,
} = slice.actions;
