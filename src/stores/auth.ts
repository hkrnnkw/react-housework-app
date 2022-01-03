import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../utils/types';

type AuthState = AppUser;

const initialState: AuthState = {
  uid: '',
  refreshToken: '',
  displayName: '',
  email: '',
  photoURL: null,
  emailVerified: false,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    updateAuthStatus: (
      state: AuthState,
      action: PayloadAction<AppUser | null>
    ) => {
      if (!action.payload) return initialState;
      return {
        ...state,
        ...action.payload,
      };
    },
  },
});

export default slice;

export const { updateAuthStatus } = slice.actions;
