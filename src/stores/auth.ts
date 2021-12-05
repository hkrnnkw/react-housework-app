import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser } from '../utils/interfaces';

interface AuthState {
    user: AppUser | null;
}

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
        clearAuthStatus: (state: AuthState) => ({
            ...state,
            user: null,
        }),
    },
});

export default slice;

export const { updateAuthStatus, clearAuthStatus } = slice.actions;
