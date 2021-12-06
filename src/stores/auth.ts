import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppUser, SignedIn } from '../utils/types';

type AuthState = SignedIn & AppUser;

const initialState: AuthState = {
    signedIn: false,
    uid: '',
    displayName: '',
    email: '',
    photoURL: null,
    refreshToken: '',
    emailVerified: false,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setSignInStatus: (
            state: AuthState,
            action: PayloadAction<boolean>
        ) => ({
            ...state,
            signedIn: action.payload,
        }),
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

export const { setSignInStatus, updateAuthStatus, clearAuthStatus } =
    slice.actions;
