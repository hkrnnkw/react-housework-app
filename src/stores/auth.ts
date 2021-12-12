import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../utils/types';

type AuthState = {
    user: AppUser | null;
};

const initialState: AuthState = {
    user: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateAuthStatus: (
            state: AuthState,
            action: PayloadAction<AppUser>
        ) => ({
            ...state,
            user: action.payload,
        }),
    },
});

export default slice;

export const { updateAuthStatus } = slice.actions;
